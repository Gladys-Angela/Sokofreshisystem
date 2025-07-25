// Fix for cart navigation
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to all cart navigation links
  const cartLinks = document.querySelectorAll('a.cart');
  
  cartLinks.forEach(link => {
    // Remove default event listeners by cloning
    const clonedLink = link.cloneNode(true);
    link.parentNode.replaceChild(clonedLink, link);
    
    // Add direct click handler
    clonedLink.onclick = function(e) {
      e.preventDefault();
      window.location.href = 'cart.html';
      return false;
    };
  });
});