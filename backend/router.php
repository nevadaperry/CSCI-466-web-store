<?php

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

switch ($method . ' ' . $uri) {
case 'GET /':
	print 'Here is a response';
	break;
case 'GET /smoothie':
	print 'Here is a smoothie';
	break;
case 'PUT /smoothie':
	print 'You put a smoothie';
	break;
}

?>