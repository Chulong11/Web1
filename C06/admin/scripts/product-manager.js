
const defaultProducts=[{
  "id": 1,
  "name": "Evo200",
  "price": 22000000,
  "brand": "VinFast",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Đỏ",
      "Xanh",
      "Trắng"
  ],
  "images": [
      "image/EVO200/img-evo-red.webp",
      "image/EVO200/img-evo-blue.webp",
      "image/EVO200/img-evo-white.webp"
  ]
},
{
  "id": 2,
  "name": "YADEA OCEAN",
  "price": 29000000,
  "brand": "Yadea",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Tím",
      "Hồng",
      "Xanh lá"
  ],
  "images": [
      "image/OCEAN/ocean-purple.png",
      "image/OCEAN/ocean-pink.png",
      "image/OCEAN/ocean-grenn.png"
  ]
},
{
  "id": 3,
  "name": "YADEA ORIS",
  "price": 22900000,
  "brand": "Yadea",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Xám",
      "Đen",
      "Trắng"
  ],
  "images": [
      "image/ORIS/oris-xam.png",
      "image/ORIS/oris-den.png",
      "image/ORIS/oris-trang.png"
  ]
},
{
  "id": 4,
  "name": "YADEA ORLA 2024",
  "price": 20490000,
  "brand": "Yadea",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Nâu",
      "Hồng",
      "Xanh"
  ],
  "images": [
      "image/Orla/orla-nau.png",
      "image/Orla/orla-hong.png",
      "image/Orla/orla-xanh.png"
  ]
},
{
  "id": 5,
  "name": "CUV E",
  "price": 18000000,
  "brand": "Honda",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Đen",
      "Trắng"
  ],
  "images": [
      "image/CUV E/den.png",
      "image/CUV E/trang.png",
      "image/CUV E/trang.png"
  ]
},
{
  "id": 6,
  "name": "FELIZ S",
  "price": 27000000,
  "brand": "VinFast",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Xanh",
      "Đỏ",
      "Bạc"
  ],
  "images": [
      "image/FELIZ S/img-top-felizs-green.webp",
      "image/FELIZ S/img-top-felizs-red.webp",
      "image/FELIZ S/img-top-felizs-silver.webp"
  ]
},
{
  "id": 7,
  "name": "Icon e",
  "price": 22000000,
  "brand": "Honda",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Xanh",
      "Xám"
  ],
  "images": [
      "image/ICONE/xanh.png",
      "image/ICONE/xam.png",
      "image/ICONE/xam.png"
  ]
},
{
  "id": 8,
  "name": "KLARA S",
  "price": 22000000,
  "brand": "VinFast",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Đen",
      "Đỏ",
      "Trắng"
  ],
  "images": [
      "image/KLARAS/red-klaras.png",
      "image/KLARAS/red-klaras.png",
      "image/KLARAS/white-klaras.png"
  ]
},
{
  "id": 9,
  "name": "ESPERO E-SYNC",
  "price": 35000000,
  "brand": "Espero",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Xám",
      "Xanh",
      "Trắng"
  ],
  "images": [
      "image/ESPERO E-SYNC/Esyn-xam-mo.jpg",
      "image/ESPERO E-SYNC/Esyn-su-hao.jpg",
      "image/ESPERO E-SYNC/Esyn-trang-mo.jpg"
  ]
},
{
  "id": 10,
  "name": "ESPERO GOGO-F1 PRO",
  "price": 45000000,
  "brand": "Espero",
  "timeCharge": "4 giờ",
  "horsepower": "3 kW",
  "battery": "22 Ah",
  "speed": "60 km/h",
  "weight": "90 kg",
  "colors": [
      "Cam",
      "Đen",
      "Trắng"
  ],
  "images": [
      "image/ESPERO GOGO-F1 PRO/gogoF1-pro-cam.jpg",
      "image/ESPERO GOGO-F1 PRO/gogoF1-pro-den-mo.jpg",
      "image/ESPERO GOGO-F1 PRO/gogoF1-pro-trang.jpg"
  ]
}

]
let products = JSON.parse(localStorage.getItem("products")) ||  defaultProducts;

// Lấy các phần tử DOM cần thiết
const productForm = document.getElementById("admin-product-form");
const productTableBody = document.querySelector("#productTable tbody");
const colorList = document.getElementById("colorList");
const addColorButton = document.getElementById("addColorButton");
const productColorInput = document.getElementById("productColor");

let currentEditIndex = null;

// Xử lý sự kiện Thêm màu
addColorButton.addEventListener("click", () => {
  const colorName = productColorInput.value.trim();
  if (colorName) {
    const li = document.createElement("li");
    li.textContent = colorName;
    li.innerHTML += ` <button type="button" onclick="this.parentElement.remove()">Xóa</button>`;
    colorList.appendChild(li);
    productColorInput.value = "";
  }
});

// Hàm lấy danh sách màu hiện tại
function getColorList() {
  return Array.from(colorList.children).map((li) => li.textContent.replace(" Xóa", ""));
}

// Hàm xem trước hình ảnh
function previewImage(event, previewId) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById(previewId).innerHTML = `<img src="${reader.result}" alt="Preview" style="max-width: 100px; max-height: 100px;">`;
  };
  if (file) reader.readAsDataURL(file);
}


// Hàm hiển thị danh sách sản phẩm
function renderProductTable() {
  productTableBody.innerHTML = products
    .map(
      (product, index) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.price}</td>
        <td>
          <img src="${product.images[0]}" alt="Image" style="max-width: 50px; max-height: 50px;"></img>
        </td>
        <td>
          <button onclick="editProduct(${index})">Sửa</button>
          <button onclick="deleteProduct(${index})">Xóa</button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Hàm xóa sản phẩm
function deleteProduct(index) {
  products.splice(index, 1);
  saveProductsToLocalStorage();
  renderProductTable();
}
// Hàm sửa sản phẩm (cập nhật lại)
function editProduct(index) {
  const product = products[index];
  currentEditIndex = index;

  const productIdInput = document.getElementById("product-id");
  if (productIdInput) productIdInput.value = product.id;

  const productNameInput = document.getElementById("product-name");
  if (productNameInput) productNameInput.value = product.name;

  const productPriceInput = document.getElementById("product-price");
  if (productPriceInput) productPriceInput.value = product.price;

  const productBrandInput = document.getElementById("product-brand");
  if (productBrandInput) productBrandInput.value = product.brand;

  const productHpInput = document.getElementById("product-hp");
  if (productHpInput) productHpInput.value = product.horsepower;

  const productBatteryInput = document.getElementById("product-battery");
  if (productBatteryInput) productBatteryInput.value = product.battery;

  const productSpeedInput = document.getElementById("product-speed");
  if (productSpeedInput) productSpeedInput.value = product.speed;

  const productWeightInput = document.getElementById("product-weight");
  if (productWeightInput) productWeightInput.value = product.weight;

  // Cập nhật danh sách màu
  colorList.innerHTML = product.colors.map((color) => 
    `<li>${color} <button type="button" onclick="this.parentElement.remove()">Xóa</button></li>`
  ).join("");

  // Cập nhật hình ảnh
  ["preview1", "preview2", "preview3"].forEach((id, i) => {
    const previewElement = document.getElementById(id);
    if (previewElement) {
      previewElement.innerHTML = product.images[i]
        ? `<img src="${product.images[i]}" alt="Preview" style="max-width: 100px; max-height: 100px;">`
        : "";
    }
  });

  // Reset các trường input file
  ["product-image1", "product-image2", "product-image3"].forEach((id) => {
    const fileInput = document.getElementById(id);
    if (fileInput) fileInput.value = "";
  });
}


// Hàm thêm sản phẩm (cập nhật lại)
productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProduct = {
    id: currentEditIndex !== null ? products[currentEditIndex].id : new Date().getTime(),
    name: document.getElementById("product-name").value,
    price: parseInt(document.getElementById("product-price").value),
    brand: document.getElementById("product-brand").value,
    horsepower: document.getElementById("product-hp").value,
    battery: document.getElementById("product-battery").value,
    speed: document.getElementById("product-speed").value,
    weight: document.getElementById("product-weight").value,
    colors: getColorList(),
    images: [
      document.getElementById("product-image1").files[0]
        ? URL.createObjectURL(document.getElementById("product-image1").files[0])
        : (currentEditIndex !== null ? products[currentEditIndex].images[0] : null),
      document.getElementById("product-image2").files[0]
        ? URL.createObjectURL(document.getElementById("product-image2").files[0])
        : (currentEditIndex !== null ? products[currentEditIndex].images[1] : null),
      document.getElementById("product-image3").files[0]
        ? URL.createObjectURL(document.getElementById("product-image3").files[0])
        : (currentEditIndex !== null ? products[currentEditIndex].images[2] : null),
    ],
  };

  if (currentEditIndex !== null) {
    products[currentEditIndex] = newProduct;
    currentEditIndex = null;
  } else {
    products.push(newProduct);
  }

  saveProductsToLocalStorage();
  renderProductTable();
  resetForm();
});

// Hàm reset form sau khi thêm hoặc sửa
function resetForm() {
  productForm.reset();
  colorList.innerHTML = "";
  ["preview1", "preview2", "preview3"].forEach((id) => {
    document.getElementById(id).innerHTML = "";
  });
}
function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}
renderProductTable();