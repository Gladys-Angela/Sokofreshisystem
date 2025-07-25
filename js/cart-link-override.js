// Override all cart links with direct navigation
(function() {
  // Function to fix cart links
  function fixCartLinks() {
    // Target all cart links
    const cartLinks = document.querySelectorAll('a.cart');
    
    // Process each link
    cartLinks.forEach(function(link) {
      // Remove all existing event listeners by cloning
      const newLink = link.cloneNode(true);
      if (link.parentNode) {
        link.parentNode.replaceChild(newLink, link);
      }
      
      // Set direct href
      newLink.href = 'cart.html';
      
      // Add direct click handler that takes precedence
      newLink.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = 'cart.html';
      }, true);
    });
    
    console.log('Cart links fixed: ' + cartLinks.length);
  }
  
  // Run immediately if DOM is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    fixCartLinks();
  } else {
    // Otherwise wait for DOM to load
    document.addEventListener('DOMContentLoaded', fixCartLinks);
  }
  
  // Also run after a short delay to ensure all other scripts have run
  setTimeout(fixCartLinks, 500);
})();