
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
        <a href="../login.html">Đăng nhập</a> /
        <a href="../signup.html">Đăng ký</a>
      `;
    }
  });