let orders;
(async () => {
	const email = localStorage.getItem('email');
	if (!email) {
		window.location = 'login.html?returnTo=outstanding-orders.html'
		throw new Error('Not logged in! Please go back and log in first.');
	}
	orders = (await api.getOrders()).filter(
		order => !order.shipped_at
	);
	for (const order of orders) {
		order.status = (order.shipped_at) ? 'Shipped' : 'Processing';
		order.padded_id = String(order.id).padStart(7, '0');
		document.getElementById('orders').insertAdjacentHTML(
			'beforeend',
			`
				<tr onclick="openModal(${order.id})" class="clicky">
					<td>${order.padded_id}</td>
					<td>${order.customer_email}</td>
					<td>${order.total_price}</td>
					<td>${order.status}</td>
				</tr>
			`,
		);
	}
	document
		.getElementById('orders-placeholder')
		.classList
		.add('done-loading');
})();

async function openModal(orderId) {
	detailsModal.style.display = 'block';
	const order = orders.find(order => order.id === orderId);
	const lineItems = JSON.parse(order.line_items).map(lineItem => {
		// Unknown why MariaDB returns line_items as a string rather than
		// an associative array using PDO. In contrast, MySQL returns correctly.
		if (typeof lineItem === 'string') {
			return JSON.parse(lineItem);
		} else {
			return lineItem;
		}
	});
	const notes = JSON.parse(order.notes).map(note => {
		if (typeof note === 'string') {
			return JSON.parse(note);
		} else {
			return note;
		}
	});
	const modalLoadedContent = document.getElementById('modal-loaded-content');
	modalLoadedContent.innerHTML = `
		<div><h2>
			Order #${order.padded_id}, placed at
			${pdoTimestampToDate(order.placed_at)}
		</h2></div>
		<div>
			Order total: $${order.total_price}
		</div>
		<br>
		<div>
			Tracking number: ${order.tracking_number ?? 'Not yet shipped.'}
		</div>
		<br>
		<form onsubmit="updateTracking(${orderId}); return false">
			<input type="text" id="track" placeholder="New tracking number">
			<label for="track"></label>
			<input type="submit" value="Update">
		</form>
		<br>
		<h2>Order notes</h2>
		${notes.length === 0 ? `
			<div id="order-notes" class="low-importance">(None)</div>
		` : `
			<table id="order-notes">
				<tr>
					<td>Content</td>
					<td>Added at</td>
				</tr>
				${notes.map(note => `
					<tr>
						<td>${note.content}</td>
						<td>${pdoTimestampToDate(note.added_at)}</td>
					</tr>
				`).join('')}
			</table>
		`}
		<br>
		<form onsubmit="addNote(${orderId}); return false">
			<input type="text" id="new-note" placeholder="New note">
			<label for="new-note"></label>
			<input type="submit" value="Add">
		</form>
		<br>
		<h2>Line items</h2>
		<table id="order-line-items">
			<tr>
				<th>Name</th>
				<th>Price</th>
				<th>Quantity</th>
			</tr>
			${lineItems.map(lineItem => `
				<tr>
					<td>${lineItem.product_name}</td>
					<td>${lineItem.frozen_price}</td>
					<td>${lineItem.quantity}</td>
				</tr>
			`).join('')}
		</table>
	`;
	document
		.getElementById('modal-content-placeholder')
		.classList
		.add('done-loading');
}

async function updateTracking(orderId) {
	const inputNumber = document.getElementById('track').value;
	await api.updateTrackingNumber(orderId, inputNumber);
	//window.location.reload();
}

async function addNote(orderId) {
	const newNote = document.getElementById('new-note').value;
	await api.addOrderNote(orderId, newNote);
	//window.location.reload();
}

// Courtesy of https://www.w3schools.com/howto/howto_css_modals.asp
const detailsModal = document.getElementById('details-modal');
window.onclick = event => {
	if (event.target === detailsModal) {
		detailsModal.style.display = 'none';
	}
}
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		detailsModal.style.display = 'none';
	}
})

