let products;
(async () => {
	products = await api.getProducts();
	for (const product of products) {
		document.getElementById('products').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="detail(${product.id})" class="clicky">
					<td>${product.name}</td>
					<td>${product.price}</td>
				</tr>
			`,
		);
	}
	document
		.getElementById('products-placeholder')
		.classList
		.add('done-loading');
	
	const urlParams = new URLSearchParams(window.location.search);
	const productId = +urlParams.get('productId');
	if (productId) {
		detail(productId);
		
		// Strip param from URL so the modal doesn't re-open on refresh
		(window
			.history
			.replaceState(
				{},
				document.title,
				"index.html"
			)
		);
	}
})();

async function detail(productId) {
	detailsModal.style.display = 'block';
	const productDetails = products.find(product => product.id === productId);
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div><h2>${productDetails.name}</h2></div>
		<div>$${productDetails.price}</div>
		<br>
		<div>${productDetails.stock} in stock</div>
		<form onsubmit="addQtyToCart(${productId}); return false">
			<input type="number" id="qty" value="1" min="1">
			<label for="qty">Qty.</label>
			<input type="submit" value="Add to cart">
		</form>
		<br>
		<div>${productDetails.description}</div>
	`;
	document
		.getElementById('modal-content-placeholder')
		.classList
		.add('done-loading');
}

async function addQtyToCart(productId) {
	const quantity = document.getElementById('qty').value;
	const cart = JSON.parse(localStorage.getItem('cart') ?? '{}');
	
	cart[productId] = +(cart[productId] ?? 0) + +quantity;
	
	localStorage.setItem('cart', JSON.stringify(cart));
	window.location = 'cart.html';
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
