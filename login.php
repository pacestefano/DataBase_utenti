<?php
// login.php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['status' => 'success', 'userId' => $user['id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username o password errati']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dati mancanti']);
}
?>
