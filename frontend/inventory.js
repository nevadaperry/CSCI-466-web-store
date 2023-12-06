let products;
(async () => {
	products = await api.getProducts();
	for (const product of products) {
		document.getElementById('products').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="openModal(${product.id})" class="clicky">
					<td>${product.name}</td>
					<td>${product.price}</td>
					<td>${product.stock}</td>
				</tr>
			`,
		);
	}
	document
		.getElementById('products-placeholder')
		.classList
		.add('done-loading');
})();

async function openModal(productId) {
	detailsModal.style.display = 'block';
	const productDetails = products.find(product => product.id === productId);
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div>${productDetails.name}</div>
		<div>
			<a href="details.html?productId=${productId}">
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
			<input type="submit" value="Update">
		</form>
		<div>${productDetails.description}</div>
	`;
	document
		.getElementById('modal-content-placeholder')
		.classList
		.add('done-loading');
}

async function updateStock(productId) {
	const newStock = document.getElementById('new-stock').value;
	await api.setProductStock(productId, newStock);
	window.location.reload();
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
