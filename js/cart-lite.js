// Simplified cart functionality
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
      id: product.id || Date.now().toString(),
      name: product.name,
      price: product.price.toString().replace('Ksh', '').trim(),
      quantity: product.quantity || '1 KG',
      image: product.imageUrl || product.image || 'images/default-product.png',
      count: 1,
      userId: user.uid
    };
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => 
      item.id === cartItem.id && item.userId === user.uid
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
  
  // Setup cart buttons
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product details from parent product box
      const productBox = this.closest('.product-box');
      if (!productBox) return;
      
      // Get product ID from data attribute or generate one
      const productId = this.getAttribute('data-product-id') || Date.now().toString();
      
      try {
        // Create product object
        const product = {
          id: productId,
          name: productBox.querySelector('strong').textContent,
          price: productBox.querySelector('.price').textContent.replace('Ksh', '').trim(),
          quantity: productBox.querySelector('.quantity')?.textContent || '1 KG',
          imageUrl: productBox.querySelector('img').src
        };
        
        // Add to cart
        window.addToCart(product);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    });
  });
  
  // Fix cart links
  document.querySelectorAll('a.cart').forEach(link => {
    link.setAttribute('href', 'cart.html');
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  });
  
  // Update cart count on page load
  updateCartCount();
  
  // Update cart count when auth state changes
  firebase.auth().onAuthStateChanged(function(user) {
    updateCartCount();
  });
});