<?php

include_once "query.php";

function list_products($pdo) {
	return query_db($pdo, "
		SELECT id, name, description, price, stock FROM product
	");
}

function get_product_details($pdo, $product_id) {
	return query_db($pdo, "
		SELECT
			id,
			name,
			description,
			price,
			stock
		FROM product
		WHERE id = ?
	", [$product_id]);
}

function set_product_stock($pdo, $product_id, $stock) {
	return query_db($pdo, "
		UPDATE product
		SET stock = ?
		WHERE id = ?
	", [$stock, $product_id]);
}

?>
