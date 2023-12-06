let products;
(async () => {
	products = Object.fromEntries(
		(await api.getProducts()).map(product => [
			product.id,
			product
		])
	);
	const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
	cartItems.push({id: 19, quantity: 1});
	for (const cartItem of cartItems) {
		const product = products[cartItem.id];
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

document.getElementById('email').value = localStorage.getItem('email') ?? 'abczxc';
