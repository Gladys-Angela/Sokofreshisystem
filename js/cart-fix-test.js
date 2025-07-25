// Cart functionality test script
document.addEventListener('DOMContentLoaded', function() {
  console.log("Cart test script loaded");
  
  // Test if cart functionality is working
  function testCartFunctionality() {
    console.log("Testing cart functionality...");
    
    // Check if cart-unified-fix.js is loaded
    if (typeof window.addToCart !== 'function') {
      console.error("addToCart function not found - cart-unified-fix.js may not be loaded correctly");
      return false;
    }
    
    // Check if setupCartButtons function is available
    if (typeof window.setupCartButtons !== 'function') {
      console.error("setupCartButtons function not found - cart-unified-fix.js may not be loaded correctly");
      return false;
    }
    
    // Check if localStorage is available
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      console.log("localStorage is working correctly");
    } catch (e) {
      console.error("localStorage is not available:", e);
      return false;
    }
    
    // Check if cart exists in localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Current cart:", cart);
    
    // Check if Firebase is initialized
    if (typeof firebase === 'undefined') {
      console.error("Firebase is not initialized");
      return false;
    }
    
    // Check if Firebase Auth is available
    if (typeof firebase.auth !== 'function') {
      console.error("Firebase Auth is not available");
      return false;
    }
    
    // Check if Firebase Firestore is available
    if (typeof firebase.firestore !== 'function') {
      console.error("Firebase Firestore is not available");
      return false;
    }
    
    console.log("All cart dependencies are available");
    return true;
  }
  
  // Run the test
  const testResult = testCartFunctionality();
  console.log("Cart functionality test result:", testResult ? "PASSED" : "FAILED");
  
  // Add a test button to the page
  const testButton = document.createElement('button');
  testButton.textContent = 'Test Add to Cart';
  testButton.style.position = 'fixed';
  testButton.style.bottom = '20px';
  testButton.style.right = '20px';
  testButton.style.zIndex = '9999';
  testButton.style.padding = '10px 15px';
  testButton.style.backgroundColor = '#00b761';
  testButton.style.color = 'white';
  testButton.style.border = 'none';
  testButton.style.borderRadius = '5px';
  testButton.style.cursor = 'pointer';
  
  testButton.addEventListener('click', function() {
    // Create a test product
    const testProduct = {
      id: 'test-' + Date.now(),
      name: 'Test Product',
      price: '100',
      quantity: '1 KG',
      imageUrl: 'images/apple.jpg',
      vendorId: 'test-vendor'
    };
    
    // Try to add to cart
    try {
      window.addToCart(testProduct);
      console.log("Test product added to cart successfully");
    } catch (e) {
      console.error("Error adding test product to cart:", e);
      alert("Error adding test product to cart: " + e.message);
    }
  });
  
  document.body.appendChild(testButton);
});