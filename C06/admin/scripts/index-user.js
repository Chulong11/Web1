document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-signin");
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Lấy thông tin người dùng từ localStorage
  
  if (currentUser) {
    loginSection.innerHTML = `
      <a href="account.html"><span>Xin Chào, ${currentUser.username}</span></a>  <!-- Hiển thị tên đầy đủ -->
      <li><a href="#" id="logout">Đăng xuất</a></li>
    `;
    
    // Thêm sự kiện đăng xuất
    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser"); // Xóa thông tin người dùng khỏi localStorage
      location.reload(); // Tải lại trang
    });
  } else {
    loginSection.innerHTML = `
      <a href="login.html">Đăng nhập</a> /
      <a href="signup.html">Đăng ký</a>
    `;
  }
});
