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

collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

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
function checkLogin() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const username = sessionStorage.getItem("adminUsername");

  if (!isLoggedIn) {
    window.location.href = "admin_login.html";
  } else {
    document.getElementById("admin-username").innerText = username;
    if (username === "admin") {
      document.getElementById("admin-management").style.display = "block";
    } else {
      document.getElementById("admin-management").style.display = "none";
    }
  }
}

window.onload = checkLogin;

document.addEventListener('DOMContentLoaded', function() {
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');
    const statusFilter = document.getElementById('statusFilter');
    const addressFilter = document.getElementById('addressFilter');
    const filterButton = document.getElementById('filterButton');
    const tableBody = document.querySelector('table tbody');
    fromDateInput.value = localStorage.getItem('fromDate') || '';
    toDateInput.value = localStorage.getItem('toDate') || '';

    function filterOrders() {
        const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
        const toDate = toDateInput.value ? new Date(toDateInput.value) : null;
        const status = statusFilter.value;
        const address = addressFilter.value;

        localStorage.setItem('fromDate', fromDateInput.value);
        localStorage.setItem('toDate', toDateInput.value);

        Array.from(tableBody.rows).forEach(row => {
            const orderDate = new Date(row.cells[3].textContent);
            const orderStatus = row.cells[4].textContent.trim();
            const orderAddress = row.cells[5].textContent;

            const dateMatch = (!fromDate || orderDate >= fromDate) &&
                              (!toDate || orderDate <= toDate);
            const statusMatch = (status === 'Tất cả' || orderStatus === status);
            const addressMatch = (address === 'Chọn quận' || orderAddress.includes(address));

            if (dateMatch && statusMatch && addressMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    filterButton.addEventListener('click', filterOrders);
});
