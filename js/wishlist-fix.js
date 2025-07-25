// Enhanced wishlist functionality with working "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
  // Initialize wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  updateWishlistCount();

  // Add event listeners to all like buttons on product pages
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product info from parent product box
      const productBox = this.closest('.product-box');
      if (!productBox) return;
      
      const productId = productBox.dataset.id || this.dataset.productId || generateProductId(productBox);
      const productName = productBox.querySelector('strong').textContent;
      const productPrice = productBox.querySelector('.price').textContent;
      const productImage = productBox.querySelector('img').src;
      
      // Check if product is already in wishlist
      const index = wishlist.findIndex(item => item.id === productId);
      
      if (index === -1) {
        // Add to wishlist
        wishlist.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage
        });
        
        // Change heart icon to solid
        this.querySelector('i').classList.remove('far');
        this.querySelector('i').classList.add('fas');
        this.querySelector('i').style.color = '#ff6c57';
      } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        
        // Change heart icon back to outline
        this.querySelector('i').classList.remove('fas');
        this.querySelector('i').classList.add('far');
        this.querySelector('i').style.color = '';
      }
      
      // Save wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      
      // Update wishlist count
      updateWishlistCount();
    });
  });
  
  // Add event listeners to all "Add to Cart" buttons in the wishlist page
  const wishlistContainer = document.getElementById('wishlist-container');
  if (wishlistContainer) {
    wishlistContainer.addEventListener('click', function(e) {
      // Check if the clicked element is an "Add to Cart" button or its child
      if (e.target.classList.contains('cart-btn') || e.target.closest('.cart-btn')) {
        e.preventDefault();
        
        // Get the closest cart button if the click was on a child element
        const cartBtn = e.target.classList.contains('cart-btn') ? e.target : e.target.closest('.cart-btn');
        
        // Get product info from parent product box
        const productBox = cartBtn.closest('.product-box');
        if (!productBox) return;
        
        const productId = productBox.dataset.id;
        const productName = productBox.querySelector('strong').textContent;
        const productPrice = productBox.querySelector('.price').textContent.replace('Ksh', '');
        const productImage = productBox.querySelector('img').src;
        
        // Add to cart
        addToCart(productId, productName, productPrice, productImage);
        
        // Show confirmation
        alert(`${productName} added to cart!`);
      }
    });
  }
  
  // Function to add item to cart
  function addToCart(id, name, price, image) {
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }
    
    // Save cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
  }
  
  // Function to update cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    document.querySelectorAll('.cart span').forEach(span => {
      span.textContent = totalItems;
    });
  }
  
  // Function to update wishlist count
  function updateWishlistCount() {
    const wishlistCountElements = document.querySelectorAll('#wishlist-count, #wishlist-count-user');
    wishlistCountElements.forEach(element => {
      element.textContent = wishlist.length;
    });
  }
  
  // Function to generate a product ID if none exists
  function generateProductId(productBox) {
    const name = productBox.querySelector('strong').textContent;
    const price = productBox.querySelector('.price').textContent;
    const id = `${name}-${price}`.replace(/\s+/g, '-').toLowerCase();
    productBox.dataset.id = id;
    return id;
  }
  
  // Initialize cart count
  updateCartCount();
});