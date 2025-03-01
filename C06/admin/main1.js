document.addEventListener('DOMContentLoaded', function() {
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');
    const filterForm = document.getElementById('filterForm');
    const totalOrdersElement = document.getElementById('totalOrders');
    const totalProductsSoldElement = document.getElementById('totalProductsSold');
    const avgRevenuePerOrderElement = document.getElementById('avgRevenuePerOrder');
    const statusStatsTable = document.getElementById('statusStatsTable');

    // Khôi phục giá trị ngày tháng từ localStorage
    fromDateInput.value = localStorage.getItem('thongkeFromDate') || '';
    toDateInput.value = localStorage.getItem('thongkeToDate') || '';

    filterForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn form gửi đi

        // Lưu trữ giá trị ngày tháng vào localStorage
        localStorage.setItem('thongkeFromDate', fromDateInput.value);
        localStorage.setItem('thongkeToDate', toDateInput.value);

        // Lấy dữ liệu đơn hàng từ localStorage
        const allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        console.log('All Orders:', allOrders);

        // Lọc đơn hàng theo ngày tháng
        const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
        const toDate = toDateInput.value ? new Date(toDateInput.value) : null;

        const filteredOrders = allOrders.filter(order => {
            const orderDate = new Date(order.date);
            return (!fromDate || orderDate >= fromDate) && (!toDate || orderDate <= toDate);
        });

        console.log('Filtered Orders:', filteredOrders);

        // Cập nhật thống kê
        updateStatistics(filteredOrders);
    });
    function updateStatistics(filteredProducts) {
        // Cập nhật logic thống kê ở đây
    }
});
    function updateStatistics(filteredOrders) {
        let totalOrders = filteredOrders.length;
        let totalProductsSold = filteredOrders.reduce((sum, order) => sum + order.quantity, 0);
        let totalRevenue = filteredOrders.reduce((sum, order) => sum + order.price * order.quantity, 0);
        let avgRevenuePerOrder = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

        // Hiển thị thống kê tổng quan
        totalOrdersElement.textContent = totalOrders;
        totalProductsSoldElement.textContent = totalProductsSold;
        avgRevenuePerOrderElement.textContent = `${avgRevenuePerOrder}₫`;

        // Tổng hợp theo trạng thái
        const ordersByStatus = filteredOrders.reduce((acc, order) => {
            if (!acc[order.status]) {
                acc[order.status] = { count: 0, revenue: 0 };
            }
            acc[order.status].count += 1;
            acc[order.status].revenue += order.price * order.quantity;
            return acc;
        }, {});

        // Xóa các hàng cũ trong bảng
        statusStatsTable.innerHTML = '';

        // Hiển thị thống kê theo trạng thái
        for (const [status, stats] of Object.entries(ordersByStatus)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${status}</td>
                <td>${stats.count}</td>
                <td>${stats.revenue}₫</td>
            `;
            statusStatsTable.appendChild(row);
        }
    }
;
