<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/functions.php';

session_start();
requireLogin();   // returns 401 JSON if not logged in

header('Content-Type: application/json');

$pdo     = getPDO();
$SECTION = 'hero';

// ─────────────────────────────────────────────────────────────────────
// Route by HTTP method
// ─────────────────────────────────────────────────────────────────────
// $method = $_SERVER['REQUEST_METHOD'];

// switch ($method) {

//   // ── GET ─────────────────────────────────────────────────────────
//   // Returns the full section content + which fields are arrays.
//   // The admin page JS calls this on load to populate the editor.
//   case 'GET':
//     $content = getSectionContent($pdo, $SECTION);

//     // Inject _arrayFields so the JS knows which fields support CRUD
//     $content['_arrayFields'] = getArrayFields($content);

//     jsonResponse($content);


//     // ── POST ────────────────────────────────────────────────────────
//     // Add a new item to an array field.
//     // Body: { "field": "features", "item": { "icon": "…", "title": "…", "description": "…" } }
//   case 'POST':
//     $body    = getRequestBody();
//     $field   = sanitize($body['field'] ?? '');
//     $newItem = $body['item']  ?? null;

//     if (empty($field) || $newItem === null) {
//       jsonResponse(['error' => '"field" and "item" are required.'], 400);
//     }

//     $content = getSectionContent($pdo, $SECTION);

//     // Guard: only allow adding to fields that are actual list arrays
//     if (!is_array($content[$field] ?? null) || !array_is_list($content[$field])) {
//       jsonResponse(['error' => "'{$field}' is not an array field. Only array fields support Create."], 422);
//     }

//     // Sanitize every string value in the incoming item
//     $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $newItem);

//     $content[$field][] = $clean;

//     saveContent($pdo, $SECTION, $content);

//     jsonResponse([
//       'message' => 'Item added.',
//       'field'   => $field,
//       'items'   => $content[$field],  // return the updated array so JS can re-render
//     ], 201);


//     // ── PATCH ───────────────────────────────────────────────────────
//     // Update a field. Two shapes:
//     //   Object field → { "field": "cta_primary",  "value": { "text": "…", "url": "…" } }
//     //   String field → { "field": "title", "value": "New Title" }
//     //   Array item   → { "field": "features", "index": 2, "value": { "icon": "…", "title": "…", "description": "…" } }
//   case 'PATCH':
//     $body  = getRequestBody();
//     $field = sanitize($body['field'] ?? '');
//     $value = $body['value'] ?? null;

//     if (empty($field) || $value === null) {
//       jsonResponse(['error' => '"field" and "value" are required.'], 400);
//     }

//     $content = getSectionContent($pdo, $SECTION);

//     if (!array_key_exists($field, $content)) {
//       jsonResponse(['error' => "Field '{$field}' does not exist."], 404);
//     }

//     if (array_is_list($content[$field] ?? [])) {
//       // ── Updating one item inside an array ──
//       $index = $body['index'] ?? null;

//       if ($index === null || !isset($content[$field][$index])) {
//         jsonResponse(['error' => 'Valid "index" is required for array fields.'], 400);
//       }

//       $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
//       $content[$field][(int)$index] = $clean;
//     } else {
//       // ── Updating an object field or string field ──
//       if (is_array($value)) {
//         // Object field (like cta_primary, background_image)
//         $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
//         $content[$field] = array_merge($content[$field], $clean);
//       } else {
//         // String field (like title, subtitle, description)
//         $content[$field] = sanitize((string)$value);
//       }
//     }

//     saveContent($pdo, $SECTION, $content);

//     jsonResponse([
//       'message' => 'Updated.',
//       'field'   => $field,
//       'value'   => $content[$field],
//     ]);


//     // ── DELETE ──────────────────────────────────────────────────────
//     // Remove one item from an array field.
//     // Query params: ?field=features&index=2
//   case 'DELETE':
//     $field = sanitize($_GET['field'] ?? '');
//     $index = $_GET['index'] ?? null;

//     if (empty($field) || $index === null) {
//       jsonResponse(['error' => '"field" and "index" query params are required.'], 400);
//     }

//     $content = getSectionContent($pdo, $SECTION);

//     // Guard: can only delete from list arrays
//     if (!is_array($content[$field] ?? null) || !array_is_list($content[$field])) {
//       jsonResponse(['error' => "'{$field}' is not an array field. Only array fields support Delete."], 422);
//     }

//     if (!isset($content[$field][(int)$index])) {
//       jsonResponse(['error' => 'Index out of range.'], 404);
//     }

//     array_splice($content[$field], (int)$index, 1);  // removes & re-indexes

//     saveContent($pdo, $SECTION, $content);

//     jsonResponse([
//       'message' => 'Item deleted.',
//       'field'   => $field,
//       'items'   => $content[$field],  // return the updated array so JS can re-render
//     ]);


//   default:
//     jsonResponse(['error' => "Method '{$method}' not allowed."], 405);
// }

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


    // ── POST ────────────────────────────────────────────────────────
    // Add a new item to an array field.
    // Body: { "field": "colors", "item": "bg-brand-purple" }
  case 'POST':
    $body    = getRequestBody();
    $field   = sanitize($body['field'] ?? '');
    $newItem = $body['item']  ?? null;

    if (empty($field) || $newItem === null) {
      jsonResponse(['error' => '"field" and "item" are required.'], 400);
    }

    $content = getSectionContent($pdo, $SECTION);

    // Guard: only allow adding to fields that are actual list arrays
    if (!is_array($content[$field] ?? null) || !array_is_list($content[$field])) {
      jsonResponse(['error' => "'{$field}' is not an array field. Only array fields support Create."], 422);
    }

    // Item may be a plain scalar (string) for the colors array
    $clean = is_string($newItem) ? sanitize($newItem) : array_map(
      fn($v) => is_string($v) ? sanitize($v) : $v,
      $newItem
    );

    $content[$field][] = $clean;

    saveContent($pdo, $SECTION, $content);

    jsonResponse([
      'message' => 'Item added.',
      'field'   => $field,
      'items'   => $content[$field],
    ], 201);


    // ── PATCH ───────────────────────────────────────────────────────
    // Update a field. Two shapes:
    //   Scalar field → { "field": "title", "value": "MetaGames 2025" }
    //   Array item   → { "field": "colors", "index": 2, "value": "bg-brand-red" }
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

    if (is_array($content[$field]) && array_is_list($content[$field])) {
      // ── Updating one item inside an array ──
      $index = $body['index'] ?? null;

      if ($index === null || !isset($content[$field][$index])) {
        jsonResponse(['error' => 'Valid "index" is required for array fields.'], 400);
      }

      $clean = is_string($value) ? sanitize($value) : array_map(
        fn($v) => is_string($v) ? sanitize($v) : $v,
        $value
      );
      $content[$field][(int)$index] = $clean;
    } else {
      // ── Updating a plain scalar field (title, etc.) ──
      if (is_array($value)) {
        $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
        $content[$field] = is_array($content[$field])
          ? array_merge($content[$field], $clean)
          : $clean;
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


    // ── DELETE ──────────────────────────────────────────────────────
    // Remove one item from an array field.
    // Query params: ?field=colors&index=2
  case 'DELETE':
    $field = sanitize($_GET['field'] ?? '');
    $index = $_GET['index'] ?? null;

    if (empty($field) || $index === null) {
      jsonResponse(['error' => '"field" and "index" query params are required.'], 400);
    }

    $content = getSectionContent($pdo, $SECTION);

    // Guard: can only delete from list arrays
    if (!is_array($content[$field] ?? null) || !array_is_list($content[$field])) {
      jsonResponse(['error' => "'{$field}' is not an array field. Only array fields support Delete."], 422);
    }

    if (!isset($content[$field][(int)$index])) {
      jsonResponse(['error' => 'Index out of range.'], 404);
    }

    array_splice($content[$field], (int)$index, 1);  // removes & re-indexes

    saveContent($pdo, $SECTION, $content);

    jsonResponse([
      'message' => 'Item deleted.',
      'field'   => $field,
      'items'   => $content[$field],
    ]);


  default:
    jsonResponse(['error' => "Method '{$method}' not allowed."], 405);
}
