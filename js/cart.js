// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();

  // Add event listeners to all cart buttons
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if user is logged in
      const user = firebase.auth().currentUser;
      if (!user) {
        if (confirm('Please log in to add items to your cart. Go to login page?')) {
          window.location.href = 'login.html';
        }
        return;
      }
      
      // Get product details from parent product box
      const productBox = this.closest('.product-box');
      const productName = productBox.querySelector('strong').textContent;
      const productPrice = productBox.querySelector('.price').textContent.replace('Ksh', '');
      const productQuantity = productBox.querySelector('.quantity').textContent;
      const productImage = productBox.querySelector('img').src;
      
      // Create product object
      const product = {
        id: Date.now().toString(),
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        image: productImage,
        count: 1,
        userId: user.uid
      };
      
      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex(item => 
        item.name === productName && item.userId === user.uid
      );
      
      if (existingProductIndex > -1) {
        // Increment count if product exists
        cart[existingProductIndex].count += 1;
      } else {
        // Add new product to cart
        cart.push(product);
      }
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Show confirmation
      alert(`${productName} added to cart!`);
    });
  });
  
  // Function to update cart count
  function updateCartCount() {
    // Only count items for current user
    const user = firebase.auth().currentUser;
    let cartCount = 0;
    
    if (user) {
      cartCount = cart
        .filter(item => item.userId === user.uid)
        .reduce((total, item) => total + item.count, 0);
    }
    
    const cartCountElements = document.querySelectorAll('.cart span');
    cartCountElements.forEach(element => {
      element.textContent = cartCount;
    });
  }
  
  // Update cart count when auth state changes
  firebase.auth().onAuthStateChanged(function(user) {
    updateCartCount();
  });
});