// Login page handler
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  // Role selector functionality
  const roleOptions = document.querySelectorAll('.role-option');
  const userRoleInput = document.getElementById('user-role');
  
  roleOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      roleOptions.forEach(opt => opt.classList.remove('active'));
      
      // Add active class to clicked option
      this.classList.add('active');
      
      // Update hidden input value
      userRoleInput.value = this.dataset.role;
      
      // Clear any previous error messages
      const loginError = document.getElementById('login-error');
      if (loginError) {
        loginError.style.display = 'none';
      }
    });
  });
  
  // Login form submission
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const requestedRole = document.getElementById('user-role').value;
    const loginError = document.getElementById('login-error');
    const button = loginForm.querySelector('button[type="submit"]');
    
    // Show loading state
    button.innerHTML = '<span class="spinner"></span> Signing In...';
    button.disabled = true;
    
    try {
      // Attempt login with role validation
      const result = await AuthService.login(email, password, requestedRole);
      
      if (result.success) {
        // Redirect based on role
        if (result.role === 'vendor') {
          window.location.href = 'vendor_dashboard.html';
        } else if (result.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'customer_dashboard.html';
        }
      } else {
        // Show error message
        button.innerHTML = 'Sign In';
        button.disabled = false;
        
        if (result.error.code === 'auth/role-mismatch') {
          loginError.textContent = result.error.message;
        } else if (result.error.code === 'auth/user-not-found' || result.error.code === 'auth/wrong-password') {
          loginError.textContent = 'Invalid email or password. Please try again.';
        } else {
          loginError.textContent = 'Login failed. Please try again later.';
        }
        
        loginError.style.display = 'block';
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Reset button
      button.innerHTML = 'Sign In';
      button.disabled = false;
      
      // Show generic error
      loginError.textContent = 'An error occurred during login. Please try again.';
      loginError.style.display = 'block';
    }
  });
});