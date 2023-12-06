let outstandingOrders;
(async () => {
	const email = localStorage.getItem('email');
	if (!email) {
		window.location = 'login.html?returnTo=outstanding-orders.html'
		throw new Error('Not logged in! Please go back and log in first.');
	}
	allOrders = await api.getOrders();
	for (const order of allOrders) {
		order.status = (order.shipped_at) ? 'Shipped' : 'Processing';
        order.padded_id = String(order.id).padStart(7, '0');
		if (order.status == "Processing") {
            document.getElementById('orders').insertAdjacentHTML(
                'beforeend',
                `
                    <tr onclick="openModal${order.id}" class="clicky">
                        <td>${order.padded_id}</td>
                        <td>${order.total_price}</td>
                        <td>${order.status}</td>
                    </tr>
                `,
            );
        }
	}
	document
		.getElementById('orders-placeholder')
		.classList
		.add('done-loading');
})();