document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    // Hàm để lấy giỏ hàng từ localStorage
    const getCartFromLocalStorage = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    // Hàm để lưu giỏ hàng vào localStorage
    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Hàm để tính tổng tiền
    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Hàm để render giỏ hàng
    const renderCart = () => {
        const cart = getCartFromLocalStorage();

        // Xóa nội dung cũ
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Giỏ hàng của bạn trống.</p>';
            totalPriceElement.textContent = '0 VND';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Màu: ${item.color}</p>
                    <p>Giá: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                    <div class="cart-item-actions">
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                        <button class="remove-item" data-index="${index}">Xóa</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Cập nhật tổng tiền
        const totalPrice = calculateTotalPrice(cart);
        totalPriceElement.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    };

    // Sự kiện thay đổi số lượng
    cartContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value, 10);

            if (newQuantity > 0) {
                const cart = getCartFromLocalStorage();
                cart[index].quantity = newQuantity;
                saveCartToLocalStorage(cart);
                renderCart();
            }
        }
    });

    // Sự kiện xóa sản phẩm
    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            const cart = getCartFromLocalStorage();
            cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
            saveCartToLocalStorage(cart);
            renderCart();
        }
    });

    // Sự kiện click vào nút Thanh Toán
    // Sự kiện click vào nút Thanh Toán
    checkoutButton.addEventListener('click', () => {
    const cart = getCartFromLocalStorage();
        if (cart.length > 0) {
        // Chuyển đến trang thanh toán
        window.location.href = 'checkout.html';
        } else {
        alert('Giỏ hàng của bạn đang trống!');
        }
    });

    // Hiển thị giỏ hàng khi tải trang
    renderCart();
});
