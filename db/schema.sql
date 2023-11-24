CREATE TABLE product (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	name text NOT NULL,
	description text NOT NULL,
	price numeric(9,2) NOT NULL,
	stock int NOT NULL
);

CREATE TABLE `order` (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	shipping_address text NOT NULL,
	name_on_card text NOT NULL,
	card_number text NOT NULL,
	card_exp text NOT NULL,
	card_cvv text NOT NULL,
	card_zipcode text NOT NULL,
	phone_number text NOT NULL,
	tracking_number text,
	placed_at timestamp NOT NULL DEFAULT now(),
	shipped_at timestamp,
	CONSTRAINT tracking_number_includes_timestamp CHECK (tracking_number XOR shipped_at = 0)
);

CREATE TABLE order_line_item (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	order_id bigint NOT NULL REFERENCES `order` (id),
	product_id bigint NOT NULL REFERENCES product (id),
	frozen_price numeric(9,2) NOT NULL,
	quantity int NOT NULL
);
CREATE INDEX order_line_item_order_id ON order_line_item (order_id);

CREATE TABLE order_note (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	order_id bigint NOT NULL REFERENCES `order` (id),
	content text NOT NULL,
	added_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX order_note_order_id ON order_note (order_id);
