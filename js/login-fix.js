// Enhanced login functionality with Firebase
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  
  if (!loginForm) return;
  
  // Initialize Firebase if not already initialized
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded');
    return;
  }
  
  // Add loading indicator
  const showLoading = () => {
    const button = loginForm.querySelector('button');
    button.innerHTML = '<span class="spinner"></span> Signing In...';
    button.disabled = true;
  };

  const hideLoading = () => {
    const button = loginForm.querySelector('button');
    button.innerHTML = 'Sign In';
    button.disabled = false;
  };

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    loginError.style.display = 'none';

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const selectedRole = document.getElementById('user-role').value; // Get selected role from UI

    try {
      // Sign in with email and password
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      try {
        // Get user data from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        
        if (userDoc.exists) {
          const userData = userDoc.data();
          const actualRole = userData.role || 'customer';
          
          // Check if the user is trying to log in with the correct role
          if (selectedRole !== actualRole) {
            // Role mismatch - show error
            hideLoading();
            if (selectedRole === 'customer' && actualRole === 'vendor') {
              loginError.textContent = 'This account is registered as a vendor. Please use the vendor login option.';
            } else if (selectedRole === 'vendor' && actualRole === 'customer') {
              loginError.textContent = 'This account is registered as a customer. Please use the customer login option.';
            } else {
              loginError.textContent = 'Invalid account type for this login section.';
            }
            loginError.style.display = 'block';
            return;
          }
          
          // Role matches, proceed with login
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userRole', actualRole);
          localStorage.setItem('userName', userData.fullName || userData.storeName || '');
          
          // Redirect based on role
          if (actualRole === 'vendor') {
            window.location.href = 'vendor_dashboard.html';
            return;
          } else if (actualRole === 'admin') {
            window.location.href = 'admin.html';
            return;
          } else {
            // Customer role
            window.location.href = 'customer_dashboard.html';
            return;
          }
        } else {
          // User document doesn't exist in Firestore
          hideLoading();
          loginError.textContent = 'Account information not found. Please contact support.';
          loginError.style.display = 'block';
          return;
        }
      } catch (firestoreError) {
        console.warn("Firestore error:", firestoreError);
        hideLoading();
        loginError.textContent = 'Error retrieving account information. Please try again later.';
        loginError.style.display = 'block';
        return;
      }
      
    } catch (error) {
      console.error("Login Error:", error);
      hideLoading();
      
      // Display appropriate error message
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        loginError.textContent = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/too-many-requests') {
        loginError.textContent = 'Too many failed login attempts. Please try again later.';
      } else {
        loginError.textContent = error.message || 'Login failed. Please try again.';
      }
      loginError.style.display = 'block';
    }
  });
});