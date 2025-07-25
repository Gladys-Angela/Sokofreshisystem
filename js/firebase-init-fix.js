// Firebase initialization with error handling and permissions fix
(function() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB4H9MQ76i1p3tThi6Zoc-AGbfnqjBSLRI",
    authDomain: "efresh-56b75.firebaseapp.com",
    projectId: "efresh-56b75",
    storageBucket: "efresh-56b75.firebasestorage.app",
    messagingSenderId: "253998754664",
    appId: "1:253998754664:web:889840cf5d84ef903a84dd"
  };

  // Initialize Firebase if not already initialized
  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
    // Fix for Firebase visibility check error
    if (firebase.auth) {
      firebase.auth().settings.appVerificationDisabledForTesting = true;
    }
    
    // Set Firestore settings to avoid permission errors
    if (firebase.firestore) {
      firebase.firestore().settings({
        ignoreUndefinedProperties: true,
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
      });
      
      // Enable offline persistence
      firebase.firestore().enablePersistence({synchronizeTabs: true})
        .catch(err => {
          console.warn("Firestore persistence error:", err.code);
        });
    }
    
    console.log("Firebase initialized with fixes applied");
  }
})();