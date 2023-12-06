let customersOrders;
(async () => {
	const email = localStorage.getItem('email');
	if (!email) {
		throw new Error('Not logged in! Please go back and log in first.');
	}
	customersOrders = await api.getOrdersForCustomer(email);
	for (const order of customersOrders) {
		document.getElementById('orders').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="openModal(${order.id})" class="clicky">
					<td>${order.shipping_address}</td>
					<td>${order.name_on_card}</td>
					<td>${order.phone_number}</td>
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
	const orderDetails = orders.find(order => order.id === orderId);
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div><h2>${orderDetails.name}</h2></div>
		<br>
		<div>$${orderDetails.price}</div>
		<br>
		<div>${orderDetails.stock} in stock</div>
		<br>
		<div>${orderDetails.description}</div>
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
