// index.js - Đăng ký người dùng

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kiểm tra xem tên tài khoản đã tồn tại hay chưa
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.some((user) => user.username === username)) {
      showMessage("Tài khoản đã tồn tại!", "red");
      return;
    }

    // Tạo người dùng mới
    const newUser = {
      username,
      password,
      isLocked: false,
      isSuperAdmin: false,
    };
    storedUsers.push(newUser);

    // Lưu vào localStorage
    localStorage.setItem("users", JSON.stringify(storedUsers));

    showMessage("Đăng ký thành công!", "green");

    // Reset form sau khi đăng ký
    this.reset();
  });

function showMessage(msg, color) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = msg;
  messageDiv.style.color = color;
  setTimeout(() => {
    messageDiv.innerText = "";
  }, 3000);
}
