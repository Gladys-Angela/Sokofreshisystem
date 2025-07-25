// Shared products functionality for all pages
function loadProductsFromLocalStorage(containerId, limit = 0, categoryFilter = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Get products from localStorage
  let products = JSON.parse(localStorage.getItem('products')) || [];
  
  // If no products in localStorage, use default products
  if (products.length === 0) {
    products = [
      {
        id: 'prod_1',
        name: 'Fresh Apples',
        category: 'Fruits',
        vendor: 'Fruit Paradise',
        price: '150',
        quantity: 'kg',
        image: 'images/apple.jpg'
      },
      {
        id: 'prod_2',
        name: 'Fresh Tomatoes',
        category: 'Vegetables',
        vendor: 'Green Grocers',
        price: '120',
        quantity: 'kg',
        image: 'images/tomato.png'
      },
      {
        id: 'prod_3',
        name: 'Fresh Oranges',
        category: 'Fruits',
        vendor: 'Fruit Paradise',
        price: '180',
        quantity: 'kg',
        image: 'images/orange.jpg'
      },
      {
        id: 'prod_4',
        name: 'Fresh Tilapia',
        category: 'Fish & Meat',
        vendor: 'Meat Masters',
        price: '450',
        quantity: 'kg',
        image: 'images/fish.png'
      },
      {
        id: 'prod_5',
        name: 'Mixed Spices',
        category: 'Spices',
        vendor: 'Organic Delights',
        price: '200',
        quantity: '100g',
        image: 'images/spices.jpeg'
      },
      {
        id: 'prod_6',
        name: 'Fresh Vegetables',
        category: 'Vegetables',
        vendor: 'Green Grocers',
        price: '100',
        quantity: 'kg',
        image: 'images/vegetable.png'
      }
    ];
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Filter by category if needed
  if (categoryFilter) {
    products = products.filter(p => p.category === categoryFilter);
  }
  
  // Limit number of products if specified
  if (limit > 0 && products.length > limit) {
    products = products.slice(0, limit);
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Add products to container
  products.forEach(product => {
    const productBox = document.createElement('div');
    productBox.className = 'product-box';
    
    productBox.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <strong>${product.name}</strong>
      <span class="quantity">${product.quantity}</span>
      <span class="price">Ksh${product.price}</span>
      <a href="#" class="cart-btn" data-product-id="${product.id}">
        <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
      </a>
      <a href="#" class="like-btn" data-product-id="${product.id}">
        <i class="far fa-heart"></i>
      </a>
    `;
    
    container.appendChild(productBox);
  });
  
  // Setup cart buttons
  setupCartButtons();
}

// Setup cart buttons
function setupCartButtons() {
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.onclick = function(e) {
      e.preventDefault();
      
      // Get product details
      const productBox = this.closest('.product-box');
      if (!productBox) return;
      
      const productId = this.getAttribute('data-product-id');
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the products page
  if (window.location.pathname.includes('products.html')) {
    // Get category from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    // Load products with category filter
    loadProductsFromLocalStorage('product-container', 0, categoryFilter);
    
    // Update page title to show category
    if (categoryFilter) {
      const categoryTitle = document.querySelector('.product-heading h3');
      if (categoryTitle) {
        categoryTitle.textContent = categoryFilter;
      }
    }
  }
  
  // Check if we're on the index page
  if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    // Load featured products (limit to 4)
    loadProductsFromLocalStorage('featured-products', 4);
  }
});