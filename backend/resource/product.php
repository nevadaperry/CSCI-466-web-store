<?php

include_once "query.php";

function list_products() {
	return query_db("
		SELECT id, name, description, price, stock FROM product
	");
}

function get_product_details($product_id) {
	return query_db("
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

function set_product_stock($product_id, $stock) {
	return query_db("
		UPDATE product
		SET stock = ?
		WHERE id = ?
	", [$stock, $product_id]);
}

?>
