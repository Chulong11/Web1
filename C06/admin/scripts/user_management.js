
let users = JSON.parse(localStorage.getItem("users")) || [];

window.addEventListener("load", function () {
  loadUsers();
  document.getElementById("saveUserBtn").addEventListener("click", addUser);
});

function loadUsers() {
  const userTable = document.getElementById("userList");
  userTable.innerHTML = ""; // Xóa dữ liệu cũ trong bảng

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <input type="text" value="${user.username}" id="username_${
      user.username
    }" disabled />
      </td>
      <td>
        <input type="tel" value="${user.phone}" id="phone_${
      user.username
    }" disabled />
      </td>
      <td>
        ${user.isLocked ? "Khóa" : "Hoạt Động"}
      </td>
      <td>
        <span>${user.password.replace(
          /./g,
          "*"
        )}</span> <!-- Hiển thị mật khẩu với dấu * -->
      </td>
      <td>
        <button class="action-buttons edit-button" onclick="editUser('${
          user.username
        }')">Sửa</button>
        <button class="action-buttons" onclick="toggleUserLock('${
          user.username
        }')">${user.isLocked ? "Mở Khóa" : "Khóa"}</button>
        <button class="update-button" onclick="updateUser('${
          user.username
        }')" style="display:none;">Cập Nhật</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

function addUser() {
  const username = document.getElementById("newUsername").value;
  const phone = document.getElementById("newPhone").value;
  const password = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (username && phone && password && confirmPassword) {
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    // Kiểm tra nếu tài khoản đã tồn tại
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      alert("Tài khoản này đã tồn tại.");
      return;
    }

    // Thêm người dùng mới
    const newUser = { username, phone, password, isLocked: false };
    users.push(newUser);

    // Lưu dữ liệu vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Tải lại danh sách người dùng
    loadUsers();

    // Reset form
    document.getElementById("newUsername").value = "";
    document.getElementById("newPhone").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  } else {
    alert("Vui lòng nhập đầy đủ thông tin.");
  }
}

function editUser(username) {
  const row = document.querySelector(
    `#userTable tr:has(input[id="username_${username}"])`
  );
  const usernameInput = row.querySelector(`#username_${username}`);
  const phoneInput = row.querySelector(`#phone_${username}`);
  const passwordSpan = row.querySelector(`#password_${username}`);
  const updateButton = row.querySelector(".update-button");

  // Chuyển ô thành có thể chỉnh sửa
  usernameInput.disabled = false;
  phoneInput.disabled = false;

  // Hiển thị ô mật khẩu mới
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = `newPassword_${username}`;
  passwordInput.placeholder = "Mật khẩu mới";

  const confirmPasswordInput = document.createElement("input");
  confirmPasswordInput.type = "password";
  confirmPasswordInput.id = `confirmPassword_${username}`;
  confirmPasswordInput.placeholder = "Nhập lại mật khẩu mới";

  // Thêm ô mật khẩu mới vào dòng tương ứng
  const passwordCell = row.cells[3];
  passwordCell.appendChild(passwordInput);
  passwordCell.appendChild(confirmPasswordInput);

  // Hiển thị nút "Cập Nhật" và ẩn nút "Sửa"
  row.querySelector(".edit-button").style.display = "none";
  updateButton.style.display = "inline-block";
}

function updateUser(username) {
  const row = document.querySelector(
    `#userTable tr:has(input[id="username_${username}"])`
  );
  const usernameInput = row.querySelector(`#username_${username}`);
  const phoneInput = row.querySelector(`#phone_${username}`);
  const passwordInput = row.querySelector(`#newPassword_${username}`);
  const confirmPasswordInput = row.querySelector(
    `#confirmPassword_${username}`
  );
  const updateButton = row.querySelector(".update-button");

  const user = users.find((u) => u.username === username);

  if (user) {
    user.username = usernameInput.value;
    user.phone = phoneInput.value;

    // Cập nhật mật khẩu nếu có thay đổi
    const newPassword = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword && newPassword !== confirmPassword) {
      alert("Mật khẩu mới không khớp.");
      return;
    }

    if (newPassword) {
      user.password = newPassword;
    }

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Cập nhật lại danh sách người dùng
    loadUsers();
    alert("Thông tin người dùng đã được cập nhật.");
  }

  // Ẩn ô mật khẩu và các ô nhập liệu
  passwordInput.remove();
  confirmPasswordInput.remove();

  // Ẩn nút "Cập Nhật", hiển thị lại nút "Sửa"
  row.querySelector(".edit-button").style.display = "inline-block";
  updateButton.style.display = "none";
}

function toggleUserLock(username) {
  const user = users.find((u) => u.username === username);

  if (user) {
    user.isLocked = !user.isLocked;

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Cập nhật lại danh sách người dùng
    loadUsers();
  }
}
