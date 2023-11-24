const apiUrl = (window.location.host === 'students.cs.niu.edu')
	? 'https://students.cs.niu.edu/~z1976298/router.php'
	: 'https://web-store-backend-hzjh.onrender.com';

const api = {
	getRoot: async () => (await axios({
		method: 'GET',
		url: `${apiUrl}/`,
	})).data,
};

async function makeRequestAndLog() {
	const response = await api.getRoot();
	console.log(`response: ${response}`);
}
