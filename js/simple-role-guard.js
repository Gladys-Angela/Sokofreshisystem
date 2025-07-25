// Simple role guard script to protect dashboard pages
document.addEventListener('DOMContentLoaded', function() {
  // Determine required role based on page URL
  let requiredRole = null;
  
  if (window.location.pathname.includes('vendor_dashboard') || 
      window.location.pathname.includes('add_product') ||
      window.location.pathname.includes('manage_products') ||
      window.location.pathname.includes('sales_history') ||
      window.location.pathname.includes('vendor_home')) {
    requiredRole = 'vendor';
  } else if (window.location.pathname.includes('customer_dashboard') ||
             window.location.pathname.includes('my_orders') ||
             window.location.pathname.includes('wishlist')) {
    requiredRole = 'customer';
  } else if (window.location.pathname.includes('admin_dashboard') ||
             window.location.pathname.includes('admin_users') ||
             window.location.pathname.includes('admin_vendors') ||
             window.location.pathname.includes('admin_products') ||
             window.location.pathname.includes('admin_orders') ||
             window.location.pathname.includes('admin_reports') ||
             window.location.pathname.includes('admin_settings')) {
    requiredRole = 'admin';
  }
  
  // If this is a protected page
  if (requiredRole) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (isLoggedIn !== 'true') {
      // Not logged in, redirect to login
      window.location.href = 'login.html';
      return;
    }
    
    if (userRole !== requiredRole) {
      // Wrong role, redirect to appropriate dashboard
      alert(`Access denied. This page is for ${requiredRole}s only.`);
      if (userRole === 'vendor') {
        window.location.href = 'vendor_dashboard.html';
      } else if (userRole === 'admin') {
        window.location.href = 'admin_dashboard.html';
      } else {
        window.location.href = 'customer_dashboard.html';
      }
    }
  }
});