<?php
require 'db.php';

try {
    $stmt = $pdo->query('SELECT 1');
    if ($stmt) {
        echo json_encode(['status' => 'success', 'message' => 'Connessione al database riuscita']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Connessione fallita: ' . $e->getMessage()]);
}
?>
