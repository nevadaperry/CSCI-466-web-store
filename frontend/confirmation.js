(async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const orderId = +urlParams.get('orderId');
	const order = await api.getOrderDetails(orderId);
	// Not sure how to do this without MySQL stringifying the object array
	console.log('hi', JSON.stringify(order, null, 2));
	const lineItems = JSON.parse(order.line_items);
	for (const lineItem of lineItems) {
		document.getElementById('order-items').insertAdjacentHTML(
			'beforeend',
			`
				<tr>
					<td>${lineItem.product_name}</td>
					<td>${lineItem.frozen_price}</td>
					<td>${lineItem.quantity}</td>
				</tr>
			`,
		);
	}
	document
		.getElementById('order-items-placeholder')
		.classList
		.add('done-loading');
})();
