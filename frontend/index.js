let products;
(async () => {
	products = await api.getProducts();
	for (const product of products) {
		document.getElementById('products').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="details(${product.id})" class="clicky">
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
})();

async function details(productId) {
	const productDetails = products.find(product => product.id === productId);
	var open = window.open("", "_self");
	open.document.write(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Product Details</title>
				<link rel="stylesheet" href="styles.css" />

			</head>
			<body>
			<!-- Top of page header-->
				<div class="navbar">
					<a href="index.html">Storefront</a>
					<a href="inventory.html">Inventory</a>

					<div class="navbar-right">
						<a href="login.html">Log In</a>
						<a href="checkout.html"><img src="img/shopping-cart-light.png"></a>
					</div>
				</div>

				<div class="content">
					<h1>Product Information</h1>
					<h2>${productDetails.name}</h2>
					<h2>Description</h2>
					<p>${productDetails.description}</p>
					<h2>Price</h2>
					<p>$${productDetails.price}</p>
					<form onsubmit="handleCartAdd(${productId}); return false">
						<input type="submit" value="Add to Cart">
					</form>
				</div>
			</body>
		</html>
	`);
}

async function handleCartAdd(productId) {
// wip
// add item to users cart
// if they're not logged in direct user to login page instead? if thats possible?

// notify user item was submitted
// go back to storefront page
}

const email = localStorage.getItem('email');
const loginStatus = document.getElementById('login-status');
if (email === null) {
	loginStatus.innerHTML = `
		Not logged in. <a href="login.html">Log in</a>
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
