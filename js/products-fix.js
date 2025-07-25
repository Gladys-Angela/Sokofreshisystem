// Fixed products page functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log("Products fix script loaded");
  
  // Get the products container
  const productsContainer = document.getElementById('product-container');
  if (!productsContainer) return;
  
  // Get category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category');
  
  // Show loading state
  productsContainer.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  `;
  
  // Load static products directly
  loadStaticProducts();
  
  function loadStaticProducts() {
    const staticProducts = [
      {
        id: 'apple1',
        name: 'Apple',
        price: '150',
        quantity: '1 KG',
        imageUrl: 'images/apple.jpg',
        category: 'Fruits',
        vendor: 'Fresh Farms'
      },
      {
        id: 'orange1',
        name: 'Orange',
        price: '180',
        quantity: '1 KG',
        imageUrl: 'images/orange.jpg',
        category: 'Fruits',
        vendor: 'Citrus Growers'
      },
      {
        id: 'mango1',
        name: 'Mango',
        price: '350',
        quantity: '1 KG',
        imageUrl: 'images/mango.jpg',
        category: 'Fruits',
        vendor: 'Tropical Fruits'
      },
      {
        id: 'tomato1',
        name: 'Tomato',
        price: '120',
        quantity: '1 KG',
        imageUrl: 'images/tomato.png',
        category: 'Vegetables',
        vendor: 'Garden Fresh'
      },
      {
        id: 'potato1',
        name: 'Potato',
        price: '100',
        quantity: '1 KG',
        imageUrl: 'images/potato.jpg',
        category: 'Vegetables',
        vendor: 'Farm Direct'
      },
      {
        id: 'onion1',
        name: 'Onion',
        price: '90',
        quantity: '1 KG',
        imageUrl: 'images/onion.jpg',
        category: 'Vegetables',
        vendor: 'Garden Fresh'
      }
    ];
    
    // Filter by category if needed
    let filteredProducts = staticProducts;
    if (categoryFilter) {
      filteredProducts = staticProducts.filter(p => p.category === categoryFilter);
      
      // Update page title to show category
      const categoryTitle = document.querySelector('.product-heading h3');
      if (categoryTitle) {
        categoryTitle.textContent = categoryFilter;
      }
    }
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Check if we have products after filtering
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-products-container">
          <div class="no-products-icon"><i class="fas fa-box-open"></i></div>
          <h3>No products found</h3>
          <p>We couldn't find any products in this category.</p>
        </div>
      `;
      return;
    }
    
    // Add products to page
    filteredProducts.forEach(product => {
      const productBox = document.createElement('div');
      productBox.className = 'product-box';
      
      productBox.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <strong>${product.name}</strong>
        <span class="quantity">${product.quantity}</span>
        <span class="price">Ksh${product.price}</span>
        <div class="vendor-info">
          <i class="fas fa-store"></i> ${product.vendor}
        </div>
        <a href="#" class="cart-btn" data-product-id="${product.id}">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </a>
        <a href="#" class="like-btn" data-product-id="${product.id}">
          <i class="far fa-heart"></i>
        </a>
      `;
      
      productsContainer.appendChild(productBox);
    });
    
    // Setup cart buttons
    setupCartButtons();
    
    // Populate vendor filter
    populateVendorFilter(staticProducts);
  }
  
  function setupCartButtons() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-product-id');
        
        // Get product details
        const productBox = this.closest('.product-box');
        const productName = productBox.querySelector('strong').textContent;
        const productPrice = productBox.querySelector('.price').textContent.replace('Ksh', '');
        const productImage = productBox.querySelector('img').src;
        
        // Add to cart
        addToCart(productId, productName, productPrice, productImage);
        
        // Show confirmation
        alert(`${productName} added to cart!`);
      });
    });
  }
  
  function addToCart(id, name, price, image) {
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }
    
    // Save cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    document.querySelectorAll('.cart span').forEach(span => {
      span.textContent = totalItems;
    });
  }
  
  function populateVendorFilter(products) {
    const vendorFilter = document.getElementById('vendor-filter');
    if (!vendorFilter) return;
    
    // Get unique vendors
    const vendors = [...new Set(products.map(p => p.vendor))];
    
    // Clear existing options except the first one
    while (vendorFilter.options.length > 1) {
      vendorFilter.remove(1);
    }
    
    // Add vendor options
    vendors.forEach(vendor => {
      const option = document.createElement('option');
      option.value = vendor;
      option.textContent = vendor;
      vendorFilter.appendChild(option);
    });
    
    // Add filter functionality
    vendorFilter.addEventListener('change', function() {
      const selectedVendor = this.value;
      const categoryFilter = document.getElementById('category-filter').value;
      
      filterProducts(selectedVendor, categoryFilter);
    });
    
    // Add category filter functionality
    const categoryFilterElement = document.getElementById('category-filter');
    if (categoryFilterElement) {
      categoryFilterElement.addEventListener('change', function() {
        const selectedCategory = this.value;
        const selectedVendor = vendorFilter.value;
        
        filterProducts(selectedVendor, selectedCategory);
      });
    }
  }
  
  function filterProducts(vendor, category) {
    const staticProducts = [
      {
        id: 'apple1',
        name: 'Apple',
        price: '150',
        quantity: '1 KG',
        imageUrl: 'images/apple.jpg',
        category: 'Fruits',
        vendor: 'Fresh Farms'
      },
      {
        id: 'orange1',
        name: 'Orange',
        price: '180',
        quantity: '1 KG',
        imageUrl: 'images/orange.jpg',
        category: 'Fruits',
        vendor: 'Citrus Growers'
      },
      {
        id: 'mango1',
        name: 'Mango',
        price: '350',
        quantity: '1 KG',
        imageUrl: 'images/mango.jpg',
        category: 'Fruits',
        vendor: 'Tropical Fruits'
      },
      {
        id: 'tomato1',
        name: 'Tomato',
        price: '120',
        quantity: '1 KG',
        imageUrl: 'images/tomato.png',
        category: 'Vegetables',
        vendor: 'Garden Fresh'
      },
      {
        id: 'potato1',
        name: 'Potato',
        price: '100',
        quantity: '1 KG',
        imageUrl: 'images/potato.jpg',
        category: 'Vegetables',
        vendor: 'Farm Direct'
      },
      {
        id: 'onion1',
        name: 'Onion',
        price: '90',
        quantity: '1 KG',
        imageUrl: 'images/onion.jpg',
        category: 'Vegetables',
        vendor: 'Garden Fresh'
      }
    ];
    
    // Filter products
    let filteredProducts = staticProducts;
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (vendor) {
      filteredProducts = filteredProducts.filter(p => p.vendor === vendor);
    }
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Check if we have products after filtering
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-products-container">
          <div class="no-products-icon"><i class="fas fa-box-open"></i></div>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your filters.</p>
        </div>
      `;
      return;
    }
    
    // Add products to page
    filteredProducts.forEach(product => {
      const productBox = document.createElement('div');
      productBox.className = 'product-box';
      
      productBox.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <strong>${product.name}</strong>
        <span class="quantity">${product.quantity}</span>
        <span class="price">Ksh${product.price}</span>
        <div class="vendor-info">
          <i class="fas fa-store"></i> ${product.vendor}
        </div>
        <a href="#" class="cart-btn" data-product-id="${product.id}">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </a>
        <a href="#" class="like-btn" data-product-id="${product.id}">
          <i class="far fa-heart"></i>
        </a>
      `;
      
      productsContainer.appendChild(productBox);
    });
    
    // Setup cart buttons
    setupCartButtons();
  }
  
  // Initialize cart count
  updateCartCount();
});