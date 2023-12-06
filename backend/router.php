<?php

include_once "resource/product.php";
include_once "resource/order.php";

header('Access-Control-Allow-Origin: *');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if ("{$method} {$uri}" == 'GET /') {
	print 'You\'ve reached web-store\'s backend API. To see the route list, check api.js on the frontend.';
} else if ("{$method} {$uri}" == 'GET /products') {
	print json_encode(list_products());
} else if (preg_match('/^GET \/products\/[0-9]+$/', "{$method} {$uri}")) {
	$product_id = explode('/', $uri)[2];
	print json_encode(get_product_details($product_id));
} else if ("{$method} {$uri}" == 'GET /orders') {
	print json_encode(list_orders());
} else if ("{$method} {$uri}" == 'GET /smoothie') {
	print 'Here is a smoothie';
} else if ("{$method} {$uri}" == 'PUT /smoothie') {
	print 'You put a smoothie';
}

?>
