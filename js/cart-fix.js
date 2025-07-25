// Fixed cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Function to add product to cart
  window.addToCart = function(product) {
    // Check if user is logged in
    const user = firebase.auth().currentUser;
    if (!user) {
      if (confirm('Please log in to add items to your cart. Go to login page?')) {
        window.location.href = 'login.html';
      }
      return;
    }
    
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || '1 KG',
      image: product.imageUrl || 'images/default-product.png',
      count: 1,
      userId: user.uid
    };
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => 
      item.id === product.id && item.userId === user.uid
    );
    
    if (existingProductIndex > -1) {
      // Increment count if product exists
      cart[existingProductIndex].count += 1;
    } else {
      // Add new product to cart
      cart.push(cartItem);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
  };
  
  // Function to update cart count
  function updateCartCount() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const userCart = cart.filter(item => item.userId === user.uid);
    const cartCount = userCart.reduce((total, item) => total + item.count, 0);
    
    const cartCountElements = document.querySelectorAll('.cart span');
    cartCountElements.forEach(element => {
      element.textContent = cartCount;
    });
  }
  
  // Update cart count on page load
  updateCartCount();
  
  // Update cart count when auth state changes
  firebase.auth().onAuthStateChanged(updateCartCount);
});