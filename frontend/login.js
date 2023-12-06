function processLogin() {
	const email = document.getElementById('email').value.trim();
	if (!email) return;
	
	localStorage.setItem('email', email);
	const returnTo = 
		(new URL(window.location.href))
		.searchParams
		.get('returnTo')
		?? 'index.html';
	window.location = returnTo;
}
