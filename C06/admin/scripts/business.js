document
  .getElementById("filterForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fromDate = new Date(document.getElementById("fromDate").value);
    const toDate = new Date(document.getElementById("toDate").value);

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const filteredData = orders.filter((order) => {
      const orderDate = new Date(order.timestamp);
      return orderDate >= fromDate && orderDate <= toDate;
    });

    // Tính toán dữ liệu theo ngày cho biểu đồ tăng trưởng
    const dailyRevenue = {};
    filteredData.forEach((order) => {
      const date = new Date(order.timestamp).toLocaleDateString();
      if (!dailyRevenue[date]) {
        dailyRevenue[date] = 0;
      }
      dailyRevenue[date] += order.totalAmount;
    });

    // Chuyển đổi dữ liệu thành mảng và sắp xếp theo ngày
    const revenueData = Object.entries(dailyRevenue)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Gọi tất cả các hàm thống kê
    calculateSummaryStats(filteredData);
    calculateStatusStats(filteredData);
    renderRevenueChart(filteredData);
    renderGrowthChart(revenueData);
  });

function viewCustomerOrders(customerName) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const customerOrders = orders.filter(
    (order) => order.customerName === customerName
  );

  let orderDetails = `Hóa đơn của khách hàng: ${customerName}\n`;

  customerOrders.forEach((order, index) => {
    orderDetails += `\nĐơn hàng #${index + 1} (Ngày: ${new Date(
      order.timestamp
    ).toLocaleString()}):\n`;
    order.products.forEach((item) => {
      orderDetails += `${item.name} - ${
        item.quantity
      } x ${item.price.toLocaleString()} VNĐ\n`;
    });
    orderDetails += `Tổng tiền: ${order.totalAmount.toLocaleString()} VNĐ\n`;
  });

  alert(orderDetails);
}

window.onload = renderOrders;

function renderOrders() {
  const orderList = document.getElementById("orderList");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orderList.innerHTML = "";

  orders.forEach((order, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>#${index + 1}</td>
      <td>${new Date(order.timestamp).toLocaleString()}</td>
      <td>${order.totalAmount.toLocaleString()} VNĐ</td>
      <td>${order.status}</td>
      <td><button onclick="viewOrderDetails(${index})">Xem chi tiết</button></td>
    `;

    orderList.appendChild(row);
  });
}

function viewOrderDetails(index) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders[index];
  let orderDetails = `Chi Tiết Đơn Hàng #${index + 1}:\n`;

  order.products.forEach((item) => {
    orderDetails += `${item.name} - ${
      item.quantity
    } x ${item.price.toLocaleString()} VNĐ\n`;
  });

  orderDetails += `\nTổng Tiền: ${order.totalAmount.toLocaleString()} VNĐ`;

  alert(orderDetails);
}
function calculateSummaryStats(filteredData) {
  const totalOrders = filteredData.length;
  const totalProductsSold = filteredData.reduce(
    (sum, order) => sum + order.products.reduce((pSum, item) => pSum + item.quantity, 0),
    0
  );
  const totalRevenue = filteredData.reduce((sum, order) => sum + order.totalAmount, 0);

  const avgRevenuePerOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  document.getElementById("totalOrders").innerText = totalOrders;
  document.getElementById("totalProductsSold").innerText = totalProductsSold;
  document.getElementById("avgRevenuePerOrder").innerText = avgRevenuePerOrder.toLocaleString() + "₫";
}
function renderRevenueChart(filteredData) {
  const dates = {};
  filteredData.forEach((order) => {
    const date = new Date(order.timestamp).toLocaleDateString();
    if (!dates[date]) {
      dates[date] = 0;
    }
    dates[date] += order.totalAmount;
  });

  const labels = Object.keys(dates);
  const data = Object.values(dates);

  const ctx = document.getElementById("revenueChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Doanh thu",
          data: data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
}
function calculateStatusStats(filteredData) {
  const statusStats = {};
  
  filteredData.forEach((order) => {
    const status = order.status || "Không xác định";
    if (!statusStats[status]) {
      statusStats[status] = { count: 0, revenue: 0 };
    }
    statusStats[status].count += 1;
    statusStats[status].revenue += order.totalAmount;
  });
  
  const statusTable = document.getElementById("statusStatsTable");
  statusTable.innerHTML = "";
  
  for (const [status, stats] of Object.entries(statusStats)) {
    const row = `
      <tr>
        <td>${status}</td>
        <td>${stats.count}</td>
        <td>${stats.revenue.toLocaleString()}₫</td>
      </tr>
    `;
    statusTable.innerHTML += row;
  }
}
  
function renderGrowthChart(data) {
    const ctx = document.getElementById('growthChart').getContext('2d');
    
    if (data.length < 2) {
        ctx.font = '20px Arial';
        ctx.fillText('Cần ít nhất 2 ngày dữ liệu để tính tăng trưởng', 50, 100);
        return;
    }

    // Tính tỷ lệ tăng trưởng
    const growthRates = [];
    const labels = [];
    
    for (let i = 1; i < data.length; i++) {
        const previousRevenue = data[i-1].revenue;
        const currentRevenue = data[i].revenue;
        const growthRate = previousRevenue === 0 ? 0 : 
            ((currentRevenue - previousRevenue) / previousRevenue) * 100;
        
        growthRates.push(growthRate);
        labels.push(data[i].date);
    }
    
    // Lấy biểu đồ hiện tại
    const existingChart = Chart.getChart("growthChart");
    if (existingChart) {
        // Xóa tất cả datasets cũ
        existingChart.data.datasets = [];
        existingChart.data.labels = labels;
        // Thêm dataset mi
        existingChart.data.datasets.push({
            label: 'Tỷ lệ tăng trưởng doanh thu (%)',
            data: growthRates,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1,
            fill: true
        });
        existingChart.update();
    } else {
        // Tạo biểu đồ mới nếu chưa có
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tỷ lệ tăng trưởng doanh thu (%)',
                    data: growthRates,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(1) + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Tỷ lệ tăng trưởng (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Ngày'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Tăng trưởng: ${context.parsed.y.toFixed(2)}%`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Biểu đồ tăng trưởng doanh thu theo ngày'
                    }
                }
            }
        });
    }
}
  
function createSampleOrders() {
    const orders = [
        {
            orderId: "17330373034489",
            products: [{ name: "VINFAST FELIZ S", quantity: 1 }],
            orderDate: "1/12/2024",
            timestamp: new Date("2024-12-01").getTime(),
            totalAmount: 49000000,
            status: "Đã thanh toán",
            address: "Quận 10"
        },
        {
            orderId: "17330422142222",
            products: [{ name: "HONDA CUV E", quantity: 1 }],
            orderDate: "1/12/2024",
            timestamp: new Date("2024-12-01").getTime(),
            totalAmount: 39000000,
            status: "Đã thanh toán",
            address: "Quận 11"
        },
        {
            orderId: "17330423661988",
            products: [{ name: "ESPERO GOGO F1 PRO", quantity: 1 }],
            orderDate: "1/12/2024",
            timestamp: new Date("2024-12-01").getTime(),
            totalAmount: 99000000,
            status: "Đã thanh toán",
            address: "Thành phố Thủ Đức"
        },
        {
            orderId: "17330431160700",
            products: [{ name: "VINFAST EVO 200", quantity: 1 }],
            orderDate: "1/12/2024",
            timestamp: new Date("2024-12-01").getTime(),
            totalAmount: 19000000,
            status: "Đang chờ",
            address: "Quận Gò Vấp"
        },
        {
            orderId: "17330431160701",
            products: [{ name: "VINFAST FELIZ S", quantity: 1 }],
            orderDate: "1/11/2024",
            timestamp: new Date("2024-11-01").getTime(),
            totalAmount: 49000000,
            status: "Đã thanh toán",
            address: "Quận 1"
        },
        {
            orderId: "17330431160702",
            products: [{ name: "HONDA CUV E", quantity: 1 }],
            orderDate: "2/11/2024",
            timestamp: new Date("2024-1-02").getTime(),
            totalAmount: 89000000,
            status: "Đã giao hàng",
            address: "Quận 2"
        },
        {
            orderId: "17330431160703",
            products: [{ name: "ESPERO GOGO F1 PRO", quantity: 1 }],
            orderDate: "3/11/2024",
            timestamp: new Date("2024-11-03").getTime(),
            totalAmount: 49000000,
            status: "Đã thanh toán",
            address: "Quận 3"
        },
        {
            orderId: "17330431160704",
            products: [{ name: "VINFAST EVO 200", quantity: 1 }],
            orderDate: "4/11/2024",
            timestamp: new Date("2024-11-04").getTime(),
            totalAmount: 499000000,
            status: "Đã thanh toán",
            address: "Quận 4"
        },
        {
            orderId: "17330431160705",
            products: [{ name: "VINFAST EVO 200", quantity: 1 }],
            orderDate: "5/11/2024",
            timestamp: new Date("2024-11-05").getTime(),
            totalAmount: 4999000000,
            status: "Đang chờ",
            address: "Quận 5"
        },
        {
            orderId: "17330431160706",
            products: [{ name: "VINFAST FELIZ S", quantity: 1 }],
            orderDate: "1/11/2024",
            timestamp: new Date("2024-11-06").getTime(),
            totalAmount: 409000000,
            status: "Đã giao hàng",
            address: "Quận 6"
        },
        {
            orderId: "17330431160707",
            products: [{ name: "VINFAST EVO 200", quantity: 1 }],
            orderDate: "2/11/2024",
            timestamp: new Date("2024-11-07").getTime(),
            totalAmount: 49000000,
            status: "Đã giao hàng",
            address: "Quận 7"
        },
        {
            orderId: "17330431160708",
            products: [{ name: "VINFAST EVO 200", quantity: 1 }],
            orderDate: "3/11/2024",
            timestamp: new Date("2024-11-08").getTime(),
            totalAmount: 49000000,
            status: "Đã thanh toán",
            address: "Quận 8"
        },
        {
            orderId: "17330431160709",
            products: [{ name: "VINFAST FELIZ S", quantity: 1 }],
            orderDate: "2/11/2024",
            timestamp: new Date("2024-11-09").getTime(),
            totalAmount: 496000000,
            status: "Đã thanh toán",
            address: "Quận 9"
        },
        {
            orderId: "17330431160710",
            products: [{ name: "VINFAST EVO 200", quantity: 1 }],
            orderDate: "3/11/2024",
            timestamp: new Date("2024-11-10").getTime(),
            totalAmount: 759000000,
            status: "Đang chờ",
            address: "Quận Tân Bình"
        }
    ];

    localStorage.setItem("orders", JSON.stringify(orders));
    location.reload();
}

// Thêm nút để tạo dữ liệu mẫu
const button = document.createElement("button");
button.innerText = "Tạo dữ liệu mẫu";
button.onclick = createSampleOrders;
document.body.insertBefore(button, document.body.firstChild);
  // Giả sử bạn sử dụng thư viện Chart.js để vẽ biểu đồ
var ctx = document.getElementById('newRevenueChart').getContext('2d');
var newRevenueChart = new Chart(ctx, {
  type: 'line', // loại biểu đồ, ví dụ: 'line', 'bar', v.v.
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Dữ liệu cho trục X
    datasets: [{
      label: 'Doanh Thu Mới', // Tiêu đề dữ liệu
      data: [500, 700, 800, 600, 900, 1100], // Dữ liệu cho trục Y
      borderColor: 'rgba(75, 192, 192, 1)', // Màu của đường biểu đồ
      tension: 0.1 // Độ cong của đường biểu đồ
    }]
  }
});
// Biểu đồ Tăng Trưởng Doanh Thu (cập nhật từ revenueChart)
var ctxRevenue = document.getElementById('revenueChart').getContext('2d');
var revenueChart = new Chart(ctxRevenue, {
  type: 'line', // Loại biểu đồ: line
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Dữ liệu trục X
    datasets: [{
      label: 'Doanh Thu Theo Thời Gian',
      data: [1000, 1200, 1400, 1600, 1800, 2000], // Dữ liệu trục Y
      borderColor: 'rgba(75, 192, 192, 1)', // Màu đường biểu đồ
      tension: 0.1
    }]
  }
});

// Biểu đồ Tăng Trưởng Doanh Thu
var ctxGrowth = document.getElementById('growthChart').getContext('2d');
var growthChart = new Chart(ctxGrowth, {
  type: 'bar', // Biểu đồ thanh
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Dữ liệu trục X
    datasets: [{
      label: 'Tăng Trưởng Doanh Thu',
      data: [5, 8, 6, 7, 9, 10], // Tăng trưởng theo tháng
      backgroundColor: 'rgba(153, 102, 255, 0.2)', // Màu nền của các cột
      borderColor: 'rgba(153, 102, 255, 1)', // Màu viền của các cột
      borderWidth: 1
    }]
  }
});

// Biểu đồ Tăng Trưởng Doanh Thu Mới (Tăng Trưởng So Với Doanh Thu)
var ctxGrowthNew = document.getElementById('growthChartNew').getContext('2d');
var growthChartNew = new Chart(ctxGrowthNew, {
  type: 'line', // Loại biểu đồ: line
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Dữ liệu trục X
    datasets: [{
      label: 'Tăng Trưởng Doanh Thu (%)',
      data: [10, 15, 12, 18, 20, 25], // Tăng trưởng theo tỷ lệ phần trăm
      borderColor: 'rgba(255, 99, 132, 1)', // Màu đường biểu đồ
      tension: 0.1
    }]
  }
});
