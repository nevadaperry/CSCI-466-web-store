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

const email = localStorage.getItem('email');
const loginStatus = document.getElementById('login-status');
if (email === null) {
	loginStatus.innerHTML = `
		<a href="login.html">Log in</a>
	`;
} else {
	loginStatus.innerHTML = `
		Logged in as <span class="white-gold">${email}</span>
		<a href="#" onclick="logOut()">Log out</a>
	`;
}

function logOut() {
	localStorage.removeItem('email');
	window.location.reload();
}
