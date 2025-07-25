// Vendor Products Management
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a vendor products page
  const productsContainer = document.getElementById('products-container');
  const manageProductsContainer = document.getElementById('manage-products-container');
  
  if (productsContainer || manageProductsContainer) {
    initializeVendorProducts();
  }
});

async function initializeVendorProducts() {
  try {
    // Check if we need to force reload (for edited products)
    const forceReload = sessionStorage.getItem('productEdited') === 'true';
    if (forceReload) {
      sessionStorage.removeItem('productEdited');
    }
    
    // Wait for authentication
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Allow any user to view products
        await loadVendorProducts(forceReload);
      } else {
        showError('Please log in to continue.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    });
  } catch (error) {
    console.error('Error initializing vendor products:', error);
    showError('Error loading products. Please try again.');
  }
}

async function loadVendorProducts(forceReload = false) {
  console.log("Loading vendor products, forceReload:", forceReload);
  const container = document.getElementById('products-container') || 
                   document.getElementById('manage-products-container');
  
  if (!container) return;
  
  // Show loading state
  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  `;
  
  try {
    console.log('Loading all products');
    
    // Always get fresh products from localStorage
    let products = JSON.parse(localStorage.getItem('sampleProducts'));
    console.log("Products loaded from localStorage:", products ? products.length : 0);
    
    // If no products in localStorage, use default sample products
    if (!products) {
      products = [
        {
          id: 'product1',
          name: 'Apple',
          category: 'Fruits',
          price: '150',
          stock: 20,
          imageUrl: 'images/apple.jpg',
          description: 'Fresh and juicy apples from local farms.'
        },
        {
          id: 'product2',
          name: 'Orange',
          category: 'Fruits',
          price: '180',
          stock: 15,
          imageUrl: 'images/orange.jpg',
          description: 'Sweet and tangy oranges, rich in vitamin C.'
        },
        {
          id: 'product3',
          name: 'Mango',
          category: 'Fruits',
          price: '350',
          stock: 8,
          imageUrl: 'images/mango.jpg',
          description: 'Ripe and delicious mangoes, perfect for desserts.'
        },
        {
          id: 'product4',
          name: 'Tomato',
          category: 'Vegetables',
          price: '120',
          stock: 25,
          imageUrl: 'images/tomato.png',
          description: 'Fresh tomatoes, ideal for salads and cooking.'
        },
        {
          id: 'product5',
          name: 'Onion',
          category: 'Vegetables',
          price: '100',
          stock: 30,
          imageUrl: 'images/onion.jpg',
          description: 'Essential cooking ingredient for adding flavor.'
        },
        {
          id: 'product6',
          name: 'Potato',
          category: 'Vegetables',
          price: '90',
          stock: 40,
          imageUrl: 'images/potato.jpg',
          description: 'Versatile potatoes for various cooking needs.'
        },
        {
          id: 'product7',
          name: 'Cauliflower',
          category: 'Vegetables',
          price: '150',
          stock: 12,
          imageUrl: 'images/cauliflower.jpg',
          description: 'Fresh cauliflower, perfect for healthy meals.'
        },
        {
          id: 'product8',
          name: 'Raddish',
          category: 'Vegetables',
          price: '80',
          stock: 18,
          imageUrl: 'images/raddish.jpg',
          description: 'Crunchy radishes with a mild peppery flavor.'
        }
      ];
      
      // Save to localStorage for future use
      localStorage.setItem('sampleProducts', JSON.stringify(products));
    }
    
    console.log('Products loaded:', products.length);
    
    if (products.length === 0) {
      showNoProducts(container);
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Render products
    products.forEach((product) => {
      const productElement = createProductCard(product);
      container.appendChild(productElement);
    });
    
    // Add event listeners for product actions
    addProductEventListeners();
    
    // Update product counts if on manage products page
    updateProductCounts(products);
    
  } catch (error) {
    console.error('Error loading vendor products:', error);
    showError('Error loading products: ' + error.message);
    
    // Show fallback options
    container.innerHTML = `
      <div class="error-container">
        <h3>Unable to load products</h3>
        <p>There was an error loading products. Please try again.</p>
        <div class="error-actions">
          <button onclick="location.reload()" class="btn-primary">Try Again</button>
        </div>
      </div>
    `;
  }
}

function updateProductCounts(products) {
  const totalProducts = document.getElementById('total-products');
  const inStockProducts = document.getElementById('in-stock-products');
  const lowStockProducts = document.getElementById('low-stock-products');
  const outOfStockProducts = document.getElementById('out-of-stock-products');
  
  if (!totalProducts) return;
  
  const counts = {
    total: products.length,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  };
  
  products.forEach(product => {
    const stock = product.stock || 0;
    if (stock === 0) {
      counts.outOfStock++;
    } else if (stock <= 5) {
      counts.lowStock++;
    } else {
      counts.inStock++;
    }
  });
  
  totalProducts.textContent = counts.total;
  inStockProducts.textContent = counts.inStock;
  lowStockProducts.textContent = counts.lowStock;
  outOfStockProducts.textContent = counts.outOfStock;
  
  // Update product count display
  updateProductCount(counts.total);
}

function updateProductCount(count) {
  const productCountContainer = document.getElementById('product-count-container');
  if (!productCountContainer) return;
  
  productCountContainer.innerHTML = `
    <div class="product-count-display">
      <span id="product-count" class="product-count">${count} product${count !== 1 ? 's' : ''} found</span>
    </div>
  `;
}

function showNoProducts(container) {
  container.innerHTML = `
    <div class="no-products-container">
      <div class="no-products-icon">
        <i class="fas fa-box-open"></i>
      </div>
      <h3>No Products Found</h3>
      <p>No products are available at the moment.</p>
    </div>
  `;
}

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.dataset.productId = product.id;
  
  // Determine stock status
  const stock = product.stock || 0;
  let stockStatus = '';
  let stockClass = '';
  
  if (stock === 0) {
    stockStatus = 'Out of Stock';
    stockClass = 'out-of-stock';
  } else if (stock <= 5) {
    stockStatus = 'Low Stock';
    stockClass = 'low-stock';
  } else {
    stockStatus = 'In Stock';
    stockClass = 'in-stock';
  }
  
  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.imageUrl || 'images/default-product.png'}" alt="${product.name}" onerror="this.src='images/default-product.png'">
      <div class="stock-badge ${stockClass}">${stockStatus}</div>
    </div>
    <div class="product-info">
      <h4 class="product-name">${product.name}</h4>
      <p class="product-category">${product.category || 'Uncategorized'}</p>
      <div class="product-details">
        <span class="product-price">Ksh ${product.price}</span>
        <span class="product-stock">Stock: ${stock}</span>
      </div>
      <div class="product-actions">
        <button class="btn-edit" onclick="editProduct('${product.id}')">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn-delete" onclick="showDeleteModal('${product.id}')">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `;
  
  return productCard;
}

function addProductEventListeners() {
  // Add any additional event listeners here
  console.log('Product event listeners added');
}

function editProduct(productId) {
  // Store the product ID in localStorage for the edit page
  localStorage.setItem('currentEditProductId', productId);
  window.location.href = `edit_product.html?id=${productId}`;
}

function showDeleteModal(productId) {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    deleteProduct(productId);
  }
}

async function deleteProduct(productId) {
  try {
    // Get the current products from localStorage or use the default sample products
    let storedProducts = JSON.parse(localStorage.getItem('sampleProducts'));
    if (!storedProducts) {
      // If no stored products, use the hardcoded ones from loadVendorProducts
      const container = document.getElementById('products-container') || 
                       document.getElementById('manage-products-container');
      
      // Just remove from UI without database call
      const productCard = document.querySelector(`[data-product-id="${productId}"]`);
      if (productCard) {
        productCard.remove();
      }
    } else {
      // Filter out the deleted product
      storedProducts = storedProducts.filter(product => product.id !== productId);
      
      // Save updated products back to localStorage
      localStorage.setItem('sampleProducts', JSON.stringify(storedProducts));
      
      // Remove from UI
      const productCard = document.querySelector(`[data-product-id="${productId}"]`);
      if (productCard) {
        productCard.remove();
      }
    }
    
    alert('Product deleted successfully!');
    
    // Check if there are any products left
    const remainingProducts = document.querySelectorAll('.product-card');
    if (remainingProducts.length === 0) {
      const container = document.getElementById('products-container') || 
                       document.getElementById('manage-products-container');
      showNoProducts(container);
    } else {
      // Update product counts
      updateProductCounts(Array.from(remainingProducts).map(card => ({
        id: card.dataset.productId,
        stock: parseInt(card.querySelector('.product-stock').textContent.replace('Stock: ', '')) || 0
      })));
    }
    
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Error deleting product: ' + error.message);
  }
}

function showError(message) {
  const container = document.getElementById('products-container') || 
                   document.getElementById('manage-products-container');
  
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
      </div>
    `;
  }
}

// Make functions globally available
window.loadVendorProducts = loadVendorProducts;
window.editProduct = editProduct;
window.showDeleteModal = showDeleteModal;
window.deleteProduct = deleteProduct;
window.updateProductCounts = updateProductCounts;
window.updateProductCount = updateProductCount;