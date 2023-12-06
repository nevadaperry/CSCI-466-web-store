<?php

include_once "query.php";

function list_orders($pdo) {
	return query_db($pdo, "
		SELECT
			o.id,
			o.shipping_address,
			o.name_on_card,
			o.card_number,
			o.card_exp,
			o.card_cvv,
			o.card_zipcode,
			o.phone_number,
			o.tracking_number,
			SUM(oli.frozen_price * oli.quantity) AS total_price,
			JSON_ARRAYAGG(JSON_OBJECT(
				'id', oli.id,
				'frozen_price', oli.frozen_price,
				'quantity', oli.quantity,
				'product_id', p.id,
				'product_name', p.name,
				'product_description', p.description
			)) AS line_items,
			JSON_ARRAYAGG(JSON_OBJECT(
				'id', on.id,
				'content', on.content,
				'added_at', on.added_at
			)) AS notes
		FROM `order` o
		LEFT JOIN order_line_item oli ON oli.order_id = o.id
		LEFT JOIN product p ON oli.product_id = p.id
		LEFT JOIN order_note `on` ON `on`.order_id = o.id
		GROUP BY 1
	");
}

function get_order_details($pdo, $order_id) {
	return query_db($pdo, "
		SELECT
			o.id,
			o.shipping_address,
			o.name_on_card,
			o.card_number,
			o.card_exp,
			o.card_cvv,
			o.card_zipcode,
			o.phone_number,
			o.tracking_number,
			SUM(oli.frozen_price * oli.quantity) AS total_price,
			JSON_ARRAYAGG(JSON_OBJECT(
				'id', oli.id,
				'frozen_price', oli.frozen_price,
				'quantity', oli.quantity,
				'product_id', p.id,
				'product_name', p.name,
				'product_description', p.description
			)) AS line_items,
			JSON_ARRAYAGG(JSON_OBJECT(
				'id', on.id,
				'content', on.content,
				'added_at', on.added_at
			)) AS notes
		FROM `order` o
		LEFT JOIN order_line_item oli ON oli.order_id = o.id
		LEFT JOIN product p ON oli.product_id = p.id
		LEFT JOIN order_note `on` ON `on`.order_id = o.id
		WHERE o.id = ?
	", [$order_id]);
}

function post_order($pdo, $order) {
	// pain
	$pdo->beginTransaction();
	
	query_db($pdo, "
		INSERT INTO customer (email) VALUES (
			?
		) ON DUPLICATE KEY UPDATE id = id
	", [
		$order['email']
	]);
	
	query_db($pdo, "
		INSERT INTO `order` (
			customer_id,
			shipping_address,
			name_on_card,
			card_number,
			card_exp,
			card_cvv,
			card_zipcode,
			phone_number
		)
		SELECT
			inserted_customer.id,
			?,
			?,
			?,
			?,
			?,
			?,
			?
		FROM (
			SELECT id FROM customer WHERE email = ?
		) inserted_customer
	", [
		$order['shipping_address'],
		$order['name_on_card'],
		$order['card_number'],
		$order['card_exp'],
		$order['card_cvv'],
		$order['card_zipcode'],
		$order['phone_number'],
		$order['email']
	]);
	
	query_db($pdo, "
		INSERT INTO order_line_item (
			order_id,
			product_id,
			frozen_price,
			quantity
		)
		SELECT
			inserted_order.id,
			line_item.product_id,
			product.price,
			line_item.quantity
		FROM (
			SELECT id FROM `order` ORDER BY id DESC LIMIT 1
		) inserted_order
		LEFT JOIN json_table(
			?,
			'$[*]' COLUMNS (
				product_id bigint PATH '$.product_id',
				quantity int PATH '$.quantity'
			)
		) AS line_item ON TRUE
		JOIN product ON line_item.product_id = product.id
	", [
		json_encode($order['line_items'])
	]);
	
	$order_id = query_db($pdo, "
		SELECT id FROM `order` ORDER BY id DESC LIMIT 1
	")[0]['id'];
	
	$pdo->commit();
	
	return $order_id;
}
