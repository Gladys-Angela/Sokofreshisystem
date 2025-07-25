/**
 * Enhanced Form Validation for eFresh Vendor Portal
 * Provides real-time validation for product forms
 */

document.addEventListener('DOMContentLoaded', function() {
  initFormValidation();
});

function initFormValidation() {
  const form = document.getElementById('add-product-form');
  if (!form) return;
  
  // Get all form inputs
  const productName = document.getElementById('product_name');
  const productPrice = document.getElementById('product_price');
  const productCategory = document.getElementById('product_category');
  const productUnit = document.getElementById('product_unit');
  const stockQuantity = document.getElementById('stock_quantity');
  const productImage = document.getElementById('product_image');
  
  // Add real-time validation
  if (productName) {
    productName.addEventListener('blur', function() {
      validateField(this, this.value.trim().length > 0, 'Product name is required');
    });
  }
  
  if (productPrice) {
    productPrice.addEventListener('blur', function() {
      validateField(this, this.value > 0, 'Price must be greater than zero');
    });
  }
  
  if (productCategory) {
    productCategory.addEventListener('change', function() {
      validateField(this, this.value !== '', 'Please select a category');
    });
  }
  
  if (productUnit) {
    productUnit.addEventListener('change', function() {
      validateField(this, this.value !== '', 'Please select a unit');
    });
  }
  
  if (stockQuantity) {
    stockQuantity.addEventListener('blur', function() {
      validateField(this, this.value >= 0, 'Stock cannot be negative');
    });
  }
  
  if (productImage) {
    productImage.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        // Check file size (max 5MB)
        const validSize = file.size <= 5 * 1024 * 1024;
        // Check file type
        const validType = file.type.startsWith('image/');
        
        validateField(
          this, 
          validSize && validType, 
          !validSize ? 'File must be less than 5MB' : 'Please select a valid image file'
        );
      }
    });
  }
  
  // Form submission validation
  form.addEventListener('submit', function(e) {
    let isValid = true;
    
    // Validate all required fields
    if (productName && productName.value.trim() === '') {
      validateField(productName, false, 'Product name is required');
      isValid = false;
    }
    
    if (productPrice && (productPrice.value <= 0 || productPrice.value === '')) {
      validateField(productPrice, false, 'Please enter a valid price');
      isValid = false;
    }
    
    if (productCategory && productCategory.value === '') {
      validateField(productCategory, false, 'Please select a category');
      isValid = false;
    }
    
    if (productUnit && productUnit.value === '') {
      validateField(productUnit, false, 'Please select a unit');
      isValid = false;
    }
    
    if (stockQuantity && (stockQuantity.value < 0 || stockQuantity.value === '')) {
      validateField(stockQuantity, false, 'Please enter a valid stock quantity');
      isValid = false;
    }
    
    if (productImage && productImage.required && !productImage.files[0]) {
      validateField(productImage, false, 'Please select a product image');
      isValid = false;
    }
    
    if (!isValid) {
      e.preventDefault();
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

function validateField(field, isValid, errorMessage) {
  // Remove any existing error message
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Remove any existing success indicator
  const existingSuccess = field.parentElement.querySelector('.success-indicator');
  if (existingSuccess) {
    existingSuccess.remove();
  }
  
  // Add error message or success indicator
  if (!isValid) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
    field.parentElement.appendChild(errorElement);
    field.classList.add('error-input');
    field.classList.remove('success-input');
  } else {
    const successElement = document.createElement('div');
    successElement.className = 'success-indicator';
    successElement.innerHTML = '<i class="fas fa-check-circle"></i>';
    field.parentElement.appendChild(successElement);
    field.classList.add('success-input');
    field.classList.remove('error-input');
  }
  
  return isValid;
}

// Make functions available globally
window.validateField = validateField;
window.initFormValidation = initFormValidation;