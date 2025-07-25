// Fix for cart button functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to all cart buttons
  function setupCartButtons() {
    document.querySelectorAll('.cart-btn').forEach(button => {
      // Remove any existing event listeners to prevent duplicates
      button.removeEventListener('click', handleCartButtonClick);
      // Add new event listener
      button.addEventListener('click', handleCartButtonClick);
    });
  }

  // Handle cart button click
  function handleCartButtonClick(e) {
    e.preventDefault();
    
    // Get product details from parent product box
    const productBox = this.closest('.product-box');
    if (!productBox) return;
    
    // Get product ID from data attribute
    const productId = this.getAttribute('data-product-id');
    if (!productId) {
      console.error('Product ID not found on cart button');
      return;
    }
    
    // Create product object
    const product = {
      id: productId,
      name: productBox.querySelector('strong').textContent,
      price: productBox.querySelector('.price').textContent.replace('Ksh', '').trim(),
      quantity: productBox.querySelector('.quantity')?.textContent || '1 KG',
      imageUrl: productBox.querySelector('img').src,
      vendorId: this.getAttribute('data-vendor-id') || 'unknown'
    };
    
    // Call the global addToCart function if it exists
    if (typeof window.addToCart === 'function') {
      window.addToCart(product);
    } else {
      // Fallback if addToCart function doesn't exist
      console.error('addToCart function not found');
      alert('Sorry, there was a problem adding this item to your cart. Please try again later.');
    }
  }
  
  // Initial setup
  setupCartButtons();
  
  // Setup a mutation observer to detect when new products are added to the DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        setupCartButtons();
      }
    });
  });
  
  // Start observing product containers
  const productContainers = document.querySelectorAll('.product-container');
  productContainers.forEach(container => {
    observer.observe(container, { childList: true, subtree: true });
  });
});