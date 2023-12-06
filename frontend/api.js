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
	getProductDetails: async (productId) => (await axios({
		method: 'GET',
		url: `${apiUrl}/products/${productId}`,
	})).data,
	setProductStock: async (productId, stock) => (await axios({
		method: 'PUT',
		url: `${apiUrl}/products/${productId}`,
		data: stock,
	})).data,
	getOrders: async () => (await axios({
		method: 'GET',
		url: `${apiUrl}/orders`,
	})).data,
	postOrder: async (order) => (await axios({
		method: 'POST',
		url: `${apiUrl}/orders`,
		data: order
	})).data,
};

// https://stackoverflow.com/a/62475924/15295209
window.onunhandledrejection = event => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		`<span class="error">
			Unhandled Promise rejection: ${event.reason}
		</span>`,
	);
};
window.onerror = (message, source, lineNumber, colno, error) => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		`<span class="error">
			Unhandled error: ${error.stack}
		</span>`,
	);
};
