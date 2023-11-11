const apiUrl = 'https://web-store-backend-hzjh.onrender.com';

const api = {
	getRoot: returnData(() => axios({
		method: 'GET',
		url: `${apiUrl}/`,
	})),
}

function returnData(axiosFunction) {
	return async (...args) => (await axiosFunction(...args)).data;
}

async function makeRequestAndLog() {
	const response = await api.getRoot();
	console.log(`response: ${response}`);
}
