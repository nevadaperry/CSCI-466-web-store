// Basically a web component framework
document.getElementById('main-navbar').innerHTML = `
	<a href="index.html"><h2 class="logo">Saks 108th Avenue</h2></a>
	<a href="customer-orders.html">Orders</a>

	<div class="navbar-right">
		<a href="cart.html">
			<span class="vert-top">Cart</span>
			<img src="img/shopping-cart-light.png">
		</a>
		<span id="login-status" class="low-importance">Loading login status</span>
	</div>
`;

const email = localStorage.getItem('email');
const loginStatus = document.getElementById('login-status');
const currentPage = window.location.href.split('/').at(-1);
if (email === null) {
	loginStatus.innerHTML = `
		<span class="align-top pad-heavy">
			Not logged in.
		</span>
		<span><a href="login.html?returnTo=${currentPage}">Log in</a></span>
	`;
} else {
	loginStatus.innerHTML = `
		<span class="align-top pad-heavy">
			Logged in as <span class="white-gold">${email}</span>
		</span>
		<span><a href="#" onclick="logOut()">Log out</a></span>
	`;
}

function logOut() {
	localStorage.removeItem('email');
	window.location.reload();
}

document.getElementById('bottom-navbar').innerHTML = `
	<a href="inventory.html">Inventory</a>
	<a href="all-orders.html">All Orders</a>
	<a href="outstanding-orders.html">Outstanding Orders</a>
`;
