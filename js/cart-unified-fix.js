// Unified cart functionality fix
document.addEventListener('DOMContentLoaded', function() {
  console.log("Cart unified fix loaded");
  
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Make setupCartButtons available globally
  window.setupCartButtons = setupCartButtons;
  
  // Function to add product to cart
  window.addToCart = function(product) {
    console.log("Adding to cart:", product);
    
    // Check if user is logged in
    const user = firebase.auth().currentUser;
    if (!user) {
      if (confirm('Please log in to add items to your cart. Go to login page?')) {
        window.location.href = 'login.html';
      }
      return;
    }
    
    // Create cart item with all required fields
    const cartItem = {
      id: product.id || Date.now().toString(),
      name: product.name,
      price: product.price.toString().replace('Ksh', '').trim(),
      quantity: product.quantity || '1 KG',
      image: product.imageUrl || product.image || 'images/default-product.png',
      count: 1,
      userId: user.uid,
      vendorId: product.vendorId || 'unknown'
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
    
    // Get cart from localStorage (it might have been updated elsewhere)
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const userCart = currentCart.filter(item => item.userId === user.uid);
    const cartCount = userCart.reduce((total, item) => total + item.count, 0);
    
    const cartCountElements = document.querySelectorAll('.cart span');
    cartCountElements.forEach(element => {
      element.textContent = cartCount;
    });
  }
  
  // Add event listeners to all cart buttons
  function setupCartButtons() {
    document.querySelectorAll('.cart-btn').forEach(button => {
      // Remove any existing event listeners to prevent duplicates
      const newButton = button.cloneNode(true);
      if (button.parentNode) {
        button.parentNode.replaceChild(newButton, button);
      }
      
      // Add new event listener
      newButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get product details from parent product box
        const productBox = this.closest('.product-box');
        if (!productBox) {
          console.error('Product box not found');
          return;
        }
        
        // Get product ID from data attribute or generate one
        const productId = this.getAttribute('data-product-id') || Date.now().toString();
        
        try {
          // Create product object
          const product = {
            id: productId,
            name: productBox.querySelector('strong').textContent,
            price: productBox.querySelector('.price').textContent.replace('Ksh', '').trim(),
            quantity: productBox.querySelector('.quantity')?.textContent || '1 KG',
            imageUrl: productBox.querySelector('img').src,
            vendorId: this.getAttribute('data-vendor-id') || 'unknown'
          };
          
          // Call the global addToCart function
          window.addToCart(product);
        } catch (error) {
          console.error("Error adding to cart:", error);
          alert("There was a problem adding this item to your cart. Please try again.");
        }
      });
    });
    
    console.log("Cart buttons setup complete");
  }
  
  // Fix all cart navigation links
  function fixCartLinks() {
    const cartLinks = document.querySelectorAll('a.cart');
    
    cartLinks.forEach(link => {
      // Remove all existing event listeners by cloning
      const newLink = link.cloneNode(true);
      if (link.parentNode) {
        link.parentNode.replaceChild(newLink, link);
      }
      
      // Set direct href attribute
      newLink.setAttribute('href', 'cart.html');
      
      // Add direct click handler with highest priority
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Cart link clicked, navigating to cart.html");
        window.location.href = 'cart.html';
      }, true);
    });
    
    console.log('Cart links fixed: ' + cartLinks.length);
  }
  
  // Initial setup
  setupCartButtons();
  fixCartLinks();
  updateCartCount();
  
  // Setup a mutation observer to detect when new products are added to the DOM
  const observer = new MutationObserver(function(mutations) {
    let needsUpdate = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        needsUpdate = true;
      }
    });
    
    if (needsUpdate) {
      setupCartButtons();
      fixCartLinks();
    }
  });
  
  // Start observing product containers
  const productContainers = document.querySelectorAll('.product-container');
  productContainers.forEach(container => {
    observer.observe(container, { childList: true, subtree: true });
  });
  
  // Listen for custom productsLoaded event
  window.addEventListener('productsLoaded', function() {
    setupCartButtons();
    fixCartLinks();
  });
  
  // Update cart count when auth state changes
  firebase.auth().onAuthStateChanged(function(user) {
    updateCartCount();
  });
});