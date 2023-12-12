let customersOrders;
(async () => {
	const email = localStorage.getItem('email');
	if (!email) {
		window.location = 'login.html?returnTo=customer-orders.html'
		throw new Error('Not logged in! Please go back and log in first.');
	}
	customersOrders = await api.getOrdersForCustomer(email);
	for (const order of customersOrders) {
		order.status = (order.shipped_at) ? 'Shipped' : 'Processing';
		order.padded_id = String(order.id).padStart(7, '0');
		document.getElementById('orders').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="openModal(${order.id})" class="clicky">
					<td>${order.padded_id}</td>
					<td>${order.total_price}</td>
					<td>${order.status}</td>
				</tr>
			`,
		);
	}
	document
		.getElementById('orders-placeholder')
		.classList
		.add('done-loading');
})();

async function openModal(orderId) {
	detailsModal.style.display = 'block';
	const order = customersOrders.find(order => order.id === orderId);
	const lineItems = JSON.parse(order.line_items).map(lineItem => {
		// Unknown why MariaDB returns line_items as a string rather than
		// an associative array using PDO. In contrast, MySQL returns correctly.
		if (typeof lineItem === 'string') {
			return JSON.parse(lineItem);
		} else {
			return lineItem;
		}
	});
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div><h2>
			Order #${order.padded_id}, placed at
			${pdoTimestampToDate(order.placed_at)}
		</h2></div>
		<div>
			Order total: $${order.total_price}
		</div>
		<br>
		<div>
			Tracking number: ${order.tracking_number ?? 'Not yet shipped.'}
		</div>
		<br>
		<h2>Line items</h2>
		<table>
			<tr>
				<th>Name</th>
				<th>Price</th>
				<th>Quantity</th>
			</tr>
			${lineItems.map(lineItem => `
				<tr>
					<td>${lineItem.product_name}</td>
					<td>${lineItem.frozen_price}</td>
					<td>${lineItem.quantity}</td>
				</tr>
			`).join('')}
		</table>
		<h2>More details</h2>
		<pre>${(() => {
			const { id, line_items, notes, ...rest } = order;
			return JSON.stringify(rest, null, 2);
		})()}</pre>
	`;
	document
		.getElementById('modal-content-placeholder')
		.classList
		.add('done-loading');
}

// Courtesy of https://www.w3schools.com/howto/howto_css_modals.asp
const detailsModal = document.getElementById('details-modal');
window.onclick = event => {
	if (event.target === detailsModal) {
		detailsModal.style.display = 'none';
	}
}
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		detailsModal.style.display = 'none';
	}
})
