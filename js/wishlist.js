// Wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  updateWishlistCount();

  // Add event listeners to all like buttons
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product info from parent product box
      const productBox = this.closest('.product-box');
      if (!productBox) return;
      
      const productId = productBox.dataset.id || generateProductId(productBox);
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
  
  // Update like button appearance based on wishlist
  updateLikeButtonsAppearance();
  
  // Function to update wishlist count
  function updateWishlistCount() {
    const wishlistCountElements = document.querySelectorAll('#wishlist-count');
    wishlistCountElements.forEach(element => {
      element.textContent = wishlist.length;
    });
  }
  
  // Function to update like buttons appearance
  function updateLikeButtonsAppearance() {
    document.querySelectorAll('.product-box').forEach(productBox => {
      const likeBtn = productBox.querySelector('.like-btn');
      if (!likeBtn) return;
      
      const productId = productBox.dataset.id || generateProductId(productBox);
      const isInWishlist = wishlist.some(item => item.id === productId);
      
      if (isInWishlist) {
        likeBtn.querySelector('i').classList.remove('far');
        likeBtn.querySelector('i').classList.add('fas');
        likeBtn.querySelector('i').style.color = '#ff6c57';
      }
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
});