// Display products on the main website
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page that displays products
  const productContainer = document.getElementById('featured-products');
  if (!productContainer) return;
  
  // Get products from localStorage or use default products
  const products = JSON.parse(localStorage.getItem('products'));
  if (!products || products.length === 0) return;
  
  // Clear existing products
  productContainer.innerHTML = '';
  
  // Display products (limit to 6 for featured products)
  const displayProducts = products.slice(0, 6);
  
  displayProducts.forEach(product => {
    const productBox = document.createElement('div');
    productBox.className = 'product-box';
    
    productBox.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <strong>${product.name}</strong>
      <span class="quantity">${product.quantity}</span>
      <span class="price">Ksh${product.price}</span>
      <a href="#" class="cart-btn" data-product-id="${product.id}">
        <i class="fas fa-shopping-bag"></i> <span>Add to Cart</span>
      </a>
      <a href="#" class="like-btn">
        <i class="far fa-heart"></i>
      </a>
    `;
    
    productContainer.appendChild(productBox);
  });
  
  // Add to cart functionality
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const productId = this.getAttribute('data-product-id');
      const product = products.find(p => p.id === productId);
      
      if (product) {
        // Add to cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
          // Increase quantity
          existingItem.quantity += 1;
        } else {
          // Add new item
          cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          });
        }
        
        // Save cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show confirmation
        alert(`${product.name} added to cart!`);
      }
    });
  });
  
  // Update cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('.cart span').forEach(span => {
      span.textContent = totalItems;
    });
  }
});