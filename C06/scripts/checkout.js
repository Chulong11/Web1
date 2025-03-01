document.addEventListener("DOMContentLoaded", function () {
    loadUserInfo();
    renderCart();
    setupPaymentMethods();
});

function loadUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    document.getElementById("user-name").innerHTML = `<strong>Tên người nhận:</strong> ${currentUser.fullname || "Chưa cung cấp"}`;
    document.getElementById("user-phone").innerHTML = `<strong>Số điện thoại:</strong> ${currentUser.phone || "Chưa cung cấp"}`;
    document.getElementById("user-address").innerHTML = `<strong>Địa chỉ:</strong> ${currentUser.address || "Chưa cung cấp"}`;
}
function getCartForUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return [];
    
    const allCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
    return allCarts[currentUser.username] || [];
}

function renderCart() {
    const cart = getCartForUser();
    const cartContainer = document.querySelector(".cart");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        document.getElementById("confirm-order-button").disabled = true;
        return;
    }

    const itemsHTML = cart.map(item => `
        <div class="cart-item">
            <p><strong>${item.name}</strong></p>
            <p>Số lượng: ${item.quantity}</p>
            <p>Giá: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
            <p>Thành tiền: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</p>
        </div>
    `).join("");

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartContainer.innerHTML = `
        ${itemsHTML}
        <div class="cart-total">
            <h3>Tổng cộng: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</h3>
        </div>
    `;
}
function setupPaymentMethods() {
    const vnpayOption = document.getElementById("vnpay-option");
    const qrCode = document.getElementById("qr-code");

    vnpayOption.addEventListener("change", function () {
        if (vnpayOption.checked) {
            qrCode.style.display = "block";
        }
    });

    document.querySelectorAll("input[name='payment']").forEach(radio => {
        radio.addEventListener("change", function () {
            if (!vnpayOption.checked) {
                qrCode.style.display = "none";
            }
        });
    });
}
function openModal() {
    document.getElementById("address-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("address-modal").style.display = "none";
}

function saveAddress() {
    const newName = document.getElementById("new-name").value;
    const newPhone = document.getElementById("new-phone").value;
    const newAddress = document.getElementById("new-address").value;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        currentUser.name = newName || currentUser.name;
        currentUser.phone = newPhone || currentUser.phone;
        currentUser.address = newAddress || currentUser.address;

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadUserInfo(); // Cập nhật giao diện
        closeModal();
    } else {
        alert("Lỗi: Không tìm thấy người dùng.");
    }
}
document.getElementById("confirm-order-button").addEventListener("click", function () {
    const cart = getCartForUser();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Vui lòng đăng nhập để xác nhận đơn hàng.");
        return;
    }

    const orderHistoryKey = `${currentUser.username}_orderHistory`;
    const orderHistory = JSON.parse(localStorage.getItem(orderHistoryKey)) || [];

    const newOrder = {
        date: new Date().toLocaleString(),
        items: cart,
        totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    orderHistory.push(newOrder);
    localStorage.setItem(orderHistoryKey, JSON.stringify(orderHistory));

    // Xóa giỏ hàng
    const allCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
    allCarts[currentUser.username] = [];
    localStorage.setItem("userCarts", JSON.stringify(allCarts));

    alert("Đơn hàng của bạn đã được xác nhận!");
    window.location.href = "accountuser.html";
});
