const firebaseConfig = {
  apiKey: "AIzaSyB4H9MQ76i1p3tThi6Zoc-AGbfnqjBSLRI",
  authDomain: "efresh-56b75.firebaseapp.com",
  projectId: "efresh-56b75",
  storageBucket: "efresh-56b75.appspot.com",
  messagingSenderId: "253998754664",
  appId: "1:253998754664:web:889840cf5d84ef903a84dd"
};

// Initialize Firebase with custom settings
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
  // Apply auth settings immediately
  try {
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    console.log("Firebase auth verification disabled for testing");
  } catch (e) {
    console.warn("Could not disable app verification:", e);
  }
}

// Get Firebase services with performance optimizations
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence for Firestore
db.enablePersistence({ synchronizeTabs: true })
  .catch(err => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab
      console.log('Persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // Browser doesn't support persistence
      console.log('Persistence not supported by browser');
    }
  });

// Performance optimizations for Firestore
db.settings({
  cacheSizeBytes: 5000000, // Increase cache size to 5MB
  ignoreUndefinedProperties: true
});

// Helper function to check user role
function checkUserRole(requiredRole) {
  return new Promise((resolve, reject) => {
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      reject('No user is signed in');
      return;
    }
    
    db.collection('users').doc(currentUser.uid).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.role === requiredRole) {
            resolve(userData);
          } else {
            reject(`Access denied. This page is for ${requiredRole}s only.`);
          }
        } else {
          reject('User profile not found');
        }
      })
      .catch((error) => {
        reject(`Error checking user role: ${error.message}`);
      });
  });
}