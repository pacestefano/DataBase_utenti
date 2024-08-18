<?php
require 'db.php'; // Include the database connection

header('Content-Type: application/json');

$theme = isset($_GET['theme']) ? $_GET['theme'] : 'geografia';

try {
    $sql = "SELECT domanda, risposta, descrizione, tema FROM domande_risposte WHERE tema = :theme";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['theme' => $theme]);
    $questions = $stmt->fetchAll();
    echo json_encode($questions);
} catch (PDOException $e) {
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => "General error: " . $e->getMessage()]);
}
?>
