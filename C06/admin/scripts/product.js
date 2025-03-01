let products = JSON.parse(localStorage.getItem("products")) || [];
const jsonPath = 'default_products.json';
// Sau khi tải file JSON qua fetch
fetch(jsonPath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Nếu localStorage chưa có dữ liệu, gán dữ liệu từ JSON
    if (products.length === 0) {
      products = data;
      saveProductsToLocalStorage(); // Lưu vào localStorage
    }
    renderProductTable(); // Hiển thị dữ liệu
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}
console.log(localStorage.getItem("products"));

// Cấu hình phân trang
const itemsPerPage = 6; // Số sản phẩm mỗi trang
let currentPage = 1; // Trang hiện tại
let filteredProducts = getProducts(); // Biến chứa sản phẩm đã lọc

// Hàm hiển thị sản phẩm theo trang
function renderProducts() {
  const productList = document.getElementById('user-product-list');
  productList.innerHTML = ''; // Xóa danh sách cũ

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex); // Lấy sản phẩm của trang hiện tại

  productsToShow.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.images[0]}" alt="Image" style="width: 60%;"></img>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">Giá từ: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
        </a>
      <button class="add-to-cart-btn">
        <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
      </button>
    `;
    productList.appendChild(productCard);
  });

  renderPagination(); // Hiển thị nút phân trang
}

// Hàm hiển thị nút phân trang
function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Xóa nút phân trang cũ

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? 'active' : '';
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderProducts(); // Hiển thị sản phẩm của trang được chọn
    });
    pagination.appendChild(pageButton);
  }
}

// Thanh trượt giá (Slider) xử lý lọc
const sliderMin = document.getElementById("slider-min");
const sliderMax = document.getElementById("slider-max");
const minValue = document.getElementById("min-value");
const maxValue = document.getElementById("max-value");
const gap = 1; // Khoảng cách tối thiểu giữa hai thanh trượt

function updateTrack() {
  const min = parseInt(sliderMin.value);
  const max = parseInt(sliderMax.value);
  const rangeMin = parseInt(sliderMin.min);
  const rangeMax = parseInt(sliderMax.max);

  // Tính toán phần trăm vị trí của mỗi thanh trượt
  const minPercent = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
  const maxPercent = ((max - rangeMin) / (rangeMax - rangeMin)) * 100;

  // Cập nhật CSS biến động cho vùng giữa
  document.querySelector(".slider-container").style.setProperty("--left", `${minPercent}%`);
  document.querySelector(".slider-container").style.setProperty("--right", `${100 - maxPercent}%`);
}

sliderMin.addEventListener("input", () => {
  if (parseInt(sliderMin.value) >= parseInt(sliderMax.value) - gap) {
    sliderMin.value = parseInt(sliderMax.value) - gap;
  }
  minValue.textContent = `${sliderMin.value}Tr`;
  updateTrack();
  filterProducts(); // Lọc sản phẩm theo giá trị mới
});

sliderMax.addEventListener("input", () => {
  if (parseInt(sliderMax.value) <= parseInt(sliderMin.value) + gap) {
    sliderMax.value = parseInt(sliderMin.value) + gap;
  }
  maxValue.textContent = `${sliderMax.value}Tr`;
  updateTrack();
  filterProducts(); // Lọc sản phẩm theo giá trị mới
});

// Hàm lọc sản phẩm theo giá và từ khóa tìm kiếm
function filterProducts() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const minPrice = parseInt(sliderMin.value) * 1000000;
  const maxPrice = parseInt(sliderMax.value) * 1000000;

  filteredProducts = getProducts().filter(product => {
    // Lọc theo tên và giá
    return product.name.toLowerCase().includes(searchQuery) &&
           product.price >= minPrice && product.price <= maxPrice;
  });

  currentPage = 1; // Quay về trang đầu tiên sau khi lọc
  renderProducts(); // Hiển thị sản phẩm đã lọc
}

// Khởi tạo danh sách sản phẩm khi tải trang
function init() {
  renderProducts();
  updateTrack();
}

init();

// Hàm thay đổi trạng thái sắp xếp
function sortProducts() {
  const sortSelect = document.getElementById('sortPrice');
  const sortOrder = sortSelect.value; // Lấy giá trị sắp xếp từ dropdown
  currentPage = 1; // Quay về trang đầu tiên khi thay đổi sắp xếp

  // Sắp xếp theo giá
  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(); // Cập nhật danh sách sản phẩm
}
// Lọc theo hãng xe
function filterByBrand() {
  const selectedBrands = Array.from(document.querySelectorAll('.filter-section input[type="checkbox"]:checked'))
                               .map(checkbox => checkbox.value);

  filteredProducts = getProducts().filter(product => {
    return selectedBrands.length === 0 || selectedBrands.includes(product.brand);
  });

  currentPage = 1; // Quay về trang đầu tiên khi thay đổi bộ lọc
  renderProducts(); // Hiển thị sản phẩm đã lọc
}

// Gọi hàm lọc hãng khi checkbox thay đổi
document.querySelectorAll('.filter-section input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', filterByBrand);
});
