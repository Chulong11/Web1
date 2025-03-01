document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Lấy giá trị từ form
  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  // Kiểm tra mật khẩu nhập lại
  if (password !== confirmPassword) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }

  // Lấy danh sách người dùng từ localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra nếu tên đăng nhập đã tồn tại
  const existingUser = users.find((user) => user.username === username || user.phone === phone);
  if (existingUser) {
    alert("Tên đăng nhập hoặc số điện thoại đã tồn tại!");
    return;
  }

  // Tạo đối tượng người dùng mới
  const newUser = {
    fullname,
    phone,
    address,
    username,
    password,
  };

  // Lưu thông tin người dùng vào localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
});
