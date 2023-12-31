<?php

include_once "query.php";

function list_orders($pdo) {
	return query_db($pdo, "
		SELECT
			o.id,
			c.id AS customer_id,
			c.email AS customer_email,
			o.placed_at,
			o.shipping_address,
			o.name_on_card,
			o.card_number,
			o.card_exp,
			o.card_cvv,
			o.card_zipcode,
			o.phone_number,
			o.tracking_number,
			o.shipped_at,
			SUM(oli.frozen_price * oli.quantity) AS total_price,
			IF(
				COUNT(oli.id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(JSON_OBJECT(
					'id', oli.id,
					'frozen_price', oli.frozen_price,
					'quantity', oli.quantity,
					'product_id', p.id,
					'product_name', p.name,
					'product_description', p.description
				))
			) AS line_items,
			IF(
				COUNT(`on`.id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(JSON_OBJECT(
					'id', on.id,
					'content', on.content,
					'added_at', on.added_at
				))
			) AS notes
		FROM `order` o
		LEFT JOIN order_line_item oli ON oli.order_id = o.id
		LEFT JOIN product p ON oli.product_id = p.id
		LEFT JOIN order_note `on` ON `on`.order_id = o.id
		JOIN customer c ON o.customer_id = c.id
		GROUP BY 1
	");
}

function list_orders_for_customer($pdo, $email) {
	return query_db($pdo, "
		SELECT
			o.id,
			c.id AS customer_id,
			c.email AS customer_email,
			o.placed_at,
			o.shipping_address,
			o.name_on_card,
			o.card_number,
			o.card_exp,
			o.card_cvv,
			o.card_zipcode,
			o.phone_number,
			o.tracking_number,
			o.shipped_at,
			SUM(oli.frozen_price * oli.quantity) AS total_price,
			IF(
				COUNT(oli.id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(JSON_OBJECT(
					'id', oli.id,
					'frozen_price', oli.frozen_price,
					'quantity', oli.quantity,
					'product_id', p.id,
					'product_name', p.name,
					'product_description', p.description
				))
			) AS line_items,
			IF(
				COUNT(`on`.id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(JSON_OBJECT(
					'id', on.id,
					'content', on.content,
					'added_at', on.added_at
				))
			) AS notes
		FROM `order` o
		LEFT JOIN order_line_item oli ON oli.order_id = o.id
		LEFT JOIN product p ON oli.product_id = p.id
		LEFT JOIN order_note `on` ON `on`.order_id = o.id
		JOIN customer c ON o.customer_id = c.id
		WHERE c.email = ?
		GROUP BY 1
	", [$email]);
}

function get_order_details($pdo, $order_id) {
	return query_db($pdo, "
		SELECT
			o.id,
			c.id AS customer_id,
			c.email AS customer_email,
			o.placed_at,
			o.shipping_address,
			o.name_on_card,
			o.card_number,
			o.card_exp,
			o.card_cvv,
			o.card_zipcode,
			o.phone_number,
			o.tracking_number,
			o.shipped_at,
			SUM(oli.frozen_price * oli.quantity) AS total_price,
			IF(
				COUNT(oli.id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(JSON_OBJECT(
					'id', oli.id,
					'frozen_price', oli.frozen_price,
					'quantity', oli.quantity,
					'product_id', p.id,
					'product_name', p.name,
					'product_description', p.description
				))
			) AS line_items,
			IF(
				COUNT(`on`.id) = 0,
				JSON_ARRAY(),
				JSON_ARRAYAGG(JSON_OBJECT(
					'id', on.id,
					'content', on.content,
					'added_at', on.added_at
				))
			) AS notes
		FROM `order` o
		LEFT JOIN order_line_item oli ON oli.order_id = o.id
		LEFT JOIN product p ON oli.product_id = p.id
		LEFT JOIN order_note `on` ON `on`.order_id = o.id
		JOIN customer c ON o.customer_id = c.id
		WHERE o.id = ?
		GROUP BY 1
	", [$order_id])[0];
}

function post_order($pdo, $order) {
	// INSERT CTEs cannot be chained in MySQL so this is the next best solution
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
	
	// MariaDB 10.5 compatible replacement for json_table()
	// Safe against SQL injection because user data is still parameterized
	$line_item_values = [];
	foreach ($order['line_items'] as $line_item) {
		array_push(
			$line_item_values,
			$line_item['product_id'],
			$line_item['quantity']
		);
	}
	$line_item_selects = implode(
		' UNION ALL ',
		array_fill(
			0,
			count($order['line_items']),
			'SELECT ? AS product_id, ? as quantity'
		)
	);
	
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
		LEFT JOIN (
			{$line_item_selects}
		) AS line_item ON TRUE
		JOIN product ON line_item.product_id = product.id
	", $line_item_values);
	
	query_db($pdo, "
		UPDATE product
		JOIN (
			{$line_item_selects}
		) AS line_item ON line_item.product_id = product.id
		SET product.stock = product.stock - line_item.quantity
	", $line_item_values);
	
	$order_id = query_db($pdo, "
		SELECT id FROM `order` ORDER BY id DESC LIMIT 1
	")[0]['id'];
	
	$pdo->commit();
	
	return $order_id;
}

function update_order_tracking_number($pdo, $order_id, $tracking_number) {
	query_db($pdo, "
		UPDATE `order`
		SET
			tracking_number = ?,
			shipped_at = coalesce(shipped_at, now())
		WHERE id = ?
	", [$tracking_number, $order_id]);
}

function add_order_note($pdo, $order_id, $note) {
	query_db($pdo, "
		INSERT INTO order_note (order_id, content)
		VALUES (?, ?)
	", [$order_id, $note]);
}
