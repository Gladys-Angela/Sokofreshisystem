// Add default admin account
document.addEventListener('DOMContentLoaded', function() {
  // Default admin credentials
  const adminEmail = 'admin@efresh.com';
  const adminPassword = 'admin123';
  
  // Get stored user roles
  let userRoles = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
  
  // Add admin role if it doesn't exist
  if (!userRoles[adminEmail]) {
    userRoles[adminEmail] = 'admin';
    localStorage.setItem('userRolesMap', JSON.stringify(userRoles));
    console.log('Default admin account added to role mapping');
  }
  
  // Check if we're on the login page
  if (window.location.pathname.includes('login.html')) {
    // Add a hint about admin credentials
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      const hint = document.createElement('div');
      hint.style.marginTop = '10px';
      hint.style.fontSize = '0.8rem';
      hint.style.color = '#666';
      hint.style.textAlign = 'center';
      hint.innerHTML = 'Admin login: admin@efresh.com / admin123';
      
      const loginLinks = document.querySelector('.login-links');
      if (loginLinks) {
        loginLinks.parentNode.insertBefore(hint, loginLinks);
      }
    }
  }
});