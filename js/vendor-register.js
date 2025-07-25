// Direct vendor registration script
document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const registerForm = document.getElementById('register-form');
  const loadingOverlay = document.getElementById('loading-overlay');
  const registerButton = document.getElementById('register-button');
  
  // Firebase configuration (if not already initialized)
  const firebaseConfig = {
    apiKey: "AIzaSyB4H9MQ76i1p3tThi6Zoc-AGbfnqjBSLRI",
    authDomain: "efresh-56b75.firebaseapp.com",
    projectId: "efresh-56b75",
    storageBucket: "efresh-56b75.appspot.com",
    messagingSenderId: "253998754664",
    appId: "1:253998754664:web:889840cf5d84ef903a84dd"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Helper functions
  function showLoading() {
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
    if (registerButton) {
      registerButton.disabled = true;
    }
  }
  
  function hideLoading() {
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
    if (registerButton) {
      registerButton.disabled = false;
    }
  }
  
  // Form submission
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;
      const confirmPassword = registerForm.confirm_password.value;
      const storeName = registerForm.store_name.value.trim();
      const storeDescription = registerForm.store_description.value.trim();
      const storeCategory = registerForm.store_category.value;
      const phone = registerForm.phone.value.trim();
      const location = registerForm.location.value.trim();
      
      // Basic validation
      if (!email || !password || !storeName || !phone || !location) {
        alert("Please fill in all required fields");
        return;
      }
      
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      
      if (!storeCategory) {
        alert("Please select a store category");
        return;
      }
      
      // Show loading
      showLoading();
      
      // Create user
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
          const user = userCredential.user;
          
          // Store role immediately in localStorage
          localStorage.setItem("userRole", "vendor");
          localStorage.setItem(`userRole_${user.uid}`, "vendor");
          
          // Save vendor data
          return firebase.firestore().collection("users").doc(user.uid).set({
            storeName: storeName,
            storeDescription: storeDescription,
            storeCategory: storeCategory,
            phone: phone,
            location: location,
            email: email,
            role: "vendor",
            approved: true,
            createdAt: new Date()
          });
        })
        .then(function() {
          // Set role in localStorage
          localStorage.setItem("userRole", "vendor");
          
          // Success message
          alert("Registration successful!");
          
          // Redirect
          window.location.href = "vendor_dashboard.html";
        })
        .catch(function(error) {
          console.error("Error:", error);
          alert("Registration error: " + error.message);
          hideLoading();
        });
    });
  }
  
  // Enhanced vendor registration
  async function registerVendor(formData) {
    const { email, password, businessName, contactNumber, address } = formData;
    
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Store role immediately
      localStorage.setItem("userRole", "vendor");
      localStorage.setItem(`userRole_${user.uid}`, "vendor");
      
      // Save to Firestore
      await firebase.firestore().collection("users").doc(user.uid).set({
        businessName: businessName,
        contactNumber: contactNumber,
        address: address,
        email: email,
        role: "vendor",
        isApproved: false,
        businessType: 'grocery',
        createdAt: new Date()
      });
      
      alert('Vendor registration successful! You will be redirected to your dashboard.');
      window.location.href = "vendor_dashboard.html";
      
    } catch (error) {
      console.error('Vendor registration error:', error);
      alert('Registration failed: ' + error.message);
    }
  }
  
  // Make function available globally
  window.registerVendor = registerVendor;
});