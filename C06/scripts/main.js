// Hàm để tải sản phẩm từ Local Storage và hiển thị lên trang index.html
function loadProductsToIndex() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productListContainer = document.querySelector(".product-list");

  productListContainer.innerHTML = ""; // Xóa danh sách sản phẩm hiện có để cập nhật mới

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Loại: ${product.category}</p>
      <p>Giá: ${product.price} VNĐ</p>
      <button onclick="addToCart('${product.name}', '${product.category}', ${product.price})">Thêm vào giỏ</button>
      <div class="rating">Đánh giá: ⭐⭐⭐⭐☆</div>
    `;

    productListContainer.appendChild(productCard);
  });
}

// Lấy giỏ hàng theo tài khoản đăng nhập
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

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productName, productCategory, productPrice) {
  let cart = getCartForUser(); // Lấy giỏ hàng của người dùng hiện tại
  const existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: productName,
      category: productCategory,
      price: productPrice, // Giá được lưu trữ tại thời điểm thêm sản phẩm
      quantity: 1,
    });
  }

  saveCartForUser(cart); // Lưu giỏ hàng cho người dùng
  updateCartCount(); // Cập nhật số lượng sản phẩm hiển thị
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  const cart = getCartForUser(); // Lấy giỏ hàng của người dùng hiện tại
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}


// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  const cart = getCartForUser();
  cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
  saveCartForUser(cart); // Cập nhật giỏ hàng
  showCart(); // Hiển thị lại giỏ hàng
  updateCartCount(); // Cập nhật số lượng sản phẩm hiển thị
}

// Tải danh sách sản phẩm khi trang index.html được tải
window.onload = function () {
  loadProductsToIndex();
  updateCartCount();
  handleUserStatus();
};
