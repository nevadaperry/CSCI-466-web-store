function processLogin() {
	const email = document.getElementById('email').value;
	localStorage.setItem('email', email);
	const returnTo = 
		(new URL(window.location.href))
		.searchParams
		.get('returnTo');
	window.location = returnTo ?? 'index.html';
}
