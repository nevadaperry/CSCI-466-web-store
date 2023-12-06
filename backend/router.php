<?php

include_once "resource/product.php";
include_once "resource/order.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Origin, Accept');
header('Access-Control-Allow-Methods: OPTIONS, TRACE, GET, HEAD, POST, PUT');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if ("{$method} {$uri}" == 'GET /') {
	print 'You\'ve reached web-store\'s backend API. To see the route list, check api.js on the frontend.';
}
else if ("{$method} {$uri}" == 'GET /products') {
	print json_encode(list_products());
}
else if (preg_match('/^GET \/products\/[0-9]+$/', "{$method} {$uri}")) {
	$product_id = explode('/', $uri)[2];
	print json_encode(get_product_details($product_id));
}
else if (preg_match('/^PUT \/products\/[0-9]+$/', "{$method} {$uri}")) {
	$product_id = explode('/', $uri)[2];
	$stock = file_get_contents('php://input');
	set_product_stock($product_id, $stock);
}
else if ("{$method} {$uri}" == 'GET /orders') {
	print json_encode(list_orders());
}
else if ("{$method} {$uri}" == 'POST /orders') {
	$order = file_get_contents('php://input');
	print gettype($order) . 'hello' . $order;
	//print json_encode(post_order(json_decode($order)));
}
else if ("{$method} {$uri}" == 'GET /smoothie') {
	print 'Here is a smoothie';
}
else if ("{$method} {$uri}" == 'PUT /smoothie') {
	print 'You put a smoothie';
}

?>
