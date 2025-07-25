// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // Populate email field
      document.getElementById('email').value = user.email || '';
      
      // Get user data from Firestore
      db.collection('users').doc(user.uid).get()
        .then(function(doc) {
          if (doc.exists) {
            const userData = doc.data();
            document.getElementById('username').value = userData.name || '';
            document.getElementById('mobile').value = userData.mobile || '';
          }
        })
        .catch(function(error) {
          console.error("Error getting user data:", error);
        });
    } else {
      // Not logged in, redirect to index
      window.location.href = 'index.html';
    }
  });
  
  // Form submission
  document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    
    if (!username) {
      alert('Username cannot be empty');
      return;
    }
    
    // Show loading state
    const saveBtn = document.getElementById('save-btn');
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;
    
    const user = auth.currentUser;
    if (user) {
      // Update user data in Firestore
      db.collection('users').doc(user.uid).set({
        name: username,
        mobile: mobile
      }, { merge: true })
      .then(function() {
        // Reset button
        saveBtn.innerHTML = 'Save Changes';
        saveBtn.disabled = false;
        
        // Show success message using browser alert
        alert('Profile updated successfully!');
      })
      .catch(function(error) {
        console.error("Error updating profile:", error);
        
        // Reset button
        saveBtn.innerHTML = 'Save Changes';
        saveBtn.disabled = false;
        
        alert('Error updating profile. Please try again.');
      });
    }
  });
  
  // Cancel button
  document.getElementById('cancel-btn').addEventListener('click', function() {
    window.location.href = 'customer_dashboard.html';
  });
});