/* PRODUCTS */

INSERT INTO product (name, description, price, stock)
VALUES (
	'MaryRuth Organics, Herbal Supplement Drop, Calmness & Relaxation, Pack Of 1, USDA Kava Root, Sugar/Gluten Free, Support Sleep, Calm & Stress Relief, Vegan, Non-GMO, 30 Servings',
	'SDA Organic, Non-GMO, Vegan, Made in a GMP Facility. Dairy Free, Nut Free, Gluten & Wheat Free, Soy Free, Corn Free, Sugar Free, No Synthetic or Artificial Colors, Alcohol Free Tincture.',
	13.97,
	25
);
INSERT INTO product (name, description, price, stock)
VALUES (
	'ShelterLogic SuperMax All Purpose Outdoor 12 x 26-Feet Canopy Replacement Cover for SuperMax Canopies (Cover Only, Frame Not Included)',
	'Super max 12x26 replacement top is the ready to install canopy cover. Designed to exact frame specifications of the 12x26 super max canopy. Don''t settle for cheap tarps or aftermarket covers to replace your canopy cover. Insist on authentic ShelterLogic brand canopy covers. Constructed of the same quality materials and workmanship of our original canopy. Perfect for refurbishing worn out or damaged canopy covers.',
	123.86,
	25
);
INSERT INTO product (name, description, price, stock)
VALUES (
	'Furhaven ThermaNAP Self-Warming Cat Bed for Indoor Cats & Small Dogs, Washable & Reflects Body Heat - Quilted Faux Fur Reflective Bed Mat - Espresso, Small',
	'Keep your pet warm and toasty during the cold winter months with the Furhaven ThermaNAP Self-Warming Pet Bed Pad! This electricity-free self-warming mat captures and retains your pets body heat, as well as radiates warmth back onto your pet. It''s the perfect spot for rest and cuddles. Soft faux fur lines the sleep surface, which is also quilted for additional cozy padding.',
	12.99,
	25
);
INSERT INTO product (name, description, price, stock)
VALUES (
	'Louis Vuitton Pre-Loved Monogram Canvas Montaigne MM, Brown',
	'Sleek and versatile Louis Vuitton Montaigne bag rendered in the house''s signature Monogram coated canvas, featuring natural Vachetta leather top handles in addition to a detachable coated canvas shoulder strap. About the Monogram Print: If you love Louis Vuitton, you are no stranger to the classic Monogram Print. First introduced in the year 1896 by Georges Vuitton, the print was created to stop counterfeiters from copying the brands designs. The repeated pattern is made up of interlocking L and V initials in a serif font, and flowers inspired by Japanese and Oriental designs. The canvas was made to be durable and water resistant which makes it the perfect for everyday use.',
	2850.00,
	25
);
INSERT INTO product (name, description, price, stock)
VALUES (
	'PIMAG Fly Fans for Tables, Fly Repellent Fan Outdoor Indoor Keep Flies Away, Fly Repellent Fans for Tables with Holographic Blades for Picnic, Party, Restaurant, Kitchen, and BBQ, 4 Pack Silver',
	'【Keep Flies Away】PIMAG fly repellent fan use physical methods to keep flies away, which has no side effects on anyone. It keeps you free from the disturbance of flies. You can enjoy clean and fresh food with your family and friends.【Reflective and Safe Fan Blades】The holographic dots pattern blades of the fly fan for outdoor table can refract light that stimulate flies. Furthermore, these soft-touch blades are designed to stop instantly on touch, and turns again after the object is removed. So it won''t hurt our hands or children.【Portable and Soundless】PIMAG fly fan is very lightweight and can be folded, so you can carry it to any place easily. What''s more, the blades rotate quietly and do not make any noise. Because of the quiet design of the fly fan, just turn it on and you can get a quiet and fly-free environment.',
	19.99,
	25
);
INSERT INTO product (name, description, price, stock)
VALUES (
	'Niceday Elliptical Machine, Elliptical Trainer for Home with Hyper-Quiet Magnetic Driving System, 16 Resistance Levels, 15.5IN Stride, 400LBS Weight Capacity',
	'【Minutes Assembly】NICEDAY Elliptical Trainer is designed with 90% pre-assembled. Almost all people can finish installation within 30 mins, very friendly to every home exerciser.【Hyper-Quiet Magnetic Drive System】We developed the latest technology magnetic system and eliminates noise, also control the sound at 20DB even after millions of times workout. No disturbing on working, reading, and sleeping at home.【Fit for 4''9" to 6''2" Exerciser】Equipped with bigger pedals, physical handlebar, and the 15.5” stride, workout experience is almost equivalent to a light commercial-grade ellipticals. All family members can join in the exercise today!【16LB Flywheel with 16 Resistance Levels】Provides double resistance levels than the ordinary product, smooth feeling thanks to 16lb flywheel and high gear ratio, no need for any electrical source. All stages exerciser can get efficient exercise with different resistance, no matter you are beginner or fanatic.',
	499.99,
	25
);
INSERT INTO product (name, description, price, stock)
VALUES (
	'DEWALT 20V MAX Cordless Drill and Impact Driver, Power Tool Combo Kit with 2 Batteries and Charger, Yellow/Black (DCK240C2)',
	'This DEWALT 20V max Lithium Ion Drill Driver/Impact Driver Combo Kit comes with DEWALT cordless tools including the DCD771 20V max 1/2-inch Drill/Driver, and the DCF885 1/4-inch Impact Driver. Both have a compact and lightweight design to fit into tight areas, as well as an ergonomic handle for comfort and control. The DCK240C2 in DEWALT tool kit is ideal of completing a wide range of applications. LED foot light for superior visibility.',
	129.00,
	25
);

/* CUSTOMERS */

INSERT INTO customer (email)
VALUES ('jkinny4@starnet.net');
INSERT INTO customer (email)
VALUES ('procurement@gfs.com');
INSERT INTO customer (email)
VALUES ('where.are.my.keys@outlook.com');
INSERT INTO customer (email)
VALUES ('alfonso.ribeiro@belair.ca.gov');
INSERT INTO customer (email)
VALUES ('touch.the.sky7@gmail.com');

/* ORDERS */

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
	c.id,
	'123 Rainbow Road, Bend, OR 97003',
	'Jennifer Kinny',
	'4111111111111111',
	'08/28',
	'998',
	'97003',
	'800-555-5555'
FROM customer c
WHERE c.email = 'jkinny4@starnet.net';
INSERT INTO order_line_item (
	order_id,
	product_id,
	frozen_price,
	quantity
)
SELECT
	o.id,
	p.id,
	p.price,
	1
FROM `order` o
JOIN customer c ON o.customer_id = c.id
JOIN product p ON p.name = 'Louis Vuitton Pre-Loved Monogram Canvas Montaigne MM, Brown'
WHERE c.email = 'jkinny4@starnet.net';

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
	c.id,
	'123 Warehouse Rd, Wichita, KS 57331',
	'Myra Westinghouse',
	'4111111111111111',
	'08/28',
	'998',
	'57331',
	'800-555-5555'
FROM customer c
WHERE c.email = 'procurement@gfs.com';
INSERT INTO order_line_item (
	order_id,
	product_id,
	frozen_price,
	quantity
)
SELECT
	o.id,
	p.id,
	p.price,
	1
FROM `order` o
JOIN customer c ON o.customer_id = c.id
JOIN product p ON p.name like 'DEWALT 20V MAX Cordless Drill and Impact Driver%'
WHERE c.email = 'procurement@gfs.com';

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
	c.id,
	'332 Lampshade Pkwy, Jacksonville, FL 23345',
	'Sustainable Living',
	'4111111111111111',
	'08/28',
	'998',
	'23345',
	'800-555-5555'
FROM customer c
WHERE c.email = 'where.are.my.keys@outlook.com';
INSERT INTO order_line_item (
	order_id,
	product_id,
	frozen_price,
	quantity
)
SELECT
	o.id,
	p.id,
	p.price,
	1
FROM `order` o
JOIN customer c ON o.customer_id = c.id
JOIN product p ON p.name like 'Furhaven ThermaNAP Self-Warming Cat Bed%'
WHERE c.email = 'where.are.my.keys@outlook.com';

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
	c.id,
	'17 Winding Hill Dr, Bel Air, CA 90241',
	'Alfonso Ribeiro',
	'4111111111111111',
	'08/28',
	'998',
	'90241',
	'800-555-5555'
FROM customer c
WHERE c.email = 'alfonso.ribeiro@belair.ca.gov';
INSERT INTO order_line_item (
	order_id,
	product_id,
	frozen_price,
	quantity
)
SELECT
	o.id,
	p.id,
	p.price,
	1
FROM `order` o
JOIN customer c ON o.customer_id = c.id
JOIN product p ON p.name like 'ShelterLogic SuperMax All Purpose Outdoor 12 x 26-Feet Canopy Replacement Cover%'
WHERE c.email = 'alfonso.ribeiro@belair.ca.gov';

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
	c.id,
	'117 Eagle Circle, Terra Haute, IN 44271',
	'Maureen Wall',
	'4111111111111111',
	'08/28',
	'998',
	'44271',
	'800-555-5555'
FROM customer c
WHERE c.email = 'touch.the.sky7@gmail.com';
INSERT INTO order_line_item (
	order_id,
	product_id,
	frozen_price,
	quantity
)
SELECT
	o.id,
	p.id,
	p.price,
	1
FROM `order` o
JOIN customer c ON o.customer_id = c.id
JOIN product p ON p.name like 'Niceday Elliptical Machine, Elliptical Trainer%'
WHERE c.email = 'touch.the.sky7@gmail.com';
