// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log("Products page script loaded");
  
  // Get the products container
  const productsContainer = document.querySelector('.product-container');
  if (!productsContainer) return;
  
  // Get category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category');
  
  // Show loading state
  productsContainer.innerHTML = '<p class="loading-text">Loading products...</p>';
  
  // Load products from Firestore
  if (typeof firebase !== 'undefined' && firebase.firestore) {
    const db = firebase.firestore();
    let query = db.collection('products');
    
    // Apply category filter if present
    if (categoryFilter) {
      query = query.where('category', '==', categoryFilter);
      // Update page title to show category
      const categoryTitle = document.querySelector('.product-heading h3');
      if (categoryTitle) {
        categoryTitle.textContent = categoryFilter;
      }
    }
    
    // Get products
    query.get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        productsContainer.innerHTML = '<p>No products found in this category.</p>';
        return;
      }
      
      // Clear container
      productsContainer.innerHTML = '';
      
      // Add products to page
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        
        const productBox = document.createElement('div');
        productBox.className = 'product-box';
        
        productBox.innerHTML = `
          <img src="${product.imageUrl || 'images/default-product.jpg'}" alt="${product.name}">
          <strong>${product.name}</strong>
          <span class="quantity">${product.quantity || '1 KG'}</span>
          <span class="price">Ksh${product.price}</span>
          <a href="#" class="cart-btn" data-product-id="${product.id}" data-vendor-id="${product.vendorId || 'unknown'}">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn" data-product-id="${product.id}">
            <i class="far fa-heart"></i>
          </a>
        `;
        
        productsContainer.appendChild(productBox);
      });
      
      // Setup cart buttons
      if (typeof window.setupCartButtons === 'function') {
        window.setupCartButtons();
      }
      
      // Dispatch custom event that products are loaded
      window.dispatchEvent(new CustomEvent('productsLoaded'));
      
    }).catch((error) => {
      console.error("Error getting products:", error);
      productsContainer.innerHTML = `
        <p>Sorry, there was a problem loading products. Please try again later.</p>
        <p>Error: ${error.message}</p>
      `;
      
      // Load fallback products
      loadFallbackProducts();
    });
  } else {
    console.error("Firebase not available");
    productsContainer.innerHTML = '<p>Sorry, there was a problem loading products. Please try again later.</p>';
    
    // Load fallback products
    loadFallbackProducts();
  }
  
  // Function to load fallback products
  function loadFallbackProducts() {
    const fallbackProducts = [
      {
        id: 'apple1',
        name: 'Apple',
        price: '150',
        quantity: '1 KG',
        imageUrl: 'images/apple.jpg'
      },
      {
        id: 'orange1',
        name: 'Orange',
        price: '180',
        quantity: '1 KG',
        imageUrl: 'images/orange.jpg'
      },
      {
        id: 'tomato1',
        name: 'Tomato',
        price: '120',
        quantity: '1 KG',
        imageUrl: 'images/tomato.png'
      },
      {
        id: 'potato1',
        name: 'Potato',
        price: '100',
        quantity: '1 KG',
        imageUrl: 'images/potato.jpg'
      }
    ];
    
    // Filter by category if needed
    let filteredProducts = fallbackProducts;
    if (categoryFilter) {
      if (categoryFilter === 'Fruits') {
        filteredProducts = fallbackProducts.filter(p => p.name === 'Apple' || p.name === 'Orange');
      } else if (categoryFilter === 'Vegetables') {
        filteredProducts = fallbackProducts.filter(p => p.name === 'Tomato' || p.name === 'Potato');
      }
    }
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Add fallback products
    filteredProducts.forEach(product => {
      const productBox = document.createElement('div');
      productBox.className = 'product-box';
      
      productBox.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
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
      
      productsContainer.appendChild(productBox);
    });
    
    // Setup cart buttons
    if (typeof window.setupCartButtons === 'function') {
      window.setupCartButtons();
    }
    
    // Dispatch custom event that products are loaded
    window.dispatchEvent(new CustomEvent('productsLoaded'));
  }
});