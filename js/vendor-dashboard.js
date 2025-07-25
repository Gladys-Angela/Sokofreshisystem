/**
 * Vendor Dashboard JavaScript
 * Handles displaying sales data and stock information
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the vendor dashboard page
  if (!document.querySelector('.vendor-card')) return;
  
  // Initialize the dashboard
  initVendorDashboard();
});

async function initVendorDashboard() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  
  try {
    // Load and display sales data
    await loadSalesOverview(user.uid);
    
    // Load and display stock information
    await loadStockOverview(user.uid);
    
    // Load recent feedback (not implemented in this version)
    // await loadRecentFeedback(user.uid);
  } catch (error) {
    console.error("Error initializing vendor dashboard:", error);
  }
}

async function loadSalesOverview(vendorId) {
  try {
    // Get manual sales from localStorage
    const allSales = JSON.parse(localStorage.getItem('sales')) || [];
    const vendorSales = allSales.filter(sale => sale.vendorId === vendorId);
    
    // Calculate total manual sales
    const totalManualSales = vendorSales.reduce((sum, sale) => sum + parseFloat(sale.totalAmount || 0), 0);
    
    // Get online orders for this vendor from Firestore
    const ordersSnapshot = await firebase.firestore()
      .collection('orders')
      .where('vendorId', '==', vendorId)
      .get();
    
    // Calculate total online sales
    let totalOnlineSales = 0;
    let orderCount = 0;
    
    ordersSnapshot.forEach(doc => {
      const orderData = doc.data();
      totalOnlineSales += parseFloat(orderData.totalAmount || 0);
      orderCount++;
    });
    
    // Calculate combined total
    const totalSales = totalManualSales + totalOnlineSales;
    
    // Update the sales overview card
    const salesCard = document.querySelector('.vendor-card:nth-child(1)');
    if (salesCard) {
      salesCard.innerHTML = `
        <h4>Sales Overview</h4>
        <p>Total Sales: Ksh ${totalSales.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</p>
        <p>Total Orders: ${orderCount + vendorSales.length}</p>
        <p>Manual Sales: Ksh ${totalManualSales.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</p>
        <a href="record_sales.html" class="dashboard-btn">Record New Sale</a>
      `;
    }
  } catch (error) {
    console.error("Error loading sales overview:", error);
  }
}

async function loadStockOverview(vendorId) {
  try {
    // Get products from Firestore
    const productsSnapshot = await firebase.firestore()
      .collection('products')
      .where('vendorId', '==', vendorId)
      .get();
    
    let totalProducts = 0;
    let outOfStock = 0;
    let lowStock = 0;
    
    productsSnapshot.forEach(doc => {
      const product = doc.data();
      totalProducts++;
      
      // Check stock status based on quantity field
      const stockQuantity = parseInt(product.stockQuantity || 0);
      
      if (stockQuantity <= 0) {
        outOfStock++;
      } else if (stockQuantity < 10) { // Consider less than 10 as low stock
        lowStock++;
      }
    });
    
    // Update the stock overview card
    const stockCard = document.querySelector('.vendor-card:nth-child(2)');
    if (stockCard) {
      stockCard.innerHTML = `
        <h4>Stock Overview</h4>
        <p>Total Products: ${totalProducts}</p>
        <p>Out of Stock: ${outOfStock}</p>
        <p>Low Stock: ${lowStock}</p>
        <a href="add_product.html" class="dashboard-btn">Add New Product</a>
      `;
    }
  } catch (error) {
    console.error("Error loading stock overview:", error);
  }
}

// Make functions available globally
window.initVendorDashboard = initVendorDashboard;