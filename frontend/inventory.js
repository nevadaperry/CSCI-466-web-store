function selectRadio(productId) {
	document.getElementById(`radio-${productId}`).checked = true;
}

let products;
(async () => {
	products = await api.getProducts();
	for (const product of products) {
		document.getElementById('products').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="openModal(${product.id})">
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

// Courtesy of https://www.w3schools.com/howto/howto_css_modals.asp
const detailsModal = document.getElementById('details-modal');
const closeButton = document.getElementById('modal-close-button');
closeButton.onclick = () => detailsModal.style.display = 'none';
window.onclick = event => {
	if (event.target === detailsModal) {
		detailsModal.style.display = 'none';
	}
}

async function openModal(productId) {
	detailsModal.style.display = 'block';
	//const productDetails = await api.getProductDetails(productId);
	const productDetails = products.find(product => product.id === productId);
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.outerHTML = `
		<div id="modal-loaded-content">
			Hello!
		</div>
	`;
	document
		.getElementById('modal-content-placeholder')
		.classList
		.add('done-loading');
}
