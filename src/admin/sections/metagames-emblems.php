<?php
require_once dirname(__DIR__) . '/../../includes/auth.php';
session_start();
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Edit MetaGames Emblems — MetaGames CMS</title>
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
    <h1 class="text-2xl font-semibold">Edit: MetaGames Emblems</h1>

    <p class="text-[0.7rem] font-bold tracking-widest uppercase text-muted mt-8 mb-3">Heading</p>
    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-title">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Section title</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-badge-blue-bg text-badge-blue-fg border border-accent">Read / Update</span>
      </div>
      <div class="skeleton"></div>
    </div>

    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-motto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Motto</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-badge-blue-bg text-badge-blue-fg border border-accent">Read / Update</span>
      </div>
      <div class="skeleton"></div>
    </div>

    <p class="text-[0.7rem] font-bold tracking-widest uppercase text-muted mt-8 mb-3">Logo</p>
    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-logo">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Center logo</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-badge-blue-bg text-badge-blue-fg border border-accent">Read / Update</span>
      </div>
      <div class="skeleton"></div>
    </div>

    <p class="text-[0.7rem] font-bold tracking-widest uppercase text-muted mt-8 mb-3">Color wheel</p>
    <div class="bg-surface-card border border-border rounded-xl px-6 py-5 mb-4" id="card-emblems">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Segments</h2>
        <span class="text-[0.7rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full
                     bg-success-bg text-success border border-success">Full CRUD</span>
      </div>
      <div class="skeleton"></div>
    </div>

    <p class="text-xs text-muted mt-4 max-w-xl">
      <strong class="text-text">Background</strong> accepts CSS colors (e.g. <code class="text-text">var(--green)</code>, <code class="text-text">#ffffff</code>).
      <strong class="text-text">Color</strong> is the label used for contrast (match <code class="text-text">White</code> / <code class="text-text">Yellow</code> / <code class="text-text">Black</code> for correct text/button colors).
    </p>
  </main>

  <div id="toast"></div>

  <script type="module" src="../../js/pages/metagames-emblems-cms.js"></script>
</body>

</html>
