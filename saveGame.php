<?php
// saveGame.php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId']) && isset($data['moves']) && isset($data['timeSpent'])) {
    $userId = $data['userId'];
    $moves = $data['moves'];
    $timeSpent = $data['timeSpent'];

    $stmt = $pdo->prepare('INSERT INTO games (user_id, moves, time_spent) VALUES (?, ?, ?)');
    $stmt->execute([$userId, $moves, $timeSpent]);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dati mancanti']);
}
?>
