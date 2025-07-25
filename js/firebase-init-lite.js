// Simplified Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyB4H9MQ76i1p3tThi6Zoc-AGbfnqjBSLRI",
  authDomain: "efresh-56b75.firebaseapp.com",
  projectId: "efresh-56b75",
  storageBucket: "efresh-56b75.appspot.com",
  messagingSenderId: "253998754664",
  appId: "1:253998754664:web:889840cf5d84ef903a84dd"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Basic settings for Firestore
db.settings({
  ignoreUndefinedProperties: true
});