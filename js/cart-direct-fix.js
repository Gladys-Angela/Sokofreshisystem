// Direct cart fix - no dependencies
document.addEventListener('DOMContentLoaded', function() {
  // Fix all cart links to point to cart-direct.html
  document.querySelectorAll('a.cart').forEach(link => {
    link.href = 'cart-direct.html';
    link.onclick = function(e) {
      e.preventDefault();
      window.location.href = 'cart-direct.html';
      return false;
    };
  });

  // Fix all cart buttons
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.onclick = function(e) {
      e.preventDefault();
      
      // Get product details
      const productBox = this.closest('.product-box');
      if (!productBox) return;
      
      const productId = this.getAttribute('data-product-id') || Date.now().toString();
      const productName = productBox.querySelector('strong').textContent;
      const productPrice = productBox.querySelector('.price').textContent.replace('Ksh', '').trim();
      const productImage = productBox.querySelector('img').src;
      
      // Get cart from localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already exists
      const existingItemIndex = cart.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].count += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          count: 1
        });
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count
      const cartCount = cart.reduce((total, item) => total + item.count, 0);
      document.querySelectorAll('.cart span').forEach(span => {
        span.textContent = cartCount;
      });
      
      // Show confirmation
      alert(productName + ' added to cart!');
    };
  });
  
  // Update cart count on page load
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cart.reduce((total, item) => total + item.count, 0);
  document.querySelectorAll('.cart span').forEach(span => {
    span.textContent = cartCount;
  });
});