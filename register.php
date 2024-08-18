<?php
// register.php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    $stmt = $pdo->prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    try {
        $stmt->execute([$username, $password]);
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            echo json_encode(['status' => 'error', 'message' => 'Username già esistente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Errore del server']);
        }
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dati mancanti']);
}
?>
