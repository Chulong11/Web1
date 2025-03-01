// Lấy giỏ hàng của người dùng
function getCartForUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return []; // Nếu chưa đăng nhập, trả về giỏ hàng rỗng

  const allCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
  return allCarts[currentUser.username] || []; // Trả về giỏ hàng của user hoặc mảng rỗng
}

// Lưu giỏ hàng cho tài khoản đăng nhập
function saveCartForUser(cart) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return; // Nếu chưa đăng nhập, không lưu

  const allCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
  allCarts[currentUser.username] = cart; // Lưu giỏ hàng theo tài khoản
  localStorage.setItem("userCarts", JSON.stringify(allCarts));
}

// Hàm hiển thị giỏ hàng
function renderCart() {
  const cart = getCartForUser(); // Lấy giỏ hàng của người dùng hiện tại
  const cartItems = document.getElementById("cartItems");
  const totalAmountEl = document.getElementById("totalAmount");

  cartItems.innerHTML = ""; // Xóa giỏ hàng hiện tại
  let totalAmount = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()}₫</td>
      <td>
        <button onclick="updateQuantity(${index}, -1)">-</button>
        ${item.quantity}
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </td>
      <td>${itemTotal.toLocaleString()}₫</td>
      <td><button onclick="removeItem(${index})" style="color: red;">Xóa</button></td>
    `;
    cartItems.appendChild(row);
  });

  totalAmountEl.textContent = `Tổng cộng: ${totalAmount.toLocaleString()}₫`;

  document.getElementById("checkoutButton").disabled = cart.length === 0;
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
  const cart = getCartForUser();
  if (cart[index].quantity + change <= 0) return; // Không cho giảm số lượng xuống 0
  cart[index].quantity += change;

  saveCartForUser(cart);
  renderCart();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
  const cart = getCartForUser();
  cart.splice(index, 1); // Xóa sản phẩm tại vị trí index
  saveCartForUser(cart);
  renderCart();
}



window.onload = function () {
  renderCart(); // Hiển thị giỏ hàng
};

document.getElementById("checkoutButton").addEventListener("click", function () {
  const cart = getCartForUser(); // Lấy giỏ hàng của người dùng hiện tại

  if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
  }

  // Chuyển hướng sang trang thanh toán
  window.location.href = "checkout.html";
});
