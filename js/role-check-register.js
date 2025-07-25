// Auth-only registration implementation with role storage
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;

  // Determine if this is vendor registration
  const isVendor = window.location.pathname.includes('vendor');
  const userRole = isVendor ? 'vendor' : 'customer';
  
  // Add loading indicator
  const showLoading = () => {
    const button = registerForm.querySelector('button');
    button.innerHTML = '<span style="display:inline-block;width:20px;height:20px;border:2px solid #fff;border-radius:50%;border-top-color:transparent;animation:spin 1s linear infinite;"></span> Registering...';
    button.disabled = true;
  };

  const hideLoading = () => {
    const button = registerForm.querySelector('button');
    button.innerHTML = isVendor ? 'Register as Vendor' : 'Register as Customer';
    button.disabled = false;
  };

  // Add CSS for spinner
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `);

  // Handle form submission
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showLoading();

    // Get form values
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirm_password.value;
    
    if (password !== confirmPassword) {
      hideLoading();
      alert("Passwords do not match.");
      return;
    }
    
    // Create user with Firebase Auth ONLY (no Firestore)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Store user info in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userCredential.user.uid);
        
        // Store user role in a global map for role checking during login
        let userRoles = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
        userRoles[email.toLowerCase()] = userRole;
        localStorage.setItem('userRolesMap', JSON.stringify(userRoles));
        
        // Show success message and redirect
        alert('Registration successful!');
        
        if (isVendor) {
          window.location.href = 'vendor_dashboard.html';
        } else {
          window.location.href = 'customer_dashboard.html';
        }
      })
      .catch((error) => {
        hideLoading();
        console.error("Registration error:", error);
        
        if (error.code === 'auth/email-already-in-use') {
          alert("This email is already registered. Please use a different email or try logging in.");
        } else {
          alert("Registration failed: " + error.message);
        }
      });
  });
});