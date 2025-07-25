document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the products page
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // Get filter elements
  const categoryFilter = document.getElementById('category-filter');
  const vendorFilter = document.getElementById('vendor-filter');
  const sortFilter = document.getElementById('sort-filter');
  
  // Load products when page loads
  loadProducts();
  
  // Add event listeners to filters
  if (categoryFilter) categoryFilter.addEventListener('change', loadProducts);
  if (vendorFilter) vendorFilter.addEventListener('change', loadProducts);
  if (sortFilter) sortFilter.addEventListener('change', loadProducts);
  
  // Function to load products from Firestore
  function loadProducts() {
    // Show loading state
    productContainer.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    `;
    
    // Get filter values
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const vendorValue = vendorFilter ? vendorFilter.value : '';
    const sortValue = sortFilter ? sortFilter.value : 'default';
    
    // Start with a base query
    let query = firebase.firestore().collection('products');
    
    // Apply category filter if selected
    if (categoryValue) {
      query = query.where('category', '==', categoryValue);
    }
    
    // Apply vendor filter if selected
    if (vendorValue) {
      query = query.where('vendorId', '==', vendorValue);
    }
    
    // Get products
    query.get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          productContainer.innerHTML = `
            <div class="no-products-container">
              <div class="no-products-icon"><i class="fas fa-box-open"></i></div>
              <h3>No products found</h3>
              <p>We couldn't find any products matching your criteria.</p>
            </div>
          `;
          return;
        }
        
        // Convert to array for sorting
        let products = [];
        querySnapshot.forEach((doc) => {
          products.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        // Apply sorting
        switch (sortValue) {
          case 'price-low':
            products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
          case 'price-high':
            products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
          case 'rating':
            products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          default:
            // Default sorting (no change)
            break;
        }
        
        // Clear container
        productContainer.innerHTML = '';
        
        // Create a map to store vendor information
        const vendorMap = new Map();
        
        // Also populate vendor filter if it exists and is empty
        if (vendorFilter && vendorFilter.options.length <= 1) {
          // Get unique vendor IDs
          const vendorIds = [...new Set(products.map(product => product.vendorId))];
          
          // Load vendor information for the filter
          Promise.all(vendorIds.map(vendorId => 
            firebase.firestore().collection('users').doc(vendorId).get()
          ))
          .then(vendorDocs => {
            vendorDocs.forEach(doc => {
              if (doc.exists) {
                const vendorData = doc.data();
                const vendorName = vendorData.businessName || vendorData.displayName || 'Unnamed Vendor';
                
                // Add to vendor map
                vendorMap.set(doc.id, vendorName);
                
                // Add to vendor filter
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = vendorName;
                vendorFilter.appendChild(option);
              }
            });
          })
          .catch(error => {
            console.error('Error loading vendors for filter:', error);
          });
        }
        
        // Function to render a product
        function renderProduct(product, vendorName) {
          const productBox = document.createElement('div');
          productBox.className = 'product-box';
          
          productBox.innerHTML = `
            <div class="vendor-badge">${vendorName}</div>
            <img src="${product.imageUrl || 'images/default-product.png'}" alt="${product.name}" onerror="this.src='images/default-product.png'">
            <strong>${product.name}</strong>
            <span class="quantity">${product.quantity || `1 ${product.unit || 'KG'}`}</span>
            <div class="vendor-info">
              <i class="fas fa-store"></i> ${vendorName}
            </div>
            <span class="price">Ksh${product.price}</span>
            <div class="product-buttons">
              <a href="#" class="cart-btn" data-product-id="${product.id}" data-vendor-id="${product.vendorId}">
                <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
              </a>
              <a href="#" class="like-btn" data-product-id="${product.id}">
                <i class="far fa-heart"></i>
              </a>
            </div>
          `;
          
          productContainer.appendChild(productBox);
          
          // Add event listener to cart button
          const cartBtn = productBox.querySelector('.cart-btn');
          cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(product, vendorName);
          });
          
          // Add event listener to like button
          const likeBtn = productBox.querySelector('.like-btn');
          likeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleWishlist(product);
          });
        }
        
        // Process each product
        let pendingVendors = products.length;
        
        products.forEach((product) => {
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
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        productContainer.innerHTML = `
          <div class="error-container">
            <div class="error-icon"><i class="fas fa-exclamation-circle"></i></div>
            <h3>Error loading products</h3>
            <p>There was a problem loading the products. Please try again later.</p>
            <button class="btn-primary" onclick="location.reload()">Retry</button>
          </div>
        `;
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
      image: product.imageUrl || 'images/default-product.png',
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
  
  // Function to toggle wishlist
  function toggleWishlist(product) {
    // Check if user is logged in
    const user = firebase.auth().currentUser;
    if (!user) {
      if (confirm('Please log in to add items to your wishlist. Go to login page?')) {
        window.location.href = 'login.html';
      }
      return;
    }
    
    // Get existing wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already exists in wishlist
    const existingProductIndex = wishlist.findIndex(item => 
      item.id === product.id && 
      item.userId === user.uid
    );
    
    if (existingProductIndex > -1) {
      // Remove from wishlist if exists
      wishlist.splice(existingProductIndex, 1);
      alert(`${product.name} removed from wishlist!`);
    } else {
      // Add to wishlist if not exists
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl || 'images/default-product.png',
        vendorId: product.vendorId,
        userId: user.uid,
        dateAdded: new Date().toISOString()
      });
      alert(`${product.name} added to wishlist!`);
    }
    
    // Save wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount();
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
  
  // Function to update wishlist count
  function updateWishlistCount() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const userWishlist = wishlist.filter(item => item.userId === user.uid);
    
    const wishlistCountElements = document.querySelectorAll('.like span');
    wishlistCountElements.forEach(element => {
      element.textContent = userWishlist.length;
    });
  }
  
  // Update counts on page load
  updateCartCount();
  updateWishlistCount();
});