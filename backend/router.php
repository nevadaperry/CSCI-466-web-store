<?php

include "db/product.php";

header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

switch ($method . ' ' . $uri) {
case 'GET /':
	$abcd = listProducts();
	print json_encode($abcd);
	break;
case 'GET /smoothie':
	print 'Here is a smoothie';
	break;
case 'PUT /smoothie':
	print 'You put a smoothie';
	break;
}

?>
