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
  
  // Apply limit
  query = query.limit(limit);
  
  query.get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        productContainer.innerHTML = '<p>No products available at the moment.</p>';
        return;
      }
      
      // Clear container
      productContainer.innerHTML = '';
      
      // Process each product
      querySnapshot.forEach((doc) => {
        const product = {
          id: doc.id,
          ...doc.data()
        };
        
        renderProduct(product);
      });
    })
    .catch((error) => {
      console.error('Error loading products:', error);
      productContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
    });
  
  // Function to render a product
  function renderProduct(product) {
    const productBox = document.createElement('div');
    productBox.className = 'product-box';
    
    productBox.innerHTML = `
      <img src="${product.imageUrl || 'images/default-product.png'}" alt="${product.name}" onerror="this.src='images/default-product.png'">
      <strong>${product.name}</strong>
      <span class="quantity">${product.quantity || `1 ${product.unit || 'KG'}`}</span>
      <span class="price">Ksh${product.price}</span>
      <a href="product_details.html?id=${product.id}" class="view-details">
        <i class="fas fa-eye"></i> <span data-translate="view_details">View Details</span>
      </a>
      <a href="#" class="cart-btn" data-product-id="${product.id}">
        <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
      </a>
      <a href="#" class="like-btn" data-product-id="${product.id}">
        <i class="far fa-heart"></i>
      </a>
    `;
    
    productContainer.appendChild(productBox);
    
    // Add event listener to cart button
    const cartBtn = productBox.querySelector('.cart-btn');
    cartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      addToCart(product);
    });
  }
}

// Function to add product to cart
function addToCart(product) {
  // Check if user is logged in
  const user = firebase.auth().currentUser;
  if (!user) {
    if (confirm('Please log in to add items to your cart. Go to login page?')) {
      window.location.href = 'login.html';
    }
    return;
  }
  
  // Get vendor information
  firebase.firestore().collection('users').doc(product.vendorId).get()
    .then((vendorDoc) => {
      let vendorName = 'Unknown Vendor';
      
      if (vendorDoc.exists) {
        const vendorData = vendorDoc.data();
        vendorName = vendorData.businessName || vendorData.displayName || 'Unnamed Vendor';
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
    })
    .catch((error) => {
      console.error('Error getting vendor:', error);
      alert(`${product.name} added to cart!`);
    });
}

// Function to update cart count
function updateCartCount() {
  const user = firebase.auth().currentUser;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let userCart = [];
  
  if (user) {
    userCart = cart.filter(item => item.userId === user.uid);
  }
  
  const cartCount = userCart.reduce((total, item) => total + item.count, 0);
  
  const cartCountElements = document.querySelectorAll('.cart span');
  cartCountElements.forEach(element => {
    element.textContent = cartCount;
  });
  
  // Also update wishlist count if available
  updateWishlistCount();
}

// Function to update wishlist count
function updateWishlistCount() {
  const user = firebase.auth().currentUser;
  
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  let userWishlist = [];
  
  if (user) {
    userWishlist = wishlist.filter(item => item.userId === user.uid);
  }
  
  const wishlistCount = userWishlist.length;
  
  const wishlistCountElements = document.querySelectorAll('.like span');
  wishlistCountElements.forEach(element => {
    element.textContent = wishlistCount;
  });
}

// Initialize event listeners for like buttons
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to like buttons
  document.addEventListener('click', function(e) {
    if (e.target.closest('.like-btn')) {
      e.preventDefault();
      const likeBtn = e.target.closest('.like-btn');
      const productId = likeBtn.getAttribute('data-product-id');
      
      if (productId) {
        toggleWishlist(productId);
      }
    }
  });
  
  // Update counts on page load
  updateCartCount();
});

// Function to toggle wishlist
function toggleWishlist(productId) {
  const user = firebase.auth().currentUser;
  if (!user) {
    if (confirm('Please log in to add items to your wishlist. Go to login page?')) {
      window.location.href = 'login.html';
    }
    return;
  }
  
  // Get product details from Firestore
  firebase.firestore().collection('products').doc(productId).get()
    .then((doc) => {
      if (doc.exists) {
        const product = {
          id: doc.id,
          ...doc.data()
        };
        
        // Get existing wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        // Check if product already exists in wishlist
        const existingProductIndex = wishlist.findIndex(item => 
          item.id === productId && 
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
    })
    .catch((error) => {
      console.error('Error getting product:', error);
    });
}

// Export functions for use in other files
window.loadVendorProducts = loadVendorProducts;
window.updateCartCount = updateCartCount;
window.updateWishlistCount = updateWishlistCount;