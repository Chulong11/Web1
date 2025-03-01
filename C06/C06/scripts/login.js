document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra nếu đã đăng nhập trước đó
  if (sessionStorage.getItem("isLoggedIn")) {
    window.location.href = "index.html"; // Chuyển đến trang quản trị nếu đã đăng nhập
  }

  // Xử lý sự kiện submit form
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy giá trị từ form đăng nhập
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Kiểm tra thông tin đăng nhập (thay bằng API thật nếu cần)
    if (username === "admin" && password === "12345") {
      // Đăng nhập thành công
      sessionStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
      window.location.href = "index.html"; // Chuyển đến trang quản trị
    } else {
      // Thông báo lỗi
      const message = document.getElementById("message");
      message.textContent = "Tài khoản hoặc mật khẩu không đúng!";
      message.style.color = "red";
    }
  });
});
