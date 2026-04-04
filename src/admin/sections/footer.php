<?php
require_once dirname(__DIR__) . '/../../includes/auth.php';
session_start();
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Edit Footer — MetaGames CMS</title>
  <link rel="stylesheet" href="/src/css/admin/output.css">
</head>

<body class="bg-surface text-text font-sans">

  <header class="bg-surface-card border-b border-border px-8 py-4 flex justify-between items-center">
    <h1 class="text-base font-semibold">🎮 MetaGames CMS</h1>
    <nav class="flex gap-5 text-sm">
      <a href="/src/admin/index.php" class="text-muted hover:text-text transition-colors">← Dashboard</a>
      <a href="/src/admin/logout.php" class="text-danger hover:underline">Log out</a>
    </nav>
  </header>

  <main class="max-w-3xl mx-auto mt-8 px-6 pb-16">
    <h1 class="text-2xl font-semibold">Edit: Footer</h1>

    <!-- LOGO -->
    <p class="text-[0.7rem] font-bold tracking-widest uppercase text-muted mt-8 mb-3">Logo</p>
    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-logo">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Logo</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-badge-blue-bg text-badge-blue-fg border border-accent">Read / Update</span>
      </div>
      <div class="skeleton"></div>
    </div>

    <!-- COLUMNS -->
    <p class="text-[0.7rem] font-bold tracking-widest uppercase text-muted mt-8 mb-3">Footer Columns</p>

    <!-- Column cards are injected here by JS -->
    <div id="columns-container"></div>

    <!-- Add Column -->
    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-add-column">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Add New Column</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-success-bg text-success border border-success">Create</span>
      </div>
      <div class="field">
        <label>Column Title <span class="text-muted text-xs">(optional)</span></label>
        <input type="text" id="new-column-title" placeholder="e.g. Quick Links:">
      </div>
      <button class="btn btn-green mt-3" id="btn-add-column">+ Add Column</button>
    </div>

    <!-- BOTTOM BAR -->
    <p class="text-[0.7rem] font-bold tracking-widest uppercase text-muted mt-8 mb-3">Bottom Bar</p>
    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-bottomBar">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Bottom Bar</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-badge-blue-bg text-badge-blue-fg border border-accent">Read / Update</span>
      </div>
      <div class="skeleton"></div>
    </div>
  </main>

  <div id="toast"></div>

  <script type="module" src="../../js/pages/footer.js"></script>
</body>

</html>