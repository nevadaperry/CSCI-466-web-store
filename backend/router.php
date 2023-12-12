<?php

include_once "resource/query.php";
include_once "resource/product.php";
include_once "resource/order.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Origin, Accept');
header('Access-Control-Allow-Methods: OPTIONS, TRACE, GET, HEAD, POST, PUT');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$pdo = connect_to_db();

if (preg_match('/^\/\~z1976298\/router\.php/', $uri)) {
	// Make university hosted PHP act like PHP's built-in web server by
	// taking out the /z1976298/router.php part
	$uri = substr($uri, 21);
}

if ("{$method} {$uri}" == 'GET /') {
	print 'You\'ve reached web-store\'s backend API. To see the route list, check api.js on the frontend.';
}
else if ("{$method} {$uri}" == 'GET /products') {
	print json_encode(list_products($pdo));
}
else if (preg_match(
	'/^GET \/products\/[0-9]+$/',
	"{$method} {$uri}"
)) {
	$product_id = explode('/', $uri)[2];
	print json_encode(get_product_details($pdo, $product_id));
}
else if (preg_match(
	'/^PUT \/products\/[0-9]+$/',
	"{$method} {$uri}"
)) {
	$product_id = explode('/', $uri)[2];
	$stock = file_get_contents('php://input');
	set_product_stock($pdo, $product_id, $stock);
}
else if ("{$method} {$uri}" == 'GET /orders') {
	print json_encode(list_orders($pdo));
}
else if (preg_match(
	'/^GET \/orders-for-customer\/.+$/',
	"{$method} {$uri}"
)) {
	$email = explode('/', $uri)[2];
	print json_encode(list_orders_for_customer($pdo, $email));
}
else if (preg_match(
	'/^GET \/orders\/[0-9]+$/',
	"{$method} {$uri}"
)) {
	$order_id = explode('/', $uri)[2];
	print json_encode(get_order_details($pdo, $order_id));
}
else if ("{$method} {$uri}" == 'POST /orders') {
	$order = file_get_contents('php://input');
	print json_encode(post_order($pdo, json_decode($order, true)));
}
else if (preg_match(
	'/^PUT \/orders\/[0-9]+\/tracking-number$/',
	"{$method} {$uri}"
)) {
	$order_id = explode('/', $uri)[2];
	$tracking_number = file_get_contents('php://input');
	update_order_tracking_number($pdo, $order_id, $tracking_number);
}
else if (preg_match(
	'/^POST \/orders\/[0-9]+\/note$/',
	"{$method} {$uri}"
)) {
	$order_id = explode('/', $uri)[2];
	$note = file_get_contents('php://input');
	add_order_note($pdo, $order_id, $note);
}
else if ("{$method} {$uri}" == 'GET /smoothie') {
	print 'Here is a smoothie';
}
else if ("{$method} {$uri}" == 'PUT /smoothie') {
	print 'You put a smoothie';
}
else {
	throw new Exception("Unknown endpoint {$method} {$uri}");
}

?>
