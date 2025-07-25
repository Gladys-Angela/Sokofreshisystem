// Registration page handler
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;

  // Determine if this is vendor registration
  const isVendor = window.location.pathname.includes('vendor');
  const role = isVendor ? 'vendor' : 'customer';
  
  // Add loading indicator
  const showLoading = () => {
    const button = registerForm.querySelector('button[type="submit"]');
    button.innerHTML = '<span style="display:inline-block;width:20px;height:20px;border:2px solid #fff;border-radius:50%;border-top-color:transparent;animation:spin 1s linear infinite;"></span> Registering...';
    button.disabled = true;
  };

  const hideLoading = () => {
    const button = registerForm.querySelector('button[type="submit"]');
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
  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    showLoading();

    // Get common form values
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirm_password.value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
      hideLoading();
      alert("Passwords do not match.");
      return;
    }
    
    // Collect user data based on role
    let userData = {};
    
    if (isVendor) {
      // Vendor-specific fields
      const storeName = registerForm.store_name.value.trim();
      const storeDescription = registerForm.store_description?.value.trim() || '';
      const storeCategory = registerForm.store_category.value;
      const phone = registerForm.phone.value.trim();
      const location = registerForm.location.value.trim();
      
      // Validate required fields
      if (!storeName || !storeCategory || !phone || !location) {
        hideLoading();
        alert("Please fill in all required fields.");
        return;
      }
      
      userData = {
        storeName,
        storeDescription,
        storeCategory,
        phone,
        location,
        approved: true
      };
    } else {
      // Customer-specific fields
      const fullName = registerForm.full_name.value.trim();
      const phone = registerForm.phone.value.trim();
      
      // Validate required fields
      if (!fullName || !phone) {
        hideLoading();
        alert("Please fill in all required fields.");
        return;
      }
      
      userData = {
        fullName,
        phone
      };
    }
    
    try {
      // Register user with role
      const result = await AuthService.register(email, password, role, userData);
      
      if (result.success) {
        // Show success message and redirect
        alert('Registration successful!');
        
        if (isVendor) {
          window.location.href = 'vendor_dashboard.html';
        } else {
          window.location.href = 'customer_dashboard.html';
        }
      } else {
        hideLoading();
        
        if (result.error.code === 'auth/email-already-in-use') {
          alert("This email is already registered. Please use a different email or try logging in.");
        } else {
          alert(`Registration failed: ${result.error.message}`);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      hideLoading();
      alert("An error occurred during registration. Please try again.");
    }
  });
});