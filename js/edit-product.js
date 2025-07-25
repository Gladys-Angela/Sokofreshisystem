// Edit Product Script
document.addEventListener('DOMContentLoaded', function() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    alert('No product ID specified!');
    window.location.href = 'manage_products.html';
    return;
  }
  
  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem('sampleProducts'));
  
  if (!products) {
    alert('Error: Products data not found!');
    window.location.href = 'manage_products.html';
    return;
  }
  
  // Find the product
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    alert('Product not found!');
    window.location.href = 'manage_products.html';
    return;
  }
  
  // Update preview
  document.getElementById('preview-image').src = product.imageUrl || 'images/default-product.png';
  document.getElementById('preview-name').textContent = product.name;
  document.getElementById('preview-category').textContent = product.category;
  document.getElementById('preview-price').textContent = `Ksh ${product.price}`;
  
  // Fill form fields
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-stock').value = product.stock;
  document.getElementById('product-description').value = product.description || '';
  
  // Form submission handler
  document.getElementById('edit-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const stock = parseInt(document.getElementById('product-stock').value);
    const description = document.getElementById('product-description').value;
    
    // Update product in array
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          name,
          category,
          price,
          stock,
          description
        };
      }
      return p;
    });
    
    // Save updated products to localStorage
    localStorage.setItem('sampleProducts', JSON.stringify(updatedProducts));
    
    // Save updated products to localStorage
    localStorage.setItem('sampleProducts', JSON.stringify(updatedProducts));
    
    // Show success message
    alert('Product updated successfully!');
    
    // Redirect back to products page with cache-busting parameter
    window.location.href = 'manage_products.html?refresh=' + new Date().getTime();
  });
  
  // Live preview updates
  document.getElementById('product-name').addEventListener('input', function() {
    document.getElementById('preview-name').textContent = this.value;
  });
  
  document.getElementById('product-category').addEventListener('change', function() {
    document.getElementById('preview-category').textContent = this.value;
  });
  
  document.getElementById('product-price').addEventListener('input', function() {
    document.getElementById('preview-price').textContent = `Ksh ${this.value}`;
  });
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function(e) {
  e.preventDefault();
  if (confirm('Are you sure you want to logout?')) {
    firebase.auth().signOut().then(() => {
      window.location.href = 'index.html';
    }).catch((error) => {
      alert('Error signing out: ' + error.message);
    });
  }
});