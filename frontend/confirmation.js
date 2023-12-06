(async () => {
	const products = Object.fromEntries(
		(await api.getProducts()).map(product => [
			product.id,
			product
		])
	);
	const urlParams = new URLSearchParams(window.location.search);
	const orderId = +urlParams.get('orderId');
	const orderItems = await api.getOrder(orderId);
	for (const orderItem of orderItems) {
		const product = products[orderItem.id];
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
