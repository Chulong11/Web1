 // Lấy danh sách sản phẩm từ LocalStorage
 function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }
  
  // Lấy ID từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  // Tìm sản phẩm theo ID
  function getProductById(id) {
    const products = getProducts();
    return products.find(product => product.id === id);
  }
  
  // Hiển thị chi tiết sản phẩm
  function renderProductDetail() {
    const productDetail = document.getElementById('product-detail');
    const product = getProductById(productId);
  
    if (product) {
    productDetail.innerHTML = `
    <div class="container">
        <div class="product">
            <div class="product-images">
                <img src="${product.images[0]}" class="main-image">
                <div class="thumbnails">
                    <img src="${product.images[0]}" alt="Thumbnail 1" class="thumbnail">
                    <img src="${product.images[1]}" alt="Thumbnail 2" class="thumbnail">
                    <img src="${product.images[2]}" alt="Thumbnail 3" class="thumbnail">
                </div>
            </div>
            <div class="product-details">
                <h1 class="product-title">${product.name}</h1>
                <p class="product-price">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                <div class="color-options">
                    <label>Chọn màu:</label>
                    <select id="color-select">
                        ${product.colors.map((color, index) => `<option value="${index}">${color}</option>`).join('')}
                    </select>
                </div>
                <div class="product-actions">
                    <input type="number" value="1" min="1" class="quantity-input">
                    <button class="add-to-cart">Thêm vào giỏ hàng</button>
                </div>
                <div class="extra-links">
                    <button class="add-to-cart">Mua ngay</button>
                </div>
            </div></div>
        </div>
        <div class="specifications">
            <h2>Thông số kỹ thuật</h2>
            <table class="spec-table">
                <thead>
                    <tr>
                        <th>Mục</th>
                        <th>Thông tin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Thời gian sạc</td>
                        <td>${product.timeCharge}</td>
                    </tr>
                    <tr>
                        <td>Công suất Động Cơ</td>
                        <td>${product.horsepower}</td>
                    </tr>
                    <tr>
                        <td>Dung lượng PIN</td>
                        <td>${product.battery}</td>
                    </tr>
                    <tr>
                        <td>Tốc độ tối đa</td>
                        <td>${product.speed}</td>
                    </tr>
                    <tr>
                        <td>Trọng lượng</td>
                        <td>${product.weight}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    
`;

    } else {
      productDetail.innerHTML = `<p>Sản phẩm không tồn tại.</p>`;
    }
  }
  
  // Hiển thị chi tiết sản phẩm khi tải trang
  renderProductDetail();

          // Script for image thumbnails
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.src;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const product = getProductById(productId); // Lấy sản phẩm theo ID từ URL

    if (!product) {
        alert('Sản phẩm không tồn tại!');
        return;
    }

    const addToCartButton = document.querySelector('.product-actions .add-to-cart');
    const colorSelect = document.getElementById('color-select');
    const quantityInput = document.querySelector('.quantity-input');

    // Hàm để lưu giỏ hàng vào localStorage
    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Hàm để lấy giỏ hàng từ localStorage
    const getCartFromLocalStorage = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };
 
  // Check if the user is logged in by checking localStorage for 'userinfo'
  const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!loggedInUser) {
    // If the user is not logged in, redirect to login page
    addToCartButton.addEventListener('click', () => {
      alert('Bạn cần đăng nhập trước khi thêm vào giỏ hàng!');
      window.location.href = 'login.html';  // Redirect to login page
    });
  } else {
    // Thêm sự kiện click vào nút "Thêm vào giỏ hàng"
    addToCartButton.addEventListener('click', () => {
        const selectedColorIndex = colorSelect.value;
        const selectedColor = product.colors[selectedColorIndex];
        const selectedImage = product.images[selectedColorIndex];
        const quantity = parseInt(quantityInput.value, 10);

        // Tạo object sản phẩm
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor,
            image: selectedImage,
            quantity: quantity,
        };

        // Lấy giỏ hàng hiện tại từ localStorage
        const cart = getCartFromLocalStorage();

        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id && item.color === cartItem.color);

        if (existingItemIndex >= 0) {
            // Nếu đã tồn tại, cập nhật số lượng
            cart[existingItemIndex].quantity += cartItem.quantity;
        } else {
            // Nếu chưa tồn tại, thêm sản phẩm vào giỏ hàng
            cart.push(cartItem);
        }

        // Lưu giỏ hàng vào localStorage
        saveCartToLocalStorage(cart);

        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        console.log('Giỏ hàng hiện tại:', cart);
    });
}

});
