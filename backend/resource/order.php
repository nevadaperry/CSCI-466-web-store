<?php

include "query.php";

function listOrders() {
	return queryDb("
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
