// Direct cart navigation fix - highest priority
(function() {
  // Run immediately
  fixCartLinks();
  
  // Also run when DOM is loaded
  document.addEventListener('DOMContentLoaded', fixCartLinks);
  
  // Function to fix cart links
  function fixCartLinks() {
    // Find all cart links
    const cartLinks = document.querySelectorAll('a.cart');
    console.log('Found cart links:', cartLinks.length);
    
    // Process each link
    cartLinks.forEach(function(link) {
      // Set direct href attribute
      link.setAttribute('href', 'cart.html');
      
      // Add direct click handler
      link.onclick = function(e) {
        e.preventDefault();
        console.log('Cart link clicked, navigating to cart.html');
        window.location.href = 'cart.html';
        return false;
      };
    });
  }
})();