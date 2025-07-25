// Simple registration implementation
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
    
    console.log('Attempting registration with:', email);
    
    // Create user with Firebase Auth only
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Registration successful, user:', userCredential.user.uid);
        
        // Store basic user info in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userCredential.user.uid);
        
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
        console.error('Registration error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        if (error.code === 'auth/email-already-in-use') {
          alert("This email is already registered. Please use a different email or try logging in.");
        } else {
          alert("Registration failed: " + error.message);
        }
      });
  });
});