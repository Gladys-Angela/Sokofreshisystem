// Force reload when coming from edit page
document.addEventListener('DOMContentLoaded', function() {
  console.log("Checking for refresh parameter...");
  
  // Check URL for refresh parameter
  const urlParams = new URLSearchParams(window.location.search);
  const refreshParam = urlParams.get('refresh');
  
  if (refreshParam) {
    console.log("Refresh parameter found, reloading products...");
    
    // Remove the query parameter from URL without reloading
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    
    // Force reload products
    if (typeof loadVendorProducts === 'function') {
      loadVendorProducts(true);
    }
  }
});

// Search and filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const stockFilter = document.getElementById('stock-filter');
  const clearFiltersBtn = document.getElementById('clear-filters');

  // Add event listeners for search and filters
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterProducts, 300));
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
  }
  
  if (stockFilter) {
    stockFilter.addEventListener('change', filterProducts);
  }
  
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function filterProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const categoryFilter = document.getElementById('category-filter').value;
  const stockFilter = document.getElementById('stock-filter').value;
  
  const productCards = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  productCards.forEach(card => {
    const productName = card.querySelector('.product-name').textContent.toLowerCase();
    const productCategory = card.querySelector('.product-category').textContent;
    const stockBadge = card.querySelector('.stock-badge');
    const stockClass = stockBadge ? stockBadge.className : '';

    let showCard = true;

    // Search filter
    if (searchTerm && !productName.includes(searchTerm) && !productCategory.toLowerCase().includes(searchTerm)) {
      showCard = false;
    }

    // Category filter
    if (categoryFilter && productCategory !== categoryFilter) {
      showCard = false;
    }

    // Stock filter
    if (stockFilter) {
      if (stockFilter === 'in-stock' && !stockClass.includes('in-stock')) {
        showCard = false;
      } else if (stockFilter === 'low-stock' && !stockClass.includes('low-stock')) {
        showCard = false;
      } else if (stockFilter === 'out-of-stock' && !stockClass.includes('out-of-stock')) {
        showCard = false;
      }
    }

    card.style.display = showCard ? 'block' : 'none';
    if (showCard) visibleCount++;
  });

  // Update product count
  updateProductCount(visibleCount);
}

function clearAllFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('category-filter').value = '';
  document.getElementById('stock-filter').value = '';
  
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.style.display = 'block';
  });
  
  updateProductCount(productCards.length);
}