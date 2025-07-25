/**
 * This file handles displaying vendor products to customers
 * in both the index page and customer dashboard
 */

// Function to load and display vendor products
function loadVendorProducts(containerId, limit = 6, category = null) {
  const productContainer = document.getElementById(containerId);
  if (!productContainer) return;

  // Show loading state
  productContainer.innerHTML = '<p>Loading products...</p>';
  
  // Start with a base query
  let query = firebase.firestore().collection('products');
  
  // Apply category filter if provided
  if (category) {
    query = query.where('category', '==', category);
  }
  
  // Apply limit and get products
  query = query.orderBy('createdAt', 'desc').limit(limit);
  
  query.get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        productContainer.innerHTML = '<p>No products available at the moment.</p>';
        return;
      }
      
      // Clear container
      productContainer.innerHTML = '';
      
      // Create a map to store vendor information
      const vendorMap = new Map();
      let pendingVendors = querySnapshot.size;
      
      // Process each product
      querySnapshot.forEach((doc) => {
        const product = {
          id: doc.id,
          ...doc.data()
        };
        
        // Check if we already have this vendor's info
        if (vendorMap.has(product.vendorId)) {
          renderProduct(product, vendorMap.get(product.vendorId));
          pendingVendors--;
        } else {
          // Get vendor information
          firebase.firestore().collection('users').doc(product.vendorId).get()
            .then((vendorDoc) => {
              let vendorName = 'Unknown Vendor';
              
              if (vendorDoc.exists) {
                const vendorData = vendorDoc.data();
                vendorName = vendorData.businessName || vendorData.displayName || 'Unnamed Vendor';
                vendorMap.set(product.vendorId, vendorName);
              }
              
              renderProduct(product, vendorName);
              pendingVendors--;
            })
            .catch((error) => {
              console.error('Error getting vendor:', error);
              renderProduct(product, 'Unknown Vendor');
              pendingVendors--;
            });
        }
      });
      
      // Function to render a product
      function renderProduct(product, vendorName) {
        const productBox = document.createElement('div');
        productBox.className = 'product-box';
        
        productBox.innerHTML = `
          <div class="vendor-badge">${vendorName}</div>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
          <img src="${product.imageUrl}" alt="${product.name}">
          <strong>${product.name}</strong>
          <span class="quantity">${product.quantity || `1 ${product.unit || 'KG'}`}</span>
          <div class="vendor-info">
            <i class="fas fa-store"></i> ${vendorName}
          </div>
          <span class="price">Ksh${product.price}</span>
          <a href="#" class="cart-btn" data-product-id="${product.id}" data-vendor-id="${product.vendorId}">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
        `;
        
        productContainer.appendChild(productBox);
        
        // Add event listener to cart button
        const cartBtn = productBox.querySelector('.cart-btn');
        cartBtn.addEventListener('click', function(e) {
          e.preventDefault();
          addToCart(product, vendorName);
        });
      }
    })
    .catch((error) => {
      console.error('Error loading products:', error);
      productContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    });
}

// Function to add product to cart
function addToCart(product, vendorName) {
  // Check if user is logged in
  const user = firebase.auth().currentUser;
  if (!user) {
    if (confirm('Please log in to add items to your cart. Go to login page?')) {
      window.location.href = 'login.html';
    }
    return;
  }
  
  // Create cart item
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity || `1 ${product.unit || 'KG'}`,
    image: product.imageUrl,
    vendorId: product.vendorId,
    vendorName: vendorName,
    count: 1,
    userId: user.uid
  };
  
  // Get existing cart
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => 
    item.id === product.id && 
    item.userId === user.uid
  );
  
  if (existingProductIndex > -1) {
    // Increment count if product exists
    cart[existingProductIndex].count += 1;
  } else {
    // Add new product to cart
    cart.push(cartItem);
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show confirmation
  alert(`${product.name} from ${vendorName} added to cart!`);
}

// Function to update cart count
function updateCartCount() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const userCart = cart.filter(item => item.userId === user.uid);
  const cartCount = userCart.reduce((total, item) => total + item.count, 0);
  
  const cartCountElements = document.querySelectorAll('.cart span');
  cartCountElements.forEach(element => {
    element.textContent = cartCount;
  });
}

// Export functions for use in other files
window.loadVendorProducts = loadVendorProducts;
window.updateCartCount = updateCartCount;