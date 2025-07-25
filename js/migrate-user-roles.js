// Migration script to add user roles to Firestore
document.addEventListener('DOMContentLoaded', function() {
  // Check if we need to run migration
  const migrationRun = localStorage.getItem('roleMigrationRun');
  if (migrationRun === 'true') return;
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');
  
  if (isLoggedIn === 'true' && userEmail && userRole) {
    // User is logged in with old method, migrate their role to Firestore
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      const db = firebase.firestore && firebase.firestore();
      
      if (!db) {
        console.error('Firestore is not available for migration');
        return;
      }
      
      // Check if user already has a role in Firestore
      db.collection('users').doc(currentUser.uid).get()
        .then((doc) => {
          if (!doc.exists) {
            // User doesn't have a role in Firestore, add it
            return db.collection('users').doc(currentUser.uid).set({
              email: userEmail,
              role: userRole,
              createdAt: new Date(),
              migratedAt: new Date()
            });
          }
        })
        .then(() => {
          // Mark migration as complete
          localStorage.setItem('roleMigrationRun', 'true');
          localStorage.setItem('userId', currentUser.uid);
          console.log('User role migrated to Firestore');
        })
        .catch((error) => {
          console.error('Error migrating user role:', error);
        });
    }
  }
});