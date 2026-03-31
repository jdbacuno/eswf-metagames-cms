<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/functions.php';

session_start();

$error   = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = sanitize($_POST['username'] ?? '');
  $password = $_POST['password'] ?? '';
  $confirm  = $_POST['confirm']  ?? '';

  if (empty($username) || empty($password)) {
    $error = 'All fields are required.';
  } elseif (strlen($password) < 8) {
    $error = 'Password must be at least 8 characters.';
  } elseif ($password !== $confirm) {
    $error = 'Passwords do not match.';
  } else {
    $pdo  = getPDO();
    $stmt = $pdo->prepare('SELECT id FROM admins WHERE username = ?');
    $stmt->execute([$username]);

    if ($stmt->fetch()) {
      $error = 'That username is already taken.';
    } else {
      $hash = password_hash($password, PASSWORD_DEFAULT);
      $stmt = $pdo->prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');
      $stmt->execute([$username, $hash]);
      $success = 'Account created! <a href="/src/admin/login.php" class="underline">Log in →</a>';
    }
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Register — MetaGames CMS</title>
  <link rel="stylesheet" href="/src/css/admin/output.css">
</head>

<body class="bg-surface text-text font-sans flex items-center justify-center min-h-screen">

  <div class="bg-surface-card border border-border rounded-xl p-8 w-full max-w-sm">
    <h1 class="text-2xl font-semibold text-center mb-6">📝 Create Admin</h1>

    <?php if ($error): ?>
      <div class="bg-danger/10 border border-danger rounded-lg px-3 py-2 text-sm text-danger mb-4">
        <?= $error ?>
      </div>
    <?php endif; ?>

    <?php if ($success): ?>
      <div class="bg-success-bg border border-success rounded-lg px-3 py-2 text-sm text-success mb-4">
        <?= $success ?>
      </div>
    <?php endif; ?>

    <?php if (!$success): ?>
      <form method="POST">
        <label class="block text-xs text-muted mb-1">Username</label>
        <input type="text" name="username" required
          value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
          class="w-full px-3 py-2 bg-surface border border-border rounded-md text-text text-sm mb-4
                      focus:outline-none focus:border-accent">

        <label class="block text-xs text-muted mb-1">Password</label>
        <input type="password" name="password" required
          class="w-full px-3 py-2 bg-surface border border-border rounded-md text-text text-sm mb-4
                      focus:outline-none focus:border-accent">

        <label class="block text-xs text-muted mb-1">Confirm Password</label>
        <input type="password" name="confirm" required
          class="w-full px-3 py-2 bg-surface border border-border rounded-md text-text text-sm mb-4
                      focus:outline-none focus:border-accent">

        <button type="submit"
          class="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-md text-base cursor-pointer transition-colors">
          Create Account
        </button>
      </form>
    <?php endif; ?>

    <p class="text-center mt-4 text-sm text-muted">
      <a href="/src/admin/login.php" class="text-accent hover:underline">← Back to login</a>
    </p>
  </div>

</body>

</html>