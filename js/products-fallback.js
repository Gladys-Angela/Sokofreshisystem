// Fallback products script with static data
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the products page
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // Get filter elements
  const categoryFilter = document.getElementById('category-filter');
  const vendorFilter = document.getElementById('vendor-filter');
  const sortFilter = document.getElementById('sort-filter');
  
  // Sample products data
  const sampleProducts = [
    {
      id: 'product1',
      name: 'Fresh Apples',
      price: '150',
      quantity: '1 KG',
      imageUrl: 'images/apple.jpg',
      category: 'Fruits',
      vendorId: 'vendor1',
      vendorName: 'Fresh Farms'
    },
    {
      id: 'product2',
      name: 'Organic Tomatoes',
      price: '120',
      quantity: '1 KG',
      imageUrl: 'images/tomato.png',
      category: 'Vegetables',
      vendorId: 'vendor2',
      vendorName: 'Organic Greens'
    },
    {
      id: 'product3',
      name: 'Ripe Mangoes',
      price: '350',
      quantity: '1 KG',
      imageUrl: 'images/mango.jpg',
      category: 'Fruits',
      vendorId: 'vendor1',
      vendorName: 'Fresh Farms'
    },
    {
      id: 'product4',
      name: 'Fresh Potatoes',
      price: '90',
      quantity: '1 KG',
      imageUrl: 'images/potato.jpg',
      category: 'Vegetables',
      vendorId: 'vendor2',
      vendorName: 'Organic Greens'
    },
    {
      id: 'product5',
      name: 'Juicy Oranges',
      price: '180',
      quantity: '1 KG',
      imageUrl: 'images/orange.jpg',
      category: 'Fruits',
      vendorId: 'vendor3',
      vendorName: 'Citrus Farms'
    },
    {
      id: 'product6',
      name: 'Fresh Onions',
      price: '100',
      quantity: '1 KG',
      imageUrl: 'images/onion.jpg',
      category: 'Vegetables',
      vendorId: 'vendor1',
      vendorName: 'Fresh Farms'
    },
    {
      id: 'product7',
      name: 'Fresh Carrots',
      price: '110',
      quantity: '1 KG',
      imageUrl: 'images/carrot.jpg',
      category: 'Vegetables',
      vendorId: 'vendor3',
      vendorName: 'Citrus Farms'
    },
    {
      id: 'product8',
      name: 'Lemons',
      price: '80',
      quantity: '1 KG',
      imageUrl: 'images/lemon.jpg',
      category: 'Fruits',
      vendorId: 'vendor2',
      vendorName: 'Organic Greens'
    }
  ];
  
  // Sample vendors data
  const sampleVendors = [
    { id: 'vendor1', name: 'Fresh Farms' },
    { id: 'vendor2', name: 'Organic Greens' },
    { id: 'vendor3', name: 'Citrus Farms' }
  ];
  
  // Load products when page loads
  loadProducts();
  
  // Add event listeners to filters
  if (categoryFilter) categoryFilter.addEventListener('change', loadProducts);
  if (vendorFilter) vendorFilter.addEventListener('change', loadProducts);
  if (sortFilter) sortFilter.addEventListener('change', loadProducts);
  
  // Populate vendor filter
  populateVendorFilter();
  
  function populateVendorFilter() {
    if (vendorFilter) {
      vendorFilter.innerHTML = '<option value="">All Vendors</option>';
      sampleVendors.forEach(vendor => {
        const option = document.createElement('option');
        option.value = vendor.id;
        option.textContent = vendor.name;
        vendorFilter.appendChild(option);
      });
    }
  }
  
  // Function to load products
  function loadProducts() {
    // Show loading state
    productContainer.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
      // Get filter values
      const categoryValue = categoryFilter ? categoryFilter.value : '';
      const vendorValue = vendorFilter ? vendorFilter.value : '';
      const sortValue = sortFilter ? sortFilter.value : 'default';
      
      // Filter products
      let filteredProducts = [...sampleProducts];
      
      if (categoryValue) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
      }
      
      if (vendorValue) {
        filteredProducts = filteredProducts.filter(product => product.vendorId === vendorValue);
      }
      
      // Apply sorting
      switch (sortValue) {
        case 'price-low':
          filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        default:
          // Default sorting (no change)
          break;
      }
      
      // Display products
      displayProducts(filteredProducts);
    }, 500); // Simulate network delay
  }
  
  // Function to display products
  function displayProducts(products) {
    // Clear container
    productContainer.innerHTML = '';
    
    if (products.length === 0) {
      productContainer.innerHTML = `
        <div class="no-products-container">
          <div class="no-products-icon"><i class="fas fa-box-open"></i></div>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your criteria.</p>
        </div>
      `;
      return;
    }
    
    // Display each product
    products.forEach(product => {
      const productBox = document.createElement('div');
      productBox.className = 'product-box';
      
      productBox.innerHTML = `
        <div class="vendor-badge">${product.vendorName}</div>
        <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='images/default-product.png'">
        <strong>${product.name}</strong>
        <span class="quantity">${product.quantity}</span>
        <div class="vendor-info">
          <i class="fas fa-store"></i> ${product.vendorName}
        </div>
        <span class="price">Ksh${product.price}</span>
        <div class="product-buttons">
          <a href="#" class="cart-btn" data-product-id="${product.id}" data-vendor-id="${product.vendorId}">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn" data-product-id="${product.id}">
            <i class="far fa-heart"></i>
          </a>
        </div>
      `;
      
      productContainer.appendChild(productBox);
      
      // Add event listener to cart button
      const cartBtn = productBox.querySelector('.cart-btn');
      cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(product);
      });
      
      // Add event listener to like button
      const likeBtn = productBox.querySelector('.like-btn');
      likeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleWishlist(product);
      });
    });
  }
  
  // Function to add product to cart
  function addToCart(product) {
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.imageUrl,
      vendorId: product.vendorId,
      vendorName: product.vendorName,
      count: 1,
      userId: 'guest'
    };
    
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
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
  }
  
  // Function to toggle wishlist
  function toggleWishlist(product) {
    // Get existing wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already exists in wishlist
    const existingProductIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // Remove from wishlist if exists
      wishlist.splice(existingProductIndex, 1);
      alert(`${product.name} removed from wishlist!`);
    } else {
      // Add to wishlist if not exists
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        vendorId: product.vendorId,
        vendorName: product.vendorName,
        userId: 'guest',
        dateAdded: new Date().toISOString()
      });
      alert(`${product.name} added to wishlist!`);
    }
    
    // Save wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount();
  }
  
  // Function to update cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.count, 0);
    
    const cartCountElements = document.querySelectorAll('.cart span');
    cartCountElements.forEach(element => {
      element.textContent = cartCount;
    });
  }
  
  // Function to update wishlist count
  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const wishlistCountElements = document.querySelectorAll('.like span');
    wishlistCountElements.forEach(element => {
      element.textContent = wishlist.length;
    });
  }
  
  // Update counts on page load
  updateCartCount();
  updateWishlistCount();
});