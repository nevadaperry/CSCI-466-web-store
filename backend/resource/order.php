<?php

include_once "query.php";

function list_orders() {
	return query_db("
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

function post_order($order) {
	return query_db("
		WITH inserted AS (
			INSERT INTO `order` (
				shipping_address,
				name_on_card,
				card_number,
				card_exp,
				card_cvv,
				card_zipcode,
				phone_number
			) VALUES (
				?,
				?,
				?,
				?,
				?,
				?,
				?
			)
			RETURNING id
		)
		INSERT INTO order_line_item (
			order_id,
			product_id,
			frozen_price,
			quantity
		)
		SELECT
			inserted.id AS order_id,
			line_item.product_id,
			p.price AS frozen_price,
			line_item.quantity
		FROM json_table(
			?,
			'$[*]' columns (
				order_id bigint PATH '$.order_id',
				product_id bigint PATH '$.product_id',
				price decimal(9,2) PATH '$.price',
				quantity int PATH '$.quantity'
			)
		) AS line_item
		JOIN product p ON line_item.product_id = p.id
	", [
		$order['shipping_address'],
		$order['name_on_card'],
		$order['card_number'],
		$order['card_exp'],
		$order['card_cvv'],
		$order['card_zipcode'],
		$order['phone_number'],
		$order['line_items']
	]);
}
