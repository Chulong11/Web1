// login.js

// Tài khoản và mật khẩu duy nhất
const validUsername = "admin"; // Tài khoản admin duy nhất
const validPassword = "12345"; // Mật khẩu admin duy nhất

// Thêm sự kiện submit cho form đăng nhập
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn reload trang

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kiểm tra tài khoản và mật khẩu
    if (username === validUsername && password === validPassword) {
      // Lưu trạng thái đăng nhập và thông tin admin vào sessionStorage
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ username: validUsername, password: validPassword })
      ); // Lưu thông tin admin
      // Chuyển hướng đến trang bảng điều khiển
      window.location.href = "admin_dashboard.html";
    } else {
      // Hiển thị thông báo lỗi nếu thông tin không đúng
      document.getElementById("message").innerText =
        "Tài khoản hoặc mật khẩu không đúng!";
    }
  });

// Khởi tạo tài khoản admin duy nhất nếu chưa có trong Local Storage
function initializeAdmin() {
  const storedUsers = JSON.parse(localStorage.getItem("users"));
  if (!storedUsers || storedUsers.length === 0) {
    // Tạo tài khoản admin duy nhất nếu chưa có
    const admin = {
      username: validUsername,
      password: validPassword,
      isLocked: false,
      isSuperAdmin: true,
    };
    const users = [admin];
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Tải khi trang được tải
window.onload = function () {
  initializeAdmin();
};
