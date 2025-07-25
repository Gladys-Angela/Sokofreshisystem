// Simple login state management
document.addEventListener('DOMContentLoaded', function() {
  // Check login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Set login state
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to previous page or home
      const redirectUrl = localStorage.getItem('loginRedirect') || 'index.html';
      window.location.href = redirectUrl;
    });
  }
  
  // Check logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear login state
      localStorage.setItem('isLoggedIn', 'false');
      
      // Redirect to home
      window.location.href = 'index.html';
    });
  }
  
  // Set login redirect when going to checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      localStorage.setItem('loginRedirect', 'checkout.html');
    });
  }
});