// Authentication persistence fix
document.addEventListener('DOMContentLoaded', function() {
  // Check login state on every page load
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');
  
  if (isLoggedIn && userRole && userEmail) {
    // User is logged in, update UI accordingly
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    
    if (guestNav && userNav) {
      guestNav.style.display = 'none';
      userNav.style.display = 'flex';
    }
    
    // Setup logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        // Redirect to home page
        window.location.href = 'index.html';
      });
    }
    
    // Redirect to appropriate dashboard if on login page
    if (window.location.pathname.endsWith('login.html')) {
      if (userRole === 'vendor') {
        window.location.href = 'vendor_dashboard.html';
      } else if (userRole === 'customer') {
        window.location.href = 'customer_dashboard.html';
      }
    }
  } else {
    // User is not logged in
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    
    if (guestNav && userNav) {
      guestNav.style.display = 'flex';
      userNav.style.display = 'none';
    }
    
    // Redirect to login if trying to access protected pages
    const protectedPages = [
      'vendor_dashboard.html',
      'customer_dashboard.html',
      'add_product.html',
      'edit_product.html',
      'manage_products.html',
      'my_orders.html',
      'sales_history.html'
    ];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
      window.location.href = 'login.html';
    }
  }
});