<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/functions.php';

session_start();

if (isLoggedIn()) {
  header('Location: /src/admin/index.php');
  exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = sanitize($_POST['username'] ?? '');
  $password = $_POST['password'] ?? '';

  if (empty($username) || empty($password)) {
    $error = 'Username and password are required.';
  } else {
    $pdo  = getPDO();
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ?');
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
      $_SESSION['admin_id']       = $admin['id'];
      $_SESSION['admin_username'] = $admin['username'];
      header('Location: /src/admin/index.php');
      exit;
    }

    $error = 'Invalid username or password';
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Admin Login — MetaGames CMS</title>
  <link rel="stylesheet" href="/src/css/admin/output.css">
</head>

<body class="bg-surface text-text font-sans flex items-center justify-center min-h-screen">

  <div class="bg-surface-card border border-border rounded-xl p-8 w-full max-w-sm">
    <h1 class="text-2xl font-semibold text-center mb-6">🛡️ Admin Login</h1>

    <?php if ($error): ?>
      <div class="bg-danger/10 border border-danger rounded-lg px-3 py-2 text-sm text-danger mb-4">
        <?= $error ?>
      </div>
    <?php endif; ?>

    <form method="POST">
      <label class="block text-xs text-muted mb-1" for="username">Username</label>
      <input type="text" id="username" name="username" required autocomplete="username"
        value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
        class="w-full px-3 py-2 bg-surface border border-border rounded-md text-text text-sm mb-4
                    focus:outline-none focus:border-accent">

      <label class="block text-xs text-muted mb-1" for="password">Password</label>
      <input type="password" id="password" name="password" required autocomplete="current-password"
        class="w-full px-3 py-2 bg-surface border border-border rounded-md text-text text-sm mb-4
                    focus:outline-none focus:border-accent">

      <button type="submit"
        class="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-md text-base cursor-pointer transition-colors">
        Log In
      </button>
    </form>

    <p class="text-center mt-4 text-sm text-muted">
      <a href="/src/admin/register.php" class="text-accent hover:underline">Create an admin account →</a>
    </p>
  </div>

</body>

</html>