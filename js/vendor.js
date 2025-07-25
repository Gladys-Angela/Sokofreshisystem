// Initialize Firebase (this should be done in firebase-init.js)
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
// firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function() {
  // Load vendors for the vendor filter dropdown
  loadVendors();
  
  // Check if we're on the products page
  if (document.getElementById('vendor-filter')) {
    // Add event listener for vendor filter changes
    document.getElementById('vendor-filter').addEventListener('change', function() {
      // This will be handled by the products page script
    });
  }
});

// Function to load vendors from Firestore
function loadVendors() {
  const vendorFilter = document.getElementById('vendor-filter');
  if (!vendorFilter) return; // Exit if not on a page with vendor filter
  
  // Clear existing options except the first one
  while (vendorFilter.options.length > 1) {
    vendorFilter.remove(1);
  }
  
  // Get vendors from Firestore
  firebase.firestore().collection('users')
    .where('role', '==', 'vendor')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No vendors found');
        return;
      }
      
      // Add each vendor to the dropdown
      querySnapshot.forEach((doc) => {
        const vendorData = doc.data();
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = vendorData.businessName || vendorData.displayName || 'Unnamed Vendor';
        vendorFilter.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error loading vendors:', error);
    });
}

// Function to get products by vendor
function getProductsByVendor(vendorId) {
  return firebase.firestore().collection('products')
    .where('vendorId', '==', vendorId)
    .get()
    .then((querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return products;
    })
    .catch((error) => {
      console.error('Error getting products by vendor:', error);
      return [];
    });
}

// Function to render vendor products on the products page
function renderVendorProducts(vendorId) {
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // Show loading state
  productContainer.innerHTML = '<p>Loading products...</p>';
  
  // Get products for the selected vendor
  getProductsByVendor(vendorId)
    .then((products) => {
      if (products.length === 0) {
        productContainer.innerHTML = '<p>No products found for this vendor.</p>';
        return;
      }
      
      // Clear container
      productContainer.innerHTML = '';
      
      // Render each product
      products.forEach((product) => {
        const productBox = document.createElement('div');
        productBox.className = 'product-box';
        
        // Get vendor name
        firebase.firestore().collection('users').doc(product.vendorId).get()
          .then((vendorDoc) => {
            const vendorName = vendorDoc.exists ? 
              (vendorDoc.data().businessName || vendorDoc.data().displayName || 'Unnamed Vendor') : 
              'Unknown Vendor';
            
            // Create product HTML
            productBox.innerHTML = `
              <div class="vendor-badge">${vendorName}</div>
              <img src="${product.imageUrl}" alt="${product.name}">
              <strong>${product.name}</strong>
              <span class="quantity">${product.quantity}</span>
              <div class="vendor-info">
                <i class="fas fa-store"></i> ${vendorName}
              </div>
              <span class="price">Ksh${product.price}</span>
              <a href="#" class="cart-btn" data-product-id="${product.id}" data-vendor-id="${product.vendorId}">
                <i class="fas fa-shopping-bag"></i> <span>Add to Cart</span>
              </a>
              <a href="#" class="like-btn">
                <i class="far fa-heart"></i>
              </a>
            `;
            
            productContainer.appendChild(productBox);
          })
          .catch((error) => {
            console.error('Error getting vendor:', error);
          });
      });
    });
}

// Function to load all vendors for display on a vendors page
function loadAllVendors(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<p>Loading vendors...</p>';
  
  // Get all vendors from Firestore
  firebase.firestore().collection('users')
    .where('role', '==', 'vendor')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        container.innerHTML = '<p>No vendors found.</p>';
        return;
      }
      
      // Clear container
      container.innerHTML = '';
      
      // Render each vendor
      querySnapshot.forEach((doc) => {
        const vendorData = doc.data();
        const vendorCard = document.createElement('div');
        vendorCard.className = 'vendor-card';
        
        vendorCard.innerHTML = `
          <h3>${vendorData.businessName || vendorData.displayName || 'Unnamed Vendor'}</h3>
          <p>${vendorData.businessDescription || 'No description available.'}</p>
          <a href="products.html?vendor=${doc.id}" class="view-products-btn">View Products</a>
        `;
        
        container.appendChild(vendorCard);
      });
    })
    .catch((error) => {
      console.error('Error loading vendors:', error);
      container.innerHTML = '<p>Error loading vendors. Please try again later.</p>';
    });
}

// Export functions for use in other scripts
window.vendorModule = {
  loadVendors,
  getProductsByVendor,
  renderVendorProducts,
  loadAllVendors
};