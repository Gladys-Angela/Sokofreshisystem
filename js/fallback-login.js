// Fallback login system that works even if Firestore is unavailable
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  // Login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');
    const button = loginForm.querySelector('button');
    
    // Show loading state
    button.innerHTML = '<span class="spinner"></span> Signing In...';
    button.disabled = true;
    
    // Hide any previous error
    if (loginError) loginError.style.display = 'none';
    
    // Sign in with Firebase Auth
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Try to determine role from email pattern
        let userRole = 'customer'; // Default role
        
        // Check if email contains vendor-related keywords
        if (email.includes('vendor') || 
            email.includes('shop') || 
            email.includes('store') || 
            email.includes('sell') || 
            email.includes('business')) {
          userRole = 'vendor';
        }
        
        // Try to get role from Firestore if available
        firebase.firestore().collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              userRole = userData.role || userRole;
            }
            completeLogin();
          })
          .catch(() => {
            // Firestore failed, use the default role
            completeLogin();
          });
        
        // Complete login with determined role
        function completeLogin() {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userRole', userRole);
          
          // Redirect based on role
          if (userRole === 'vendor') {
            window.location.href = 'vendor_dashboard.html';
          } else {
            window.location.href = 'customer_dashboard.html';
          }
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        
        // Reset button
        button.innerHTML = 'Sign In';
        button.disabled = false;
        
        // Show error message
        if (loginError) {
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            loginError.textContent = 'Invalid email or password. Please try again.';
          } else {
            loginError.textContent = 'Login failed. Please try again later.';
          }
          loginError.style.display = 'block';
        }
      });
  });
});