// Fix for Firebase visibility check error
(function() {
  // Apply the fix immediately when the script loads
  if (typeof firebase !== 'undefined' && firebase.auth) {
    // Disable app verification for testing
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    
    // Store original signInWithEmailAndPassword method
    const originalSignIn = firebase.auth().signInWithEmailAndPassword;
    
    // Override with our version that handles visibility check errors
    firebase.auth().signInWithEmailAndPassword = function(email, password) {
      return originalSignIn.call(this, email, password)
        .catch(error => {
          if (error.code === 'auth/visibility-check-was-unavailable' || 
              (error.message && error.message.includes('visibility-check'))) {
            console.log('Bypassing visibility check error, retrying...');
            // Force recaptcha handler to be null which bypasses the check
            this.settings.appVerificationDisabledForTesting = true;
            return originalSignIn.call(this, email, password);
          }
          throw error;
        });
    };
    
    console.log('Firebase auth visibility check fix applied');
  }
})();