// Admin product management functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the admin products page
  if (!window.location.pathname.includes('admin_products')) return;
  
  // Use localStorage for product management
  // No Firestore dependency
  
  // Get products from localStorage or initialize with default products
  let products = JSON.parse(localStorage.getItem('products')) || getDefaultProducts();
  
  // Display products
  displayProducts();
  
  // Add event listeners for product actions
  setupProductActions();
  
  // Create modals if they don't exist
  createAddProductModal();
  
  // Add product form submission only
  document.addEventListener('submit', function(e) {
    if (e.target.id === 'add-product-form') {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('product-name').value;
      const category = document.getElementById('product-category').value;
      const vendor = document.getElementById('product-vendor').value;
      const price = document.getElementById('product-price').value;
      const quantity = document.getElementById('product-quantity').value;
      const image = document.getElementById('product-image').value || getDefaultImage(category);
      
      // Create product ID
      const productId = 'prod_' + Date.now();
      
      const newProduct = {
        id: productId,
        name: name,
        category: category,
        vendor: vendor,
        price: price,
        quantity: quantity,
        image: image,
        createdAt: new Date()
      };
      
      // Add product to products array
      products.push(newProduct);
      
      // Save products to localStorage
      localStorage.setItem('products', JSON.stringify(products));
      
      // Close modal
      closeModal('add-product-modal');
      
      // Show success message
      showNotification('Product added successfully!', 'success');
      
      // Reload page to show new product
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  });
  
  // Display products in the grid
  function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    // Clear existing products and show loading
    productGrid.innerHTML = `
      <div class="loading-indicator" style="text-align: center; padding: 50px; grid-column: 1 / -1;">
        <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
        <p>Loading products...</p>
      </div>
    `;
    
    // Use default products if none in localStorage
    if (!products || products.length === 0) {
      products = getDefaultProducts();
      localStorage.setItem('products', JSON.stringify(products));
    }
    
    // Clear loading indicator
    productGrid.innerHTML = '';
    
    // Add products to grid
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.id = product.id;
      
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-vendor">${product.vendor}</p>
          <div class="product-price">Ksh ${product.price} / ${product.quantity}</div>
          <div class="product-actions">
            <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
            <a href="#" class="action-btn btn-edit"><i class="fas fa-edit"></i> Edit</a>
            <a href="#" class="action-btn btn-delete"><i class="fas fa-trash"></i> Delete</a>
          </div>
        </div>
      `;
      
      productGrid.appendChild(productCard);
    });
    
    // Add event listeners using event delegation
    productGrid.addEventListener('click', function(e) {
      const target = e.target.closest('.action-btn');
      if (!target) return;
      
      e.preventDefault();
      const productCard = target.closest('.product-card');
      const productId = productCard.dataset.id;
      const product = products.find(p => p.id === productId);
      
      if (!product) return;
      
      if (target.classList.contains('btn-view')) {
        showProductDetails(product);
      } else if (target.classList.contains('btn-edit')) {
        showEditProductModal(product);
      } else if (target.classList.contains('btn-delete')) {
        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
          deleteProduct(productId);
        }
      }
    });
  }
  
  // Setup product actions (view, edit, delete)
  function setupProductActions() {
    // Add product button
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showAddProductModal();
      });
    }
  }
  
  // Delete product function
  function deleteProduct(productId) {
    // Remove product from products array
    products = products.filter(p => p.id !== productId);
    
    // Save products to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Show success message
    showNotification('Product deleted successfully!', 'success');
    
    // Remove product card from grid
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (productCard) {
      productCard.remove();
    }
  }
  
  // Show product details
  function showProductDetails(product) {
    // Create modal for product details
    const modal = document.createElement('div');
    modal.id = 'view-product-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Product Details</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="product-details" style="display: flex; gap: 20px;">
            <div class="product-image" style="flex: 0 0 150px;">
              <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 5px;">
            </div>
            <div class="product-info" style="flex: 1;">
              <p><strong>Name:</strong> ${product.name}</p>
              <p><strong>Category:</strong> ${product.category}</p>
              <p><strong>Vendor:</strong> ${product.vendor}</p>
              <p><strong>Price:</strong> Ksh ${product.price}</p>
              <p><strong>Quantity:</strong> ${product.quantity}</p>
              <p><strong>ID:</strong> ${product.id}</p>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary close-modal">Close</button>
            <button type="button" class="btn-primary edit-from-view">Edit Product</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add modal styles if not already added
    addModalStyles();
    
    // Show modal
    modal.style.display = 'block';
    
    // Close modal when clicking on X or Close button
    modal.querySelector('.close').addEventListener('click', function() {
      modal.remove();
    });
    
    modal.querySelector('.close-modal').addEventListener('click', function() {
      modal.remove();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Add event listener for edit button
    const editBtn = modal.querySelector('.edit-from-view');
    if (editBtn) {
      editBtn.addEventListener('click', function() {
        modal.remove();
        showEditProductModal(product);
      });
    }
  }
  
  // Show add product modal
  function showAddProductModal() {
    const addProductModal = document.getElementById('add-product-modal');
    if (!addProductModal) {
      createAddProductModal();
    }
    
    openModal('add-product-modal');
  }
  
  // Show edit product modal
  function showEditProductModal(product) {
    // Parse product if it's a string (from the view modal)
    if (typeof product === 'string') {
      try {
        product = JSON.parse(product.replace(/'/g, '"'));
      } catch (e) {
        console.error('Error parsing product:', e);
        return;
      }
    }
    
    const editProductModal = document.getElementById('edit-product-modal');
    if (!editProductModal) {
      createEditProductModal();
    }
    
    // Fill form with product details
    document.getElementById('edit-product-id').value = product.id;
    document.getElementById('edit-product-name').value = product.name;
    document.getElementById('edit-product-category').value = product.category;
    document.getElementById('edit-product-vendor').value = product.vendor;
    document.getElementById('edit-product-price').value = product.price;
    document.getElementById('edit-product-quantity').value = product.quantity;
    document.getElementById('edit-product-image').value = product.image;
    
    openModal('edit-product-modal');
  }
  
  // Create add product modal
  function createAddProductModal() {
    // Check if modal already exists
    if (document.getElementById('add-product-modal')) {
      return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'add-product-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add Product</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form id="add-product-form">
            <div class="form-group">
              <label for="product-name">Product Name</label>
              <input type="text" id="product-name" required>
            </div>
            <div class="form-group">
              <label for="product-category">Category</label>
              <select id="product-category">
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fish & Meat">Fish & Meat</option>
                <option value="Spices">Spices</option>
                <option value="Mixed Products">Mixed Products</option>
              </select>
            </div>
            <div class="form-group">
              <label for="product-vendor">Vendor</label>
              <select id="product-vendor">
                <option value="Fruit Paradise">Fruit Paradise</option>
                <option value="Meat Masters">Meat Masters</option>
                <option value="Green Grocers">Green Grocers</option>
                <option value="Organic Delights">Organic Delights</option>
                <option value="Spice World">Spice World</option>
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="product-price">Price (KES)</label>
                <input type="number" id="product-price" min="1" required>
              </div>
              <div class="form-group">
                <label for="product-quantity">Quantity</label>
                <input type="text" id="product-quantity" placeholder="e.g. kg, piece" required>
              </div>
            </div>
            <div class="form-group">
              <label for="product-image">Image URL (optional)</label>
              <input type="text" id="product-image" placeholder="Leave blank for default image">
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary close-modal">Cancel</button>
              <button type="submit" class="btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listeners for close buttons
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('#add-product-form');
    
    closeBtn.addEventListener('click', function() {
      closeModal('add-product-modal');
    });
    
    cancelBtn.addEventListener('click', function() {
      closeModal('add-product-modal');
    });
    
    // Add submit event listener to the form
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('product-name').value;
      const category = document.getElementById('product-category').value;
      const vendor = document.getElementById('product-vendor').value;
      const price = document.getElementById('product-price').value;
      const quantity = document.getElementById('product-quantity').value;
      const image = document.getElementById('product-image').value || getDefaultImage(category);
      
      // Create product ID
      const productId = 'prod_' + Date.now();
      
      const newProduct = {
        id: productId,
        name: name,
        category: category,
        vendor: vendor,
        price: price,
        quantity: quantity,
        image: image,
        createdAt: new Date()
      };
      
      // Add product to products array
      products.push(newProduct);
      
      // Save products to localStorage
      localStorage.setItem('products', JSON.stringify(products));
      
      // Close modal
      closeModal('add-product-modal');
      
      // Show success message
      showNotification('Product added successfully!', 'success');
      
      // Reload page to show new product
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal('add-product-modal');
      }
    });
  }
  
  // Create edit product modal
  function createEditProductModal() {
    // Check if modal already exists
    if (document.getElementById('edit-product-modal')) {
      return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'edit-product-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit Product</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form id="edit-product-form">
            <input type="hidden" id="edit-product-id">
            <div class="form-group">
              <label for="edit-product-name">Product Name</label>
              <input type="text" id="edit-product-name" required>
            </div>
            <div class="form-group">
              <label for="edit-product-category">Category</label>
              <select id="edit-product-category">
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fish & Meat">Fish & Meat</option>
                <option value="Spices">Spices</option>
                <option value="Mixed Products">Mixed Products</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-product-vendor">Vendor</label>
              <select id="edit-product-vendor">
                <option value="Fruit Paradise">Fruit Paradise</option>
                <option value="Meat Masters">Meat Masters</option>
                <option value="Green Grocers">Green Grocers</option>
                <option value="Organic Delights">Organic Delights</option>
                <option value="Spice World">Spice World</option>
              </select>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="edit-product-price">Price (KES)</label>
                <input type="number" id="edit-product-price" min="1" required>
              </div>
              <div class="form-group">
                <label for="edit-product-quantity">Quantity</label>
                <input type="text" id="edit-product-quantity" placeholder="e.g. kg, piece" required>
              </div>
            </div>
            <div class="form-group">
              <label for="edit-product-image">Image URL</label>
              <input type="text" id="edit-product-image" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary close-modal">Cancel</button>
              <button type="submit" class="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listeners for close buttons
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('#edit-product-form');
    
    closeBtn.addEventListener('click', function() {
      closeModal('edit-product-modal');
    });
    
    cancelBtn.addEventListener('click', function() {
      closeModal('edit-product-modal');
    });
    
    // Add submit event listener to the form
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const id = document.getElementById('edit-product-id').value;
      const name = document.getElementById('edit-product-name').value;
      const category = document.getElementById('edit-product-category').value;
      const vendor = document.getElementById('edit-product-vendor').value;
      const price = document.getElementById('edit-product-price').value;
      const quantity = document.getElementById('edit-product-quantity').value;
      const image = document.getElementById('edit-product-image').value;
      
      const updatedProduct = {
        id: id,
        name: name,
        category: category,
        vendor: vendor,
        price: price,
        quantity: quantity,
        image: image,
        updatedAt: new Date()
      };
      
      // Find product in products array
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        // Update product
        products[productIndex] = updatedProduct;
        
        // Save products to localStorage
        localStorage.setItem('products', JSON.stringify(products));
        
        // Close modal
        closeModal('edit-product-modal');
        
        // Show success message
        showNotification('Product updated successfully!', 'success');
        
        // Reload page to show updated product
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal('edit-product-modal');
      }
    });
  }
  
  // Get default products
  function getDefaultProducts() {
    return [
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
  }
  
  // Get default image based on category
  function getDefaultImage(category) {
    switch (category) {
      case 'Fruits':
        return 'images/apple.jpg';
      case 'Vegetables':
        return 'images/vegetable.png';
      case 'Fish & Meat':
        return 'images/fish.png';
      case 'Spices':
        return 'images/spices.jpeg';
      default:
        return 'images/vegetable.png';
    }
  }
  
  // Open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  // Close modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  // Helper function to add modal styles
  function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
      }
      
      .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 0;
        width: 50%;
        max-width: 500px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .modal-header {
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-header h2 {
        margin: 0;
        font-size: 20px;
      }
      
      .modal-body {
        padding: 20px;
      }
      
      .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }
      
      .close:hover {
        color: #333;
      }
      
      .form-group {
        margin-bottom: 15px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
      }
      
      .form-group input, .form-group select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      
      .form-row {
        display: flex;
        gap: 15px;
      }
      
      .form-row .form-group {
        flex: 1;
      }
      
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
        position: sticky;
        bottom: 0;
        background-color: white;
        padding: 10px 0;
      }
      
      .btn-primary {
        background-color: #00b761;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .btn-primary:hover {
        background-color: #009d53;
      }
      
      .btn-secondary {
        background-color: #f1f1f1;
        color: #333;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .btn-secondary:hover {
        background-color: #e0e0e0;
      }
      
      .product-details p {
        margin-bottom: 10px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Show notification
  function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 5px;
          color: white;
          font-weight: 500;
          z-index: 1001;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(-20px);
        }
        
        .notification.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .notification.success {
          background-color: #28a745;
        }
        
        .notification.error {
          background-color: #dc3545;
        }
        
        .notification.warning {
          background-color: #ffc107;
          color: #333;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});