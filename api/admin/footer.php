<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/functions.php';

session_start();
requireLogin();

header('Content-Type: application/json');

$pdo     = getPDO();
$SECTION = 'footer';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

  // ── GET ──────────────────────────────────────────────────────────
  case 'GET':
    $content = getSectionContent($pdo, $SECTION);
    jsonResponse($content);


    // ── POST ─────────────────────────────────────────────────────────
    // Two shapes:
    //   Add a column      → { "field": "columns", "item": { "title": "…", "links": [] } }
    //   Add a link        → { "field": "columns.links", "columnIndex": 0, "item": { "text": "…", "url": "…" } }
  case 'POST':
    $body    = getRequestBody();
    $field   = sanitize($body['field'] ?? '');
    $newItem = $body['item'] ?? null;

    if (empty($field) || $newItem === null) {
      jsonResponse(['error' => '"field" and "item" are required.'], 400);
    }

    $content = getSectionContent($pdo, $SECTION);

    // ── Add a link inside a column ──
    if ($field === 'columns.links') {
      $colIndex = $body['columnIndex'] ?? null;

      if ($colIndex === null || !isset($content['columns'][(int)$colIndex])) {
        jsonResponse(['error' => 'Valid "columnIndex" is required for columns.links.'], 400);
      }

      $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $newItem);
      $content['columns'][(int)$colIndex]['links'][] = $clean;

      saveContent($pdo, $SECTION, $content);

      jsonResponse([
        'message'     => 'Link added.',
        'field'       => $field,
        'columnIndex' => (int)$colIndex,
        'items'       => $content['columns'][(int)$colIndex]['links'],
      ], 201);
    }

    // ── Add a column ──
    if ($field === 'columns') {
      $clean = [
        'title' => sanitize($newItem['title'] ?? ''),
        'links' => [],
      ];
      $content['columns'][] = $clean;

      saveContent($pdo, $SECTION, $content);

      jsonResponse([
        'message' => 'Column added.',
        'field'   => $field,
        'items'   => $content['columns'],
      ], 201);
    }

    jsonResponse(['error' => "POST to '{$field}' is not supported."], 422);


    // ── PATCH ────────────────────────────────────────────────────────
    // Shapes:
    //   Object field   → { "field": "logo",           "value": { "src": "…", "alt": "…" } }
    //   Object field   → { "field": "bottomBar",       "value": { "copyright": "…", "credit": "…" } }
    //   Column title   → { "field": "columns.title",   "columnIndex": 0, "value": "New Title" }
    //   Link in column → { "field": "columns.links",   "columnIndex": 0, "index": 1, "value": { "text": "…", "url": "…" } }
  case 'PATCH':
    $body  = getRequestBody();
    $field = sanitize($body['field'] ?? '');
    $value = $body['value'] ?? null;

    if (empty($field) || $value === null) {
      jsonResponse(['error' => '"field" and "value" are required.'], 400);
    }

    $content = getSectionContent($pdo, $SECTION);

    // ── Patch a link inside a column ──
    if ($field === 'columns.links') {
      $colIndex  = $body['columnIndex'] ?? null;
      $linkIndex = $body['index']       ?? null;

      if ($colIndex === null || !isset($content['columns'][(int)$colIndex])) {
        jsonResponse(['error' => 'Valid "columnIndex" is required.'], 400);
      }
      if ($linkIndex === null || !isset($content['columns'][(int)$colIndex]['links'][(int)$linkIndex])) {
        jsonResponse(['error' => 'Valid "index" is required.'], 400);
      }

      $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
      $content['columns'][(int)$colIndex]['links'][(int)$linkIndex] = $clean;

      saveContent($pdo, $SECTION, $content);

      jsonResponse([
        'message'     => 'Link updated.',
        'field'       => $field,
        'columnIndex' => (int)$colIndex,
        'value'       => $content['columns'][(int)$colIndex]['links'][(int)$linkIndex],
      ]);
    }

    // ── Patch a column title ──
    if ($field === 'columns.title') {
      $colIndex = $body['columnIndex'] ?? null;

      if ($colIndex === null || !isset($content['columns'][(int)$colIndex])) {
        jsonResponse(['error' => 'Valid "columnIndex" is required.'], 400);
      }

      $content['columns'][(int)$colIndex]['title'] = sanitize((string)$value);

      saveContent($pdo, $SECTION, $content);

      jsonResponse([
        'message'     => 'Column title updated.',
        'field'       => $field,
        'columnIndex' => (int)$colIndex,
        'value'       => $content['columns'][(int)$colIndex]['title'],
      ]);
    }

    // ── Standard object fields (logo, bottomBar) ──
    if (!array_key_exists($field, $content)) {
      jsonResponse(['error' => "Field '{$field}' does not exist."], 404);
    }

    if (is_array($value)) {
      $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
      $content[$field] = array_merge($content[$field], $clean);
    } else {
      $content[$field] = sanitize((string)$value);
    }

    saveContent($pdo, $SECTION, $content);

    jsonResponse([
      'message' => 'Updated.',
      'field'   => $field,
      'value'   => $content[$field],
    ]);


    // ── DELETE ───────────────────────────────────────────────────────
    // Shapes (query params):
    //   Delete a column → ?field=columns&index=1
    //   Delete a link   → ?field=columns.links&columnIndex=0&index=2
  case 'DELETE':
    $field = sanitize($_GET['field'] ?? '');
    $index = $_GET['index'] ?? null;

    if (empty($field) || $index === null) {
      jsonResponse(['error' => '"field" and "index" query params are required.'], 400);
    }

    $content = getSectionContent($pdo, $SECTION);

    // ── Delete a link from a column ──
    if ($field === 'columns.links') {
      $colIndex = $_GET['columnIndex'] ?? null;

      if ($colIndex === null || !isset($content['columns'][(int)$colIndex])) {
        jsonResponse(['error' => 'Valid "columnIndex" is required.'], 400);
      }
      if (!isset($content['columns'][(int)$colIndex]['links'][(int)$index])) {
        jsonResponse(['error' => 'Link index out of range.'], 404);
      }

      array_splice($content['columns'][(int)$colIndex]['links'], (int)$index, 1);

      saveContent($pdo, $SECTION, $content);

      jsonResponse([
        'message'     => 'Link deleted.',
        'field'       => $field,
        'columnIndex' => (int)$colIndex,
        'items'       => $content['columns'][(int)$colIndex]['links'],
      ]);
    }

    // ── Delete a column ──
    if ($field === 'columns') {
      if (!isset($content['columns'][(int)$index])) {
        jsonResponse(['error' => 'Column index out of range.'], 404);
      }

      array_splice($content['columns'], (int)$index, 1);

      saveContent($pdo, $SECTION, $content);

      jsonResponse([
        'message' => 'Column deleted.',
        'field'   => $field,
        'items'   => $content['columns'],
      ]);
    }

    jsonResponse(['error' => "DELETE on '{$field}' is not supported."], 422);


  default:
    jsonResponse(['error' => "Method '{$method}' not allowed."], 405);
}
