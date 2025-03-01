const loggedInUser = JSON.parse(localStorage.getItem('user')) || {}; // Hoặc sử dụng thông tin từ một hệ thống đăng nhập

function renderTable(data) {
    const tableBody = document.getElementById("orderList");
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">Không có đơn hàng nào phù hợp!</td></tr>`;
        return;
    }

    data.forEach((order, index) => {
        const productNames = order.items.map(item => 
            `${item.name} (SL: ${item.quantity})`
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
    const userOrdersKey = `${loggedInUser.username}_orderHistory`; // Khóa riêng cho mỗi người dùng
    const orderHistory = JSON.parse(localStorage.getItem(userOrdersKey)) || [];

    renderTable(orderHistory);  // Gọi hàm renderTable để hiển thị đơn hàng của người dùng
}
	function viewOrderDetails(index) {
    const userOrdersKey = `${loggedInUser.username}_orderHistory`;  // Khóa của người dùng hiện tại
    const orders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    const order = orders[index];

    let detailsMessage = `Chi tiết đơn hàng #${order.orderId}\n\n`;
    detailsMessage += `Ngày đặt: ${order.orderDate}\n`;
    detailsMessage += `Địa chỉ: ${order.address}\n`;
    detailsMessage += `Trạng thái: ${order.status}\n\n`;
    detailsMessage += "Danh sách sản phẩm:\n";

    order.items.forEach(item => {
        detailsMessage += `- ${item.name}\n`;
        detailsMessage += `  Số lượng: ${item.quantity}\n`;
        detailsMessage += `  Giá: ${item.price.toLocaleString()}đ\n`;
    });

    detailsMessage += `\nTổng tiền: ${order.totalPrice.toLocaleString()}đ`;

    alert(detailsMessage);
}

function updateStatus(orderId, newStatus) {
    const userOrdersKey = `${loggedInUser.username}_orderHistory`;  // Khóa của người dùng hiện tại
    const orders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem(userOrdersKey, JSON.stringify(orders));  // Cập nhật lại vào localStorage
        renderTable(orders);  // Hiển thị lại bảng đơn hàng
    }
}

function filterOrders() {
    const userOrdersKey = `${loggedInUser.username}_orderHistory`;  // Khóa của người dùng hiện tại
    let orders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];

    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const statusFilter = document.getElementById("statusFilter").value;
    const addressFilter = document.getElementById("addressFilter").value;

    // Áp dụng các tiêu chí lọc (theo ngày, trạng thái, địa chỉ)
    if (fromDate && toDate) {
        orders = orders.filter(order => {
            const orderDate = new Date(order.orderDate.split('/').reverse().join('-'));
            return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
        });
    }

    if (statusFilter && statusFilter !== "Tất cả") {
        orders = orders.filter(order => order.status === statusFilter);
    }

    if (addressFilter && addressFilter !== "Chọn quận") {
        orders = orders.filter(order => order.address.includes(addressFilter));
    }

    renderTable(orders);  // Hiển thị lại bảng sau khi lọc
}

window.onload = function() {
    // Tải tất cả đơn hàng khi mới vào trang
    loadOrders();  // Gọi loadOrders thay vì lấy trực tiếp từ "orders"

    // Thêm sự kiện cho các bộ lọc
    document.getElementById("fromDate").addEventListener("change", filterOrders);
    document.getElementById("toDate").addEventListener("change", filterOrders);
    document.getElementById("statusFilter").addEventListener("change", filterOrders);
    document.getElementById("addressFilter").addEventListener("change", filterOrders);
};

// Thêm hàm xử lý thanh toán
function processPayment(index) {
    const userOrdersKey = `${loggedInUser.username}_orderHistory`;  // Khóa của người dùng hiện tại
    const orders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    const order = orders[index];

    if (confirm("Xác nhận thanh toán đơn hàng này?")) {
        order.status = "Đã xác nhận";
        localStorage.setItem(userOrdersKey, JSON.stringify(orders));  // Cập nhật lại vào localStorage
        renderTable(orders);  // Hiển thị lại bảng đơn hàng
        alert("Thanh toán thành công!");
    }
}
