const apiUrl = (window.location.host === 'students.cs.niu.edu')
	? 'https://students.cs.niu.edu/~z1976298/router.php'
	: 'https://web-store-backend-hzjh.onrender.com';

const api = {
	getRoot: async () => (await axios({
		method: 'GET',
		url: `${apiUrl}/`,
	})).data,
	getProducts: async () => (await axios({
		method: 'GET',
		url: `${apiUrl}/products`,
	})).data,
	getOrders: async () => (await axios({
		method: 'GET',
		url: `${apiUrl}/orders`,
	})).data,
};

// https://stackoverflow.com/a/62475924/15295209
window.onunhandledrejection = event => {
	document.insertAdjacentHTML(
		'afterbegin',
		`Unhandled Promise rejection: ${event.reason}`,
	);
};
window.onerror = (message, source, lineNumber, colno, error) => {
	document.insertAdjacentHTML(
		'afterbegin',
		`Unhandled error: ${error.stack}`,
	);
};

function removePlaceholders() {
	const placeholders = document.getElementsByClassName(
		'loading-placeholder',
	);
	for (const placeholder of placeholders) {
		placeholder.classList.add('done-loading');
	}
}
