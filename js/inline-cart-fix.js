// Inline script to fix cart links - add to HTML directly
document.addEventListener('DOMContentLoaded', function() {
  // Fix all cart links
  document.querySelectorAll('a.cart').forEach(function(link) {
    // Set direct href
    link.href = 'cart.html';
    
    // Add direct click handler
    link.onclick = function(e) {
      e.preventDefault();
      window.location.href = 'cart.html';
      return false;
    };
  });
});