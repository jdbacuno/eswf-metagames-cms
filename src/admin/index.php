<?php
require_once dirname(__DIR__) . '/../includes/functions.php';
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';

session_start();
requireLogin();

$admin = $_SESSION['admin_username'];
$pdo   = getPDO();

$stmt     = $pdo->query('SELECT section, updated_at FROM page_sections ORDER BY section');
$sections = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Dashboard — MetaGames CMS</title>
  <link rel="stylesheet" href="/src/css/admin/output.css">
</head>

<body class="bg-surface text-text font-sans">

  <header class="bg-surface-card border-b border-border px-8 py-4 flex justify-between items-center">
    <h1 class="text-base font-semibold">🎮 MetaGames CMS</h1>
    <span class="text-sm text-muted">
      Logged in as <strong class="text-text"><?= htmlspecialchars($admin) ?></strong>
      &nbsp;|&nbsp;
      <a href="/src/admin/logout.php" class="text-danger hover:underline">Log out</a>
    </span>
  </header>

  <main class="max-w-4xl mx-auto mt-8 px-6">
    <h2 class="text-xl font-medium text-muted mb-5">Page Sections</h2>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      <?php foreach ($sections as $row): ?>
        <a href="/src/admin/sections/<?= $row['section'] ?>.php"
          class="bg-surface-card border border-border rounded-xl px-5 py-4 no-underline text-text
                  transition-all duration-200 hover:border-accent hover:-translate-y-0.5 block">
          <div class="font-semibold capitalize mb-1"><?= htmlspecialchars($row['section']) ?></div>
          <div class="text-xs text-muted">Updated: <?= $row['updated_at'] ?></div>
        </a>
      <?php endforeach; ?>
    </div>
  </main>

</body>

</html>