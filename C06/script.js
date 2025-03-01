

let currentImageIndex = 0;
const images = [
    "img/banner-index2.jpg",
    "img/banner-index1.jpg", // Thêm link các banner khác
    "img/banner-index3.jpg" // Ví dụ thêm một banner nữa
];

// Hiển thị ảnh theo chỉ số
function showImage(index) {
    const bannerImage = document.querySelector(".banner-image");
    bannerImage.style.opacity = 0; // Hiệu ứng mờ dần trước khi đổi ảnh

    setTimeout(() => {
        bannerImage.src = images[index]; // Đổi ảnh sau khi mờ
        bannerImage.style.opacity = 1; // Hiệu ứng hiện lại
    }, 300); // Thời gian khớp với CSS transition
}

// Chuyển ảnh trước
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

// Chuyển ảnh kế tiếp
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

// Tự động chuyển ảnh
function autoSlide() {
    setInterval(() => {
        nextImage();
    }, 6000); // Tự động chuyển mỗi 6 giây
}

// Khởi tạo ảnh đầu tiên và hiệu ứng tự động
document.addEventListener("DOMContentLoaded", () => {
    showImage(currentImageIndex);
    autoSlide();
});

document.addEventListener("DOMContentLoaded", () => {
    const loginSection = document.getElementById("login-signin");
    const loggedInUser = JSON.parse(localStorage.getItem("currentUser")); // Lấy thông tin người dùng đăng nhập
  
    if (loggedInUser) {
      // Nếu đã đăng nhập
      loginSection.innerHTML = `
        <a href="accountuser.html">Xin chào,${loggedInUser.username}</a> /
        <a href="#" id="logout">Đăng xuất</a>
      `;
  
      // Thêm sự kiện Đăng xuất
      document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser"); // Xóa thông tin đăng nhập
        location.reload(); // Tải lại trang
      });
    } else {
      // Nếu chưa đăng nhập
      loginSection.innerHTML = `
        <a href="login.html">Đăng nhập</a> /
        <a href="signup.html">Đăng ký</a>
      `;
    }
  });

// Cài đặt phân trang
const productsPerPage = 6;
const products = document.querySelectorAll(".product-card");
const totalPages = Math.ceil(products.length / productsPerPage);

const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageElement = document.getElementById("currentPage");
const totalPagesElement = document.getElementById("totalPages");

let currentPage = 1;

// Cập nhật tổng số trang
totalPagesElement.textContent = totalPages;

// Hàm hiển thị sản phẩm theo trang
function displayProducts(page) {
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;

  products.forEach((product, index) => {
    if (index >= start && index < end) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  // Cập nhật trạng thái nút
  prevPageButton.disabled = page === 1;
  nextPageButton.disabled = page === totalPages;

  // Cập nhật số trang hiện tại
  currentPageElement.textContent = page;
}

// Xử lý sự kiện nút "Trước" và "Tiếp"
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(currentPage);
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts(currentPage);
  }
});

// Hiển thị sản phẩm trang đầu tiên
displayProducts(currentPage);

// Hàm bỏ chọn tất cả và làm mới kết quả
function untickAll() {
    // Bỏ chọn tất cả các radio button
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => (radio.checked = false));

    // Xóa từ khóa tìm kiếm
    searchInput.value = "";

    // Gọi lại hàm lọc sản phẩm để hiển thị tất cả sản phẩm và làm mới phân trang
    displayProducts(currentPage);noProductMessage.style.display = "none";
}


// Hiển thị tất cả sản phẩm khi tải trang
displayProducts(currentPage);

// Hàm lấy giỏ hàng hiện tại của người dùng
function getCartForUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return []; // Nếu chưa đăng nhập, trả về giỏ hàng rỗng
  
    const allCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
    return allCarts[currentUser.username] || []; // Trả về giỏ hàng của user hoặc mảng rỗng
  }
  
  // Hàm lưu giỏ hàng cho người dùng
  function saveCartForUser(cart) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return; // Nếu chưa đăng nhập, không lưu
  
    const allCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
    allCarts[currentUser.username] = cart; // Lưu giỏ hàng theo tài khoản
    localStorage.setItem("userCarts", JSON.stringify(allCarts));
  }
  
  // Hàm thêm sản phẩm vào giỏ hàng
  function addToCart(name, price) {
    const cart = getCartForUser();
  
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => item.name === name);
  
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      cart[existingProductIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
      cart.push({ name, price, quantity: 1 });
    }
  
    saveCartForUser(cart);
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
  }
  
  // Gắn sự kiện cho tất cả các nút "Thêm vào giỏ hàng" nếu muốn tự động (nếu không muốn dùng inline onclick)
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const name = productCard.dataset.name; // Lấy tên sản phẩm
      const price = parseFloat(productCard.dataset.price); // Lấy giá sản phẩm
  
      addToCart(name, price); // Gọi hàm thêm vào giỏ hàng
    });
  });
  
  
function saveData() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (username && email && phone && address) {
      // Lưu dữ liệu vào localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("phone", phone);
      localStorage.setItem("address", address);

      // Hiển thị thông tin đã lưu
      document.getElementById("displayUsername").innerText = username;
      document.getElementById("emailPlaceholder").innerText = email;
      document.getElementById("message").innerText = "Thông tin đã được lưu thành công!";
  } else {
      // Hiển thị thông báo lỗi
      document.getElementById("message").innerText = "Vui lòng nhập đầy đủ thông tin!";
  }
}
window.onload = function () {
  const savedUsername = localStorage.getItem("username");
  const savedEmail = localStorage.getItem("email");
  const savedPhone = localStorage.getItem("phone");
  const savedAddress = localStorage.getItem("address");

  // Hiển thị avatar (nếu có)
  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) {
      document.getElementById("avatar").src = savedAvatar;
  }

  // Hiển thị các thông tin người dùng từ localStorage
  if (savedUsername) {
      document.getElementById("username").value = savedUsername;
      document.getElementById("displayUsername").innerText = savedUsername;
  }

  if (savedEmail) {
      document.getElementById("email").value = savedEmail;
      document.getElementById("emailPlaceholder").innerText = savedEmail;
  }

  if (savedPhone) {
      document.getElementById("phone").value = savedPhone;
  }

  if (savedAddress) {
      document.getElementById("address").value = savedAddress;
  }
};
function getProducts() {
  return JSON.parse(localStorage.getItem("productList")) || [];
}

function renderProducts() {
  const products = getProducts();


    products.forEach((product, index) => {
      const productCard = document.querySelector("#add-product");
      productCard.classList.add("product-card");
      productCard.dataset.brand = product.category;
      productCard.dataset.name = product.name;
      productCard.dataset.price = product.price;

      productCard.innerHTML = `
        <a href="#">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h3>${product.name}</h3>
          <p>Giá từ: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
        </a>
        <button class="add-to-cart-btn" onclick="removeProduct(${index})">
          <img src="img/cart.png" alt="Add to Cart">
        </button>
      `;
    });
  }


document.addEventListener("DOMContentLoaded", renderProducts);
function filterProductsBySearch() {
  const searchInput = document.getElementById("searchInput"); // Lấy phần tử ô tìm kiếm
  const searchKeyword = searchInput.value.trim().toLowerCase();

  const products = document.querySelectorAll(".product-card");
  let hasVisibleProduct = false;

  products.forEach((product) => {
      const productName = product.querySelector('h3').textContent.toLowerCase();

      // Kiểm tra từ khóa tìm kiếm
      const isSearchMatch = productName.includes(searchKeyword);

      // Hiển thị hoặc ẩn sản phẩm dựa trên từ khóa
      if (isSearchMatch) {
          product.style.display = "block";
          hasVisibleProduct = true; // Đánh dấu có sản phẩm phù hợp
      } else {
          product.style.display = "none";
      }
  });

  // Hiển thị thông báo nếu không tìm thấy sản phẩm
  const noProductMessage = document.getElementById("noProductMessage");
  if (hasVisibleProduct) {
      noProductMessage.style.display = "none";
  } else {
      noProductMessage.style.display = "block";
  }
}

// Gắn sự kiện vào nút "Tìm kiếm"
document.getElementById('searchButton').addEventListener('click', filterProductsBySearch);
document.getElementById('searchInput').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      filterProductsBySearch(); // Kích hoạt tìm kiếm khi nhấn Enter
  }
});document.getElementById("filterPriceButton").addEventListener("click", function () {
  const priceFrom = parseInt(document.getElementById("priceFrom").value) || 0;
  const priceTo = parseInt(document.getElementById("priceTo").value) || Infinity;

  const productCards = document.querySelectorAll(".product-card");
  let hasMatch = false;

  productCards.forEach(card => {
      const productPrice = parseInt(card.getAttribute("data-price"));
      if (productPrice >= priceFrom && productPrice <= priceTo) {
          card.style.display = "block"; // Hiển thị sản phẩm phù hợp
          hasMatch = true;
      } else {
          card.style.display = "none"; // Ẩn sản phẩm không phù hợp
      }
  });

  const noProductMessage = document.getElementById("noProductMessage");
  noProductMessage.style.display = hasMatch ? "none" : "block";
});
document.addEventListener("DOMContentLoaded", () => {
  const brandRadios = document.querySelectorAll('input[name="brand"]');
  const priceFromInput = document.getElementById("priceFrom");
  const priceToInput = document.getElementById("priceTo");
  const filterPriceButton = document.getElementById("filterPriceButton");
  const noProductMessage = document.getElementById("noProductMessage");
  const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
  const selectedBrand = document.querySelector('input[name="brand"]:checked')?.id || null;
  const priceFrom = parseFloat(priceFromInput.value) || 0;
  const priceTo = parseFloat(priceToInput.value) || Infinity;

  let visibleCount = 0;

  productCards.forEach((card) => {
      const brand = card.dataset.brand;
      const price = parseFloat(card.dataset.price);

      const matchesBrand = !selectedBrand || brand === selectedBrand;
      const matchesPrice = price >= priceFrom && price <= priceTo;

      if (matchesBrand && matchesPrice) {
          card.style.display = "block";
          visibleCount++;
      } else {
          card.style.display = "none";
      }
  });

  // Hiển thị thông báo nếu không có sản phẩm phù hợp
  noProductMessage.style.display = visibleCount === 0 ? "block" : "none";
}

// Lắng nghe sự kiện thay đổi của radio buttons
brandRadios.forEach((radio) => {
  radio.addEventListener("change", filterProducts);
});


// Nút bỏ chọn tất cả
window.untickAll = () => {
  brandRadios.forEach((radio) => {
      radio.checked = false;
  });
  priceFromInput.value = "";
  priceToInput.value = "";
  filterProducts();
};
});