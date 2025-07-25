/**
 * Enhanced Loading States for eFresh Vendor Portal
 * Provides professional loading states and transitions for product displays
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize enhanced loading states
  initEnhancedLoading();
});

/**
 * Initialize enhanced loading states for the vendor portal
 */
function initEnhancedLoading() {
  // Override the default updateProductCount function
  if (typeof window.originalUpdateProductCount !== 'function') {
    window.originalUpdateProductCount = window.updateProductCount;
    
    window.updateProductCount = function(count) {
      const countContainer = document.getElementById('product-count-container');
      if (countContainer) {
        // Create the appropriate icon based on count
        let icon = 'box';
        let statusClass = '';
        
        if (count > 0) {
          icon = 'box-open';
          statusClass = 'has-products';
        } else {
          statusClass = 'no-products';
        }
        
        // Replace loader with actual count display with animation
        countContainer.innerHTML = `
          <div class="product-count-display ${statusClass}">
            <i class="fas fa-${icon}" aria-hidden="true"></i>
            <span class="product-count">
              ${count} product${count !== 1 ? 's' : ''} found
            </span>
          </div>
        `;
      } else if (typeof window.originalUpdateProductCount === 'function') {
        // Fall back to original function if container not found
        window.originalUpdateProductCount(count);
      }
    };
  }
  
  // Override the default showLoadingState function for products container
  enhanceProductsLoading();
}

/**
 * Enhance the products container loading state
 */
function enhanceProductsLoading() {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return;
  
  // Check if container is empty or contains default loading message
  if (productsContainer.innerHTML.trim() === '' || 
      productsContainer.innerHTML.includes('Loading products...')) {
    
    productsContainer.innerHTML = `
      <div class="enhanced-loading-container">
        <div class="loading-animation">
          <div class="loading-spinner"></div>
        </div>
        <div class="loading-text">
          <h3>Preparing Your Product Inventory</h3>
          <p>We're retrieving your products. This will only take a moment...</p>
        </div>
      </div>
    `;
  }
}

// Add styles for enhanced loading
const style = document.createElement('style');
style.textContent = `
  .enhanced-loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    margin: 20px 0;
  }
  
  .loading-animation {
    margin-bottom: 24px;
  }
  
  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid #f1f5f9;
    border-top: 4px solid #00b761;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-text h3 {
    margin: 0 0 12px 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .loading-text p {
    margin: 0;
    color: #64748b;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

document.head.appendChild(style);