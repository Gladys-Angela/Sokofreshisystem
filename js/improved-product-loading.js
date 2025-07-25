// Improved Product Loading Script
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a vendor products page
  const productsContainer = document.getElementById('products-container');
  
  if (productsContainer) {
    loadAllProducts();
  }
});

async function loadAllProducts() {
  const container = document.getElementById('products-container');
  
  if (!container) return;
  
  // Show loading state
  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  `;
  
  try {
    // Get all products from Firestore
    const productsQuery = await firebase.firestore()
      .collection('products')
      .get();
    
    if (productsQuery.empty) {
      container.innerHTML = `
        <div class="no-products-container">
          <div class="no-products-icon">
            <i class="fas fa-box-open"></i>
          </div>
          <h3>No Products Found</h3>
          <p>No products are available at the moment.</p>
        </div>
      `;
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Process and display products
    const products = [];
    productsQuery.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Render products
    products.forEach((product) => {
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
      
      container.appendChild(productCard);
    });
    
    // Update product counts
    updateProductCounts(products);
    
  } catch (error) {
    console.error('Error loading products:', error);
    container.innerHTML = `
      <div class="error-container">
        <h3>Unable to load products</h3>
        <p>There was an error loading products. Please try again later.</p>
        <button onclick="location.reload()" class="btn-primary">Try Again</button>
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

// Make functions globally available
window.loadAllProducts = loadAllProducts;
window.updateProductCounts = updateProductCounts;
window.updateProductCount = updateProductCount;