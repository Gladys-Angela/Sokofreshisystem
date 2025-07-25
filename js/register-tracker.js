// Track user registrations
document.addEventListener('DOMContentLoaded', function() {
  console.log('Register tracker script loaded');
  
  // Check if we're on a registration page
  const isRegistrationPage = window.location.pathname.includes('register');
  console.log('Is registration page:', isRegistrationPage, window.location.pathname);
  if (!isRegistrationPage) return;
  
  // Get registration form
  const registerForm = document.getElementById('register-form');
  console.log('Register form found:', !!registerForm);
  if (!registerForm) return;
  
  // Add event listener to form submission
  registerForm.addEventListener('submit', function(e) {
    console.log('Form submitted');
    // Don't prevent default as the original handler needs to run
    
    // Get email and determine role
    const email = registerForm.querySelector('input[type="email"]').value;
    const isVendor = window.location.pathname.includes('vendor');
    const role = isVendor ? 'vendor' : 'customer';
    console.log('Registration details:', { email, isVendor, role });
    
    // Save to registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    console.log('Current registered users:', registeredUsers);
    
    // Check if user already exists
    const existingUserIndex = registeredUsers.findIndex(user => user.email === email);
    
    if (existingUserIndex !== -1) {
      // Update existing user
      registeredUsers[existingUserIndex].role = role;
      console.log('Updated existing user');
    } else {
      // Add new user
      registeredUsers.push({
        id: 'user-' + Date.now(),
        email: email,
        role: role,
        joinedDate: new Date().toISOString(),
        status: 'active'
      });
      console.log('Added new user');
    }
    
    // Save back to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    console.log('Saved registered users to localStorage');
    
    // If vendor, also save to vendors
    if (isVendor) {
      const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      console.log('Current vendors:', vendors);
      
      // Get store name if available
      const storeName = registerForm.querySelector('#store_name') ? 
                        registerForm.querySelector('#store_name').value : 
                        email.split('@')[0] + "'s Store";
      
      // Get store category if available
      const storeCategory = registerForm.querySelector('#store_category') ? 
                           registerForm.querySelector('#store_category').value : 
                           'Mixed Products';
      
      console.log('Vendor details:', { storeName, storeCategory });
      
      // Add vendor
      const newVendor = {
        id: 'vendor-' + Date.now(),
        email: email,
        storeName: storeName,
        storeCategory: storeCategory,
        joinedDate: new Date().toISOString(),
        status: 'active'
      };
      
      vendors.push(newVendor);
      console.log('Added new vendor:', newVendor);
      
      // Save back to localStorage
      localStorage.setItem('vendors', JSON.stringify(vendors));
      console.log('Saved vendors to localStorage');
      
      // Also update userRolesMap for compatibility
      const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
      userRolesMap[email] = 'vendor';
      localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
      console.log('Updated userRolesMap');
    }
  });
  
  console.log('Register tracker setup complete');
});