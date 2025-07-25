// Add Product Script
document.addEventListener('DOMContentLoaded', function() {
  // Initialize preview with default values
  document.getElementById('preview-name').textContent = 'Product Name';
  document.getElementById('preview-category').textContent = 'Category';
  document.getElementById('preview-price').textContent = 'Ksh 0';
  
  // Set up image selection
  const imageOptions = document.querySelectorAll('.image-option');
  const imageInput = document.getElementById('product-image');
  
  imageOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      imageOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      this.classList.add('selected');
      
      // Update hidden input value
      const imageUrl = this.getAttribute('data-image');
      imageInput.value = imageUrl;
      
      // Update preview image
      document.getElementById('preview-image').src = imageUrl;
    });
  });
  
  // Live preview updates
  document.getElementById('product-name').addEventListener('input', function() {
    document.getElementById('preview-name').textContent = this.value || 'Product Name';
  });
  
  document.getElementById('product-category').addEventListener('change', function() {
    document.getElementById('preview-category').textContent = this.value || 'Category';
  });
  
  document.getElementById('product-price').addEventListener('input', function() {
    document.getElementById('preview-price').textContent = `Ksh ${this.value || '0'}`;
  });
  
  // Form validation
  function validateForm() {
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const stock = document.getElementById('product-stock').value;
    const image = document.getElementById('product-image').value;
    
    if (!name || !category || !price || !stock || !image) {
      alert('Please fill in all required fields and select a product image.');
      return false;
    }
    
    return true;
  }
  
  // Form submission handler
  document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state on button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    submitBtn.disabled = true;
    
    // Validate form
    if (!validateForm()) {
      // Restore button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }
    
    // Get form values
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const stock = parseInt(document.getElementById('product-stock').value);
    const imageUrl = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;
    
    // Generate unique ID for new product
    const productId = 'product_' + Date.now();
    
    // Create new product object
    const newProduct = {
      id: productId,
      name,
      category,
      price,
      stock,
      imageUrl: imageUrl || 'images/default-product.png',
      description,
      createdAt: new Date().toISOString()
    };
    
    // Simulate server delay for better UX
    setTimeout(() => {
      try {
        // Get existing products from localStorage
        const existingProducts = JSON.parse(localStorage.getItem('sampleProducts')) || [];
        
        // Add new product to beginning of array so it appears first
        existingProducts.unshift(newProduct);
        
        // Save updated products to localStorage
        localStorage.setItem('sampleProducts', JSON.stringify(existingProducts));
        
        // Show success animation
        const successAnimation = document.getElementById('success-animation');
        successAnimation.style.display = 'flex';
        
        // Redirect after delay or on button click
        setTimeout(() => {
          window.location.href = 'manage_products.html?refresh=' + new Date().getTime();
        }, 3000); // Redirect after 3 seconds if user doesn't click a button
      } catch (error) {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show error
        alert('Error adding product: ' + error.message);
      }
    }, 800); // Simulate server delay
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