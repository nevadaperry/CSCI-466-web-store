let allOrders;
(async () => {
	const email = localStorage.getItem('email');
	if (!email) {
		window.location = 'login.html?returnTo=all-orders.html'
		throw new Error('Not logged in! Please go back and log in first.');
	}
	allOrders = await api.getOrders();
	for (const order of allOrders) {
		order.status = (order.shipped_at) ? 'Shipped' : 'Processing';
		order.padded_id = String(order.id).padStart(7, '0');
		document.getElementById('orders').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="openModal${order.id}" class="clicky">
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
	const lineItems = JSON.parse(order.line_items);
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div><h2>
			Order #${order.padded_id} shipping status: ${order.shipped_at}
		</h2></div>
		<br>
		<div>
			Tracking number: ${order.tracking_number ?? 'Not yet shipped.'}
		</div>
		
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
