let products;
let cart;
(async () => {
	products = Object.fromEntries(
		(await api.getProducts()).map(product => [
			product.id,
			product
		])
	);
	cart = JSON.parse(localStorage.getItem('cart') ?? '{}');
	let thereAreAnyItems = false;
	for (const [productId, quantity] of Object.entries(cart)) {
		if (+quantity === 0) {
			delete cart[productId];
			continue;
		}
		const product = products[productId];
		document.getElementById('cart-items').insertAdjacentHTML(
			'beforeend',
			`<tr>
				<td>${product.name}</td>
				<td>${product.price}</td>
				<td>
					<input
						type="number"
						value="${quantity}"
						id="qty-${productId}"
						onchange="handleQtyChange(${productId})"
					>
				</td>
				<td>
					<button onclick="deleteCartItem(${productId})">
						Delete
					</button>
				</td>
			</tr>`,
		);
		thereAreAnyItems = true;
	}
	
	const continueButton = document.getElementById('continue');
	if (localStorage.getItem('email')) {
		continueButton.onclick = () => window.location.href = 'checkout.html';
	} else {
		continueButton.onclick = () =>
			window.location.href = 'login.html?returnTo=checkout.html';
	}
	if (thereAreAnyItems) {
		continueButton.style.display = 'block';
	}
	
	document
		.getElementById('cart-items-placeholder')
		.classList
		.add('done-loading');
})();

function handleQtyChange(productId) {
	const newQuantity = document.getElementById(`qty-${productId}`).value;
	cart[productId] = newQuantity;
	localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteCartItem(productId) {
	delete cart[productId];
	localStorage.setItem('cart', JSON.stringify(cart));
	window.location.reload();
}
