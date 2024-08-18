<?php
// db.php
$host = 'fdb1027.runhosting.com'; // 'localhost' o l'indirizzo del tuo database
$db = '4501745_dbprova1'; // il nome del tuo database
$user = '4501745_dbprova1';// username del tuo database
$pass = 'Rospolin2014!';// password del tuo database

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo 'Connessione fallita: ' . $e->getMessage();
}
?>
