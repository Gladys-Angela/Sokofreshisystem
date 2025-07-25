// Register admin account with Firebase - Fixed version
document.addEventListener('DOMContentLoaded', function() {
  // Default admin credentials
  const adminEmail = 'admin@sokofreshi.com';
  const adminPassword = 'admin123';
  
  // Flag to check if we've already tried to create the admin account
  const adminCreationAttempted = localStorage.getItem('adminCreationAttempted');
  
  // Only try to create the admin account if we haven't tried before
  if (!adminCreationAttempted && typeof firebase !== 'undefined' && firebase.auth) {
    console.log('Attempting to create admin account...');
    
    // Create the admin account directly
    firebase.auth().createUserWithEmailAndPassword(adminEmail, adminPassword)
      .then((userCredential) => {
        console.log('Admin account created successfully');
        
        // Store admin role in userRolesMap
        let userRoles = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
        userRoles[adminEmail.toLowerCase()] = 'admin';
        localStorage.setItem('userRolesMap', JSON.stringify(userRoles));
        
        // Mark that we've attempted to create the admin account
        localStorage.setItem('adminCreationAttempted', 'true');
        
        // Sign out immediately
        return firebase.auth().signOut();
      })
      .catch((error) => {
        console.log('Admin account creation error:', error.code);
        
        // If the account already exists, that's fine
        if (error.code === 'auth/email-already-in-use') {
          console.log('Admin account already exists');
          
          // Still make sure the role is set correctly
          let userRoles = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
          userRoles[adminEmail.toLowerCase()] = 'admin';
          localStorage.setItem('userRolesMap', JSON.stringify(userRoles));
        }
        
        // Mark that we've attempted to create the admin account
        localStorage.setItem('adminCreationAttempted', 'true');
      });
  }
});