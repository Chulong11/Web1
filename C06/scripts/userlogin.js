document.getElementById("login-form").addEventListener("submit", function (event) {
      event.preventDefault();
    
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value.trim();
    
      const users = JSON.parse(localStorage.getItem("users")) || [];
    
      const user = users.find((user) => user.phone === phone && user.password === password);
    
      if (user) {
        // Lưu người dùng đã đăng nhập vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html"; // Chuyển hướng về trang chủ
      } else {
        alert("Số điện thoại hoặc mật khẩu không đúng!");
      }
    });
    