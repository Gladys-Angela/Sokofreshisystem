// Vendor Home Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication and load vendor data
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = 'login.html?redirect=vendor_home.html';
      return;
    }

    // Check if user is vendor
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'vendor') {
      window.location.href = 'customer_dashboard.html';
      return;
    }

    // Load vendor dashboard data
    loadVendorDashboardData(user.uid);
  });

  // Logout functionality
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
      });
    });
  }

  // Chat support functionality
  const chatSupportLink = document.getElementById('chat-support-link');
  if (chatSupportLink) {
    chatSupportLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('chat_support.html', '_blank', 'width=800,height=600');
    });
  }
});

async function loadVendorDashboardData(vendorId) {
  try {
    // Show loading state
    updateStatsLoading(true);
    
    // Load products count
    const productsCount = await getVendorProductsCount(vendorId);
    
    // Load sales data
    const salesData = await getVendorSalesData(vendorId);
    
    // Load recent orders
    const recentOrders = await getRecentOrders(vendorId);
    
    // Update UI with real data
    updateDashboardStats(productsCount, salesData);
    updateRecentOrdersTable(recentOrders);
    
  } catch (error) {
    console.error('Error loading vendor data:', error);
    // Show error state or fallback to sample data
    loadSampleData();
  }
}

async function getVendorProductsCount(vendorId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('products')
      .where('vendorId', '==', vendorId)
      .where('status', '==', 'active')
      .get();
    
    return snapshot.size;
  } catch (error) {
    console.error('Error getting products count:', error);
    return 0;
  }
}

async function getVendorSalesData(vendorId) {
  try {
    // Get manual sales
    const manualSalesSnapshot = await firebase.firestore()
      .collection('manual_sales')
      .where('vendorId', '==', vendorId)
      .get();
    
    let totalRevenue = 0;
    let totalOrders = manualSalesSnapshot.size;
    
    manualSalesSnapshot.forEach(doc => {
      const sale = doc.data();
      totalRevenue += sale.totalAmount || 0;
    });
    
    // TODO: Add online orders when implemented
    // For now, we'll use manual sales data
    
    return {
      totalRevenue: totalRevenue,
      totalOrders: totalOrders,
      averageRating: 4.5 // Placeholder - implement when reviews are added
    };
  } catch (error) {
    console.error('Error getting sales data:', error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageRating: 0
    };
  }
}

async function getRecentOrders(vendorId) {
  try {
    const snapshot = await firebase.firestore()
      .collection('manual_sales')
      .where('vendorId', '==', vendorId)
      .orderBy('saleDate', 'desc')
      .limit(5)
      .get();
    
    const orders = [];
    snapshot.forEach(doc => {
      const sale = doc.data();
      orders.push({
        id: doc.id,
        customer: sale.customerName || 'Walk-in Customer',
        date: sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : 'N/A',
        amount: `Ksh ${sale.totalAmount || 0}`,
        status: 'Completed',
        type: 'Manual Sale'
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Error getting recent orders:', error);
    return [];
  }
}

function updateDashboardStats(productsCount, salesData) {
  // Update total products
  const totalProductsElement = document.getElementById('total-products');
  if (totalProductsElement) {
    totalProductsElement.textContent = productsCount;
  }
  
  // Update total orders
  const totalOrdersElement = document.getElementById('total-orders');
  if (totalOrdersElement) {
    totalOrdersElement.textContent = salesData.totalOrders;
  }
  
  // Update total revenue
  const totalRevenueElement = document.getElementById('total-revenue');
  if (totalRevenueElement) {
    totalRevenueElement.textContent = `Ksh ${salesData.totalRevenue.toLocaleString()}`;
  }
  
  // Update average rating
  const avgRatingElement = document.getElementById('avg-rating');
  if (avgRatingElement) {
    avgRatingElement.textContent = salesData.averageRating.toFixed(1);
  }
  
  // Hide loading state
  updateStatsLoading(false);
}

function updateRecentOrdersTable(orders) {
  const tableBody = document.getElementById('recent-orders-table');
  if (!tableBody) return;
  
  if (orders.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
          No recent orders found. <a href="record_sales.html">Record your first sale</a>
        </td>
      </tr>
    `;
    return;
  }
  
  tableBody.innerHTML = '';
  
  orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${order.id.substring(0, 8)}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>${order.amount}</td>
      <td>
        <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function updateStatsLoading(isLoading) {
  const statsCards = document.querySelectorAll('.stat-card h3');
  
  statsCards.forEach(card => {
    if (isLoading) {
      card.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
  });
}

function loadSampleData() {
  // Fallback sample data if Firebase fails
  updateDashboardStats(0, {
    totalRevenue: 0,
    totalOrders: 0,
    averageRating: 0
  });
  
  updateRecentOrdersTable([]);
}