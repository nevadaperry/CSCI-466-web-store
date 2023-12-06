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
		<a class="align-top pad-heavy" href="customer-orders.html">
			Logged in as <span class="white-gold">${email}</span>
		</a>
		<span><a href="#" onclick="logOut()">Log out</a></span>
	`;
}

function logOut() {
	localStorage.removeItem('email');
	window.location.reload();
}
