const email = localStorage.getItem('email');
const loginStatus = document.getElementById('login-status');
if (email === null) {
	loginStatus.innerHTML = `
		<span class="unbreak">
			Not logged in.
		</span>
		<span><a href="login.html">Log in</a></span>
	`;
} else {
	loginStatus.innerHTML = `
		<span class="unbreak">
			Logged in as <span class="white-gold">${email}</span>
		</span>
		<span><a href="#" onclick="logOut()">Log out</a></span>
	`;
}

function logOut() {
	localStorage.removeItem('email');
	window.location.reload();
}
