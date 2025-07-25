// Direct admin login script
document.addEventListener('DOMContentLoaded', function() {
  // Only run on login page
  if (!window.location.pathname.includes('login.html')) return;
  
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  // Override the form submission for admin login
  loginForm.addEventListener('submit', function(e) {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const selectedRole = document.getElementById('user-role').value;
    
    // If trying to login as admin with the correct credentials
    if (selectedRole === 'admin' && email === 'admin@efresh.com' && password === 'admin123') {
      e.preventDefault(); // Prevent the default form submission
      
      // Store admin info in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userId', 'admin-user');
      
      // Store role in userRolesMap
      let userRoles = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
      userRoles[email] = 'admin';
      localStorage.setItem('userRolesMap', JSON.stringify(userRoles));
      
      // Redirect to admin dashboard
      window.location.href = 'admin_dashboard.html';
    }
    // For non-admin logins, let the regular login script handle it
  }, true); // Use capturing to run before the regular login handler
});