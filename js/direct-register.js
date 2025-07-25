// Registration implementation with Firestore role storage
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
    
    // Add console logs for debugging
    console.log('Attempting registration with:', { email, userRole });
    
    // Create user with Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Firebase Auth registration successful, user:', userCredential.user.uid);
        const user = userCredential.user;
        
        // Store user role in Firestore
        const db = firebase.firestore && firebase.firestore();
        if (!db) {
          console.error('Firestore is not available');
          alert('Registration failed: Database connection error. Please try again later.');
          hideLoading();
          return;
        }
        console.log('Storing user role in Firestore:', { uid: user.uid, email, userRole });
        return db.collection('users').doc(user.uid).set({
          email: email,
          role: userRole,
          createdAt: new Date()
        }).then(() => {
          console.log('User role stored successfully in Firestore');
          // Store basic user info in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userRole', userRole);
          localStorage.setItem('userId', user.uid);
          
          // Show success message and redirect
          alert('Registration successful!');
          
          if (isVendor) {
            window.location.href = 'vendor_dashboard.html';
          } else {
            window.location.href = 'customer_dashboard.html';
          }
        });
      })
      .catch((error) => {
        hideLoading();
        console.error("Registration error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        if (error.code === 'auth/email-already-in-use') {
          alert("This email is already registered. Please use a different email or try logging in.");
        } else {
          alert("Registration failed: " + error.message);
        }
      });
  });
});