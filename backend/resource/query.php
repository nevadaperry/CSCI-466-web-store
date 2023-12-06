<?php

function connect_to_db() {
	$host = getenv('MYSQL_HOST') ?? "courses";
	$dbname = getenv('MYSQL_DATABASE') ?? "z1976298";
	$username = getenv('MYSQL_USER') ?? "z1976298";
	$password = getenv('MYSQL_PASSWORD') ?? "1997Feb17";
	$dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";
	$pdo = new PDO($dsn, $username, $password, [
		PDO::ATTR_EMULATE_PREPARES   => false,
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	]);
	return $pdo;
}

function query_db($pdo, $query, $args = []) {
	$statement = $pdo->prepare($query);
	$statement->execute($args);
	$rows = $statement->fetchAll(PDO::FETCH_CLASS);
	return $rows;
}

?>
