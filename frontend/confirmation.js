(async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const orderId = +urlParams.get('orderId');
	const order = await api.getOrderDetails(orderId);
	const lineItems = JSON.parse(order.line_items).map(lineItem => {
		// Unknown why MariaDB returns line_items as a string rather than
		// an associative array using PDO. In contrast, MySQL returns correctly.
		if (typeof lineItem === 'string') {
			return JSON.parse(lineItem);
		} else {
			return lineItem;
		}
	});
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
