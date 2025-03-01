const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (
      body.classList.contains(collapsedClass) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem("dark-mode") === "false") {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = "Sáng";
}

switchInput.addEventListener("input", function () {
  html.classList.toggle(lightModeClass);
  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = "Sáng";
    localStorage.setItem("dark-mode", "false");
  } else {
    switchLabelText.textContent = "Tối";
    localStorage.setItem("dark-mode", "true");
  }
});

// dashboard.js

// Kiểm tra xem người dùng có đang đăng nhập không
function checkLogin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const username = sessionStorage.getItem("adminUsername");

  if (!isLoggedIn) {
    // Nếu không có, chuyển hướng đến trang đăng nhập
    window.location.href = "admin_login.html";
  } else {
    // Hiển thị tên tài khoản quản trị từ sessionStorage
    document.getElementById("admin-username").innerText = username;

    // Kiểm tra xem người dùng có phải là admin gốc hay không
    if (username === "admin") {
      // Hiển thị phần quản lý admin cho admin gốc
      document.getElementById("admin-management").style.display = "block";
    } else {
      // Ẩn phần quản lý admin cho các admin con
      document.getElementById("admin-management").style.display = "none";
    }
  }
}

// Kiểm tra đăng nhập khi trang được tải
window.onload = checkLogin;
