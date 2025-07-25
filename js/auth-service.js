// Authentication service for Soko freshi
const AuthService = {
  // Store user data in localStorage with role
  storeUserData: function(email, uid, role) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', uid);
    localStorage.setItem('lastLoginTime', new Date().getTime());
  },

  // Check if user is logged in
  isLoggedIn: function() {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  // Get user role
  getUserRole: function() {
    return localStorage.getItem('userRole');
  },

  // Logout user
  logout: function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastLoginTime');
    return firebase.auth().signOut();
  },

  // Register a new user
  register: async function(email, password, role, userData = {}) {
    try {
      // Create user with Firebase Auth
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Store role in custom claims (this requires a server function, but we'll simulate it)
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      
      // Add role and other data
      const userDataWithRole = {
        ...userData,
        email,
        role,
        createdAt: new Date()
      };
      
      await userRef.set(userDataWithRole);
      
      // Store user data locally
      this.storeUserData(email, user.uid, role);
      
      return { success: true, user };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error };
    }
  },

  // Login user with role validation
  login: async function(email, password, requestedRole) {
    try {
      // Sign in with Firebase Auth
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore to check role
      const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
      
      if (!userDoc.exists) {
        throw new Error('User data not found');
      }
      
      const userData = userDoc.data();
      const actualRole = userData.role;
      
      // Check if requested role matches actual role
      if (requestedRole !== actualRole) {
        // Role mismatch
        await firebase.auth().signOut(); // Sign out
        return {
          success: false,
          error: {
            code: 'auth/role-mismatch',
            message: `This account is registered as a ${actualRole}. Please use the ${actualRole} login option.`
          }
        };
      }
      
      // Store user data locally
      this.storeUserData(email, user.uid, actualRole);
      
      return { success: true, user, role: actualRole };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  }
};