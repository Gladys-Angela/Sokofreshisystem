// Role guard script to protect dashboard pages
document.addEventListener('DOMContentLoaded', function() {
  // Determine required role based on page URL
  let requiredRole = null;
  
  if (window.location.pathname.includes('vendor_dashboard') || 
      window.location.pathname.includes('add_product') ||
      window.location.pathname.includes('manage_products') ||
      window.location.pathname.includes('sales_history') ||
      window.location.pathname.includes('vendor_home')) {
    requiredRole = 'vendor';
  } else if (window.location.pathname.includes('customer_dashboard') ||
             window.location.pathname.includes('my_orders') ||
             window.location.pathname.includes('wishlist')) {
    requiredRole = 'customer';
  }
  
  // If this is a protected page
  if (requiredRole) {
    const auth = firebase.auth();
    
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in, check role in Firestore
        const db = firebase.firestore && firebase.firestore();
        
        if (!db) {
          console.error('Firestore is not available');
          alert('Error: Database connection failed. Please try again later.');
          auth.signOut().then(() => {
            window.location.href = 'login.html';
          });
          return;
        }
        
        db.collection('users').doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              if (userData.role !== requiredRole) {
                // Wrong role, redirect to appropriate dashboard
                alert(`Access denied. This page is for ${requiredRole}s only.`);
                if (userData.role === 'vendor') {
                  window.location.href = 'vendor_dashboard.html';
                } else {
                  window.location.href = 'customer_dashboard.html';
                }
              }
              // Correct role, allow access
            } else {
              // No user document, redirect to login
              alert('User profile not found. Please login again.');
              window.location.href = 'login.html';
            }
          })
          .catch((error) => {
            console.error("Error checking user role:", error);
            alert('Error verifying your account. Please login again.');
            auth.signOut().then(() => {
              window.location.href = 'login.html';
            });
          });
      } else {
        // No user is signed in, redirect to login
        window.location.href = 'login.html';
      }
    });
  }
});