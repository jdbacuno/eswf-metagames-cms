<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/functions.php';

session_start();
requireLogin();   // returns 401 JSON if not logged in

header('Content-Type: application/json');

$pdo     = getPDO();
$SECTION = 'marquee';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

  // ── GET ─────────────────────────────────────────────────────────
  // Returns the full section content + which fields are arrays.
  // The admin page JS calls this on load to populate the editor.
  case 'GET':
    $content = getSectionContent($pdo, $SECTION);

    // Inject _arrayFields so the JS knows which fields support CRUD
    $content['_arrayFields'] = getArrayFields($content);

    jsonResponse($content);

    // ── PATCH ───────────────────────────────────────────────────────
    // Update a field.
    // For marquee this is typically:
    //   Scalar field → { "field": "text", "value": "..." }
  case 'PATCH':
    $body  = getRequestBody();
    $field = sanitize($body['field'] ?? '');
    $value = $body['value'] ?? null;

    if (empty($field) || $value === null) {
      jsonResponse(['error' => '"field" and "value" are required.'], 400);
    }

    $content = getSectionContent($pdo, $SECTION);

    if (!array_key_exists($field, $content)) {
      jsonResponse(['error' => "Field '{$field}' does not exist."], 404);
    }

    if (is_array($content[$field] ?? null) && array_is_list($content[$field])) {
      // ── Updating one item inside an array ──
      $index = $body['index'] ?? null;

      if ($index === null || !isset($content[$field][$index])) {
        jsonResponse(['error' => 'Valid "index" is required for array fields.'], 400);
      }

      $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
      $content[$field][(int)$index] = $clean;
    } else {
      // ── Updating an object field (backgroundImage, cta, catchphrase, etc.) ──
      if (is_array($value)) {
        $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
        $content[$field] = array_merge($content[$field], $clean);
      } else {
        $content[$field] = sanitize((string)$value);
      }
    }

    saveContent($pdo, $SECTION, $content);

    jsonResponse([
      'message' => 'Updated.',
      'field'   => $field,
      'value'   => $content[$field],
    ]);

  default:
    jsonResponse(['error' => "Method '{$method}' not allowed."], 405);
}
