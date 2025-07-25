// Navigation helper functions
document.addEventListener('DOMContentLoaded', function() {
  // Fix login and register buttons
  const loginBtn = document.querySelector('.login');
  if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }
  
  const registerBtn = document.querySelector('.register');
  if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'register.html';
    });
  }
});