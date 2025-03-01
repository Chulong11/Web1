document.getElementById("login-form").addEventListener("submit", function (event) {
      event.preventDefault();
    
      const username = document.getElementById("email").value.trim(); // username sẽ là email
      const password = document.getElementById("password").value.trim();
    
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
    
      // Kiểm tra thông tin đăng nhập
      const user = users.find((u) => u.username === username && u.password === password);
    
      if (user) {
        alert(`Chào mừng ${username}, bạn đã đăng nhập thành công!`);
        // Lưu trạng thái đăng nhập
        localStorage.setItem("currentUser", JSON.stringify(user));
        // Chuyển hướng đến trang mua hàng (hoặc trang chính)
        window.location.href = "index.html";
      } else {
        alert("Tên tài khoản hoặc mật khẩu không chính xác!");
      }
    });
    