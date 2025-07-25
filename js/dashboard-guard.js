// Simple dashboard access control
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    // Not logged in, redirect to login page
    window.location.href = 'login.html';
    return;
  }
  
  // Get user role and current page
  const userRole = localStorage.getItem('userRole');
  const currentPath = window.location.pathname;
  
  // Check if user is on the correct dashboard
  if (currentPath.includes('customer_dashboard') && userRole !== 'customer') {
    alert('This page is only for customer accounts. Redirecting to the appropriate dashboard.');
    window.location.href = 'vendor_dashboard.html';
  } else if (currentPath.includes('vendor_dashboard') && userRole !== 'vendor') {
    alert('This page is only for vendor accounts. Redirecting to the appropriate dashboard.');
    window.location.href = 'customer_dashboard.html';
  }
});