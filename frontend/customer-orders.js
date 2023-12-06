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

async function openModal(productId) {
	detailsModal.style.display = 'block';
	const productDetails = products.find(product => product.id === productId);
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div><h2>${productDetails.name}</h2></div>
		<div>
			<a href="index.html?productId=${productId}" class="sub-header">
				View customer-facing page for this product
			</a>
		</div>
		<br>
		<div>$${productDetails.price}</div>
		<br>
		<div>${productDetails.stock} in stock</div>
		<form onsubmit="updateStock(${productId}); return false">
			<input type="text" id="new-stock" placeholder="Change qty...">
			<label for="new-stock"></label>
			<input type="submit" value="Update stock">
		</form>
		<br>
		<div>${productDetails.description}</div>
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
