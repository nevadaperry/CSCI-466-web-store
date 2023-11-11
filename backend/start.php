<?php

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

switch ($method . $uri) {
case 'GET /':
	return 'Here is a response'
	break;
case 'GET /smoothie':
	return 'Here is a smoothie'
	break;
case 'PUT /smoothie':
	return 'You put a smoothie'
	break;
}

?>