// Add this script to debug Firebase connection and product loading
document.addEventListener('DOMContentLoaded', function() {
  console.log('Debug script loaded');
  
  // Check Firebase initialization
  if (typeof firebase !== 'undefined') {
    console.log('Firebase is defined');
    
    // Check Firestore
    if (firebase.firestore) {
      console.log('Firestore is available');
      
      // Test connection by getting a single document
      firebase.firestore().collection('products').limit(1).get()
        .then(snapshot => {
          console.log('Firestore connection successful');
          console.log('Products found:', !snapshot.empty);
          if (!snapshot.empty) {
            console.log('Sample product:', snapshot.docs[0].data());
          }
        })
        .catch(error => {
          console.error('Firestore connection error:', error);
        });
    } else {
      console.error('Firestore is not available');
    }
    
    // Check Auth
    if (firebase.auth) {
      console.log('Auth is available');
      console.log('Current user:', firebase.auth().currentUser ? 'Logged in' : 'Not logged in');
    } else {
      console.error('Auth is not available');
    }
  } else {
    console.error('Firebase is not defined');
  }
});