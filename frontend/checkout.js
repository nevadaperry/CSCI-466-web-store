let products;
let cartItems;
(async () => {
	products = Object.fromEntries(
		(await api.getProducts()).map(product => [
			product.id,
			product
		])
	);
	cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
	cartItems.push({productId: 19, quantity: 2});
	cartItems.push({productId: 14, quantity: 3});
	for (const cartItem of cartItems) {
		const product = products[cartItem.productId];
		document.getElementById('cart-items').insertAdjacentHTML(
			'beforeend',
			`
				<tr>
					<td>${product.name}</td>
					<td>${product.price}</td>
					<td>${cartItem.quantity}</td>
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
		line_items: cartItems.map(cartItem => ({
			product_id: cartItem.productId,
			quantity: cartItem.quantity,
		})),
	};
	const orderId = await api.postOrder(order);
	window.location = `confirmation.html?orderId=${orderId}`;
}
