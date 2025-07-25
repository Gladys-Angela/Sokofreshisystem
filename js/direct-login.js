// Login implementation with Firestore role validation
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
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const selectedRole = document.getElementById('user-role').value;
    const loginError = document.getElementById('login-error');
    const button = loginForm.querySelector('button');
    
    // Show loading state
    button.innerHTML = '<span class="spinner"></span> Signing In...';
    button.disabled = true;
    
    // Add console logs for debugging
    console.log('Attempting login with:', { email, selectedRole });
    
    // Login with Firebase Auth and validate role
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Firebase Auth successful, user:', userCredential.user.uid);
        const user = userCredential.user;
        const db = firebase.firestore && firebase.firestore();
        
        if (!db) {
          console.error('Firestore is not available');
          button.innerHTML = 'Sign In';
          button.disabled = false;
          loginError.textContent = 'Login failed: Database connection error. Please try again later.';
          loginError.style.display = 'block';
          return Promise.reject(new Error('Firestore not available'));
        }
        
        // Check user role in Firestore
        console.log('Checking user role in Firestore for user:', user.uid);
        return db.collection('users').doc(user.uid).get()
          .then((doc) => {
            console.log('Firestore document exists:', doc.exists);
            if (doc.exists) {
              const userData = doc.data();
              const actualRole = userData.role;
              console.log('User data from Firestore:', { actualRole, selectedRole });
              
              // Validate that selected role matches the stored role
              if (actualRole === selectedRole) {
                // Store user info in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userRole', actualRole);
                localStorage.setItem('userId', user.uid);
                
                // Redirect based on role
                if (actualRole === 'vendor') {
                  window.location.href = 'vendor_dashboard.html';
                } else {
                  window.location.href = 'customer_dashboard.html';
                }
              } else {
                // Role mismatch error
                firebase.auth().signOut(); // Sign out the user
                throw new Error(`You are registered as a ${actualRole}. Please select the correct role to login.`);
              }
            } else {
              // User document doesn't exist in Firestore
              // This is for backward compatibility with existing users
              // Create a new user document with the selected role
              return db.collection('users').doc(user.uid).set({
                email: email,
                role: selectedRole,
                createdAt: new Date()
              }).then(() => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userRole', selectedRole);
                localStorage.setItem('userId', user.uid);
                
                if (selectedRole === 'vendor') {
                  window.location.href = 'vendor_dashboard.html';
                } else {
                  window.location.href = 'customer_dashboard.html';
                }
              });
            }
          });
      })
      .catch((error) => {
        console.error("Login error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // Reset button
        button.innerHTML = 'Sign In';
        button.disabled = false;
        
        // Show error message
        if (error.message.includes('registered as a')) {
          loginError.textContent = error.message;
        } else {
          loginError.textContent = 'Invalid email or password. Please try again.';
        }
        loginError.style.display = 'block';
      });
  });
});