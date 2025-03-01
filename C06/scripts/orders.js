function renderTable(data) {
	const tableBody = document.getElementById("orderList");
	tableBody.innerHTML = "";

	if (data.length === 0) {
		tableBody.innerHTML = `<tr><td colspan="6">Không có đơn hàng nào phù hợp!</td></tr>`;
		return;
	}

	data.forEach((order, index) => {
		const productNames = order.products.map(product => 
			`${product.name} (SL: ${product.quantity})`
		).join(', ');

		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${order.orderId}</td>
			<td>${productNames}</td>
			<td>${order.orderDate}</td>
			<td>${order.status}</td>
			<td>${order.address}</td>
			<td>
				<button onclick="viewOrderDetails(${index})">Chi tiết</button>
				<button onclick="processPayment(${index})">Thanh toán</button>
				<button onclick="deleteOrder(${index})">Xóa</button>
			</td>
		`;
		tableBody.appendChild(row);
	});
}

function loadOrders() {
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	renderTable(orders);
}

function viewOrderDetails(index) {
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	const order = orders[index];
	
	let detailsMessage = `Chi tiết đơn hàng #${order.orderId}\n\n`;
	detailsMessage += `Ngày đặt: ${order.orderDate}\n`;
	detailsMessage += `Địa chỉ: ${order.address}\n`;
	detailsMessage += `Trạng thái: ${order.status}\n\n`;
	detailsMessage += "Danh sách sản phẩm:\n";
	
	order.products.forEach(product => {
		detailsMessage += `- ${product.name}\n`;
		detailsMessage += `  Số lượng: ${product.quantity}\n`;
		detailsMessage += `  Giá: ${product.price.toLocaleString()}đ\n`;
	});
	
	detailsMessage += `\nTổng tiền: ${order.totalAmount.toLocaleString()}đ`;
	
	alert(detailsMessage);
}

function updateStatus(orderId, newStatus) {
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	const order = orders.find(o => o.orderId === orderId);
	if (order) {
		order.status = newStatus;
		localStorage.setItem("orders", JSON.stringify(orders));
		loadOrders();
	}
}

function deleteOrder(index) {
	if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
		const orders = JSON.parse(localStorage.getItem("orders")) || [];
		orders.splice(index, 1);
		localStorage.setItem("orders", JSON.stringify(orders));
		loadOrders();
	}
}

// Hàm lọc đơn hàng theo các tiêu chí
function filterOrders() {
	const fromDate = document.getElementById("fromDate").value;
	const toDate = document.getElementById("toDate").value;
	const statusFilter = document.getElementById("statusFilter").value;
	const addressFilter = document.getElementById("addressFilter").value;

	let orders = JSON.parse(localStorage.getItem("orders")) || [];

	// Lọc theo ngày
	if (fromDate && toDate) {
		orders = orders.filter(order => {
			const orderDate = new Date(order.orderDate.split('/').reverse().join('-'));
			return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
		});
	}

	// Lọc theo trạng thái
	if (statusFilter && statusFilter !== "Tất cả") {
		orders = orders.filter(order => order.status === statusFilter);
	}

	// Lọc theo địa chỉ
	if (addressFilter && addressFilter !== "Chọn quận") {
		orders = orders.filter(order => order.address.includes(addressFilter));
	}

	renderTable(orders);
}

// Khởi tạo khi trang load
window.onload = function() {
	// Tải tất cả đơn hàng khi mới vào trang
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	renderTable(orders);

	// Thêm sự kiện cho các bộ lọc
	document.getElementById("fromDate").addEventListener("change", filterOrders);
	document.getElementById("toDate").addEventListener("change", filterOrders);
	document.getElementById("statusFilter").addEventListener("change", filterOrders);
	document.getElementById("addressFilter").addEventListener("change", filterOrders);
};

// Thêm hàm xử lý thanh toán
function processPayment(index) {
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	const order = orders[index];
	
	if (confirm("Xác nhận thanh toán đơn hàng này?")) {
		order.status = "Đã xác nhận";
		localStorage.setItem("orders", JSON.stringify(orders));
		loadOrders();
		alert("Thanh toán thành công!");
	}
}
