/**
 * Enhanced Product Count Display
 * Provides a more professional way to display product counts in the vendor portal
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the product count display
  initProductCountDisplay();
});

/**
 * Initialize the product count display with animations and enhanced visuals
 */
function initProductCountDisplay() {
  const countContainer = document.getElementById('product-count-container');
  if (!countContainer) return;
  
  // Show the initial loading state
  showLoadingState(countContainer);
}

/**
 * Display a loading state for the product count
 * @param {HTMLElement} container - The container element
 */
function showLoadingState(container) {
  container.innerHTML = `
    <div class="product-count-loader">
      <i class="fas fa-spinner fa-spin"></i>
      <span class="product-count">Fetching inventory data...</span>
    </div>
  `;
}

/**
 * Update the product count with a professional display
 * @param {number} count - The number of products
 */
function updateProductCount(count) {
  const countContainer = document.getElementById('product-count-container');
  if (!countContainer) return;
  
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
}

// Make functions available globally
window.updateProductCount = updateProductCount;
window.showLoadingState = showLoadingState;