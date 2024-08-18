<?php
// gameHistory.php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId'])) {
    $userId = $data['userId'];

    $stmt = $pdo->prepare('SELECT * FROM games WHERE user_id = ? ORDER BY date DESC');
    $stmt->execute([$userId]);
    $games = $stmt->fetchAll();

    echo json_encode(['status' => 'success', 'games' => $games]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dati mancanti']);
}
?>
