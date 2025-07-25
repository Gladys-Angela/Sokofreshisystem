// Auth-only login implementation with role checking
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  // Role selector functionality
  const roleOptions = document.querySelectorAll('.role-option');
  const userRoleInput = document.getElementById('user-role');
  
  roleOptions.forEach(option => {
    option.addEventListener('click', function() {
      roleOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      userRoleInput.value = this.dataset.role;
      
      const loginError = document.getElementById('login-error');
      if (loginError) loginError.style.display = 'none';
    });
  });
  
  // Login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const selectedRole = document.getElementById('user-role').value;
    const loginError = document.getElementById('login-error');
    const button = loginForm.querySelector('button');
    
    // Show loading state
    button.innerHTML = '<span class="spinner"></span> Signing In...';
    button.disabled = true;
    
    // Get stored user roles
    const userRoles = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
    const storedRole = userRoles[email];
    
    // Check if user exists and has a different role
    if (storedRole && storedRole !== selectedRole) {
      button.innerHTML = 'Sign In';
      button.disabled = false;
      loginError.textContent = `This email is registered as a ${storedRole}. Please select the correct role to login.`;
      loginError.style.display = 'block';
      return;
    }
    
    // Simple login with Firebase Auth only
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // If this is a new user (not in our role map), store their selected role
        if (!storedRole) {
          userRoles[email] = selectedRole;
          localStorage.setItem('userRolesMap', JSON.stringify(userRoles));
        }
        
        // Store basic user info in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('userId', userCredential.user.uid);
        
        // Redirect based on selected role
        if (selectedRole === 'vendor') {
          window.location.href = 'vendor_dashboard.html';
        } else if (selectedRole === 'admin') {
          window.location.href = 'admin_dashboard.html';
        } else {
          window.location.href = 'customer_dashboard.html';
        }
      })
      .catch((error) => {
        // Reset button
        button.innerHTML = 'Sign In';
        button.disabled = false;
        
        // Show error message
        loginError.textContent = 'Invalid email or password. Please try again.';
        loginError.style.display = 'block';
      });
  });
});