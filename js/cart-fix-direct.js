// Direct fix for cart navigation - highest priority
(function() {
  // Function to fix cart links
  function fixCartLinks() {
    // Find all cart links
    const cartLinks = document.querySelectorAll('a.cart');
    console.log('Found cart links:', cartLinks.length);
    
    // Process each link
    cartLinks.forEach(function(link) {
      // Force the href attribute
      link.setAttribute('href', 'cart.html');
      
      // Remove all existing event listeners by cloning
      const newLink = link.cloneNode(true);
      if (link.parentNode) {
        link.parentNode.replaceChild(newLink, link);
      }
      
      // Add direct click handler
      newLink.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('Cart link clicked, navigating to cart.html');
        window.location.href = 'cart.html';
      }, true);
    });
  }
  
  // Run immediately if possible
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    fixCartLinks();
  }
  
  // Also run when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', fixCartLinks);
  
  // Run again after a short delay to catch any dynamically added links
  setTimeout(fixCartLinks, 500);
})();