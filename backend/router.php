<?php

include "resource/product.php";
include "resource/order.php";

header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

switch ("{$method} {$uri}") {
case 'GET /':
	print 'You\'ve reached web-store\'s backend API. To see the route list, check api.js on the frontend.';
	break;
case 'GET /products':
	print json_encode(listProducts());
	break;
case 'GET /orders':
	print json_encode(listOrders());
	break;
case 'GET /smoothie':
	print 'Here is a smoothie';
	break;
case 'PUT /smoothie':
	print 'You put a smoothie';
	break;
}

?>
