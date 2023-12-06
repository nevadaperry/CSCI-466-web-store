let products;
let cart;
(async () => {
	products = Object.fromEntries(
		(await api.getProducts()).map(product => [
			product.id,
			product
		])
	);
	cart = JSON.parse(localStorage.getItem('cart') ?? '{}');
	for (const [productId, quantity] of Object.entries(cart)) {
		const product = products[productId];
		document.getElementById('cart-items').insertAdjacentHTML(
			'beforeend',
			`
				<tr>
					<td>${product.name}</td>
					<td>${product.price}</td>
					<td>${quantity}</td>
				</tr>
			`,
		);
	}
	document
		.getElementById('cart-items-placeholder')
		.classList
		.add('done-loading');
})();

function getInput(elementId) {
	return document.getElementById(elementId).value;
}

async function placeOrder() {
	const order = {
		email: localStorage.getItem('email') ?? 'NOT LOGGED IN',
		shipping_address: getInput('shipping-address'),
		name_on_card: getInput('name-on-card'),
		card_number: getInput('card-number'),
		card_exp: getInput('card-exp'),
		card_cvv: getInput('card-cvv'),
		card_zipcode: getInput('card-zipcode'),
		phone_number: getInput('phone-number'),
		line_items: Object.entries(cart).map(([productId, quantity]) => ({
			product_id: productId,
			quantity: quantity,
		})),
	};
	const orderId = await api.postOrder(order);
	window.location = `confirmation.html?orderId=${orderId}`;
}
