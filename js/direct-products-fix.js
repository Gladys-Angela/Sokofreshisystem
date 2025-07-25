// Simple direct product loading script
document.addEventListener('DOMContentLoaded', function() {
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // Show loading
  productContainer.innerHTML = '<p>Loading products...</p>';
  
  // Direct approach - no filters initially
  firebase.firestore().collection('products')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        productContainer.innerHTML = '<p>No products found</p>';
        return;
      }
      
      // Clear container
      productContainer.innerHTML = '';
      
      // Display products
      snapshot.forEach(doc => {
        const product = {
          id: doc.id,
          ...doc.data()
        };
        
        const productBox = document.createElement('div');
        productBox.className = 'product-box';
        
        productBox.innerHTML = `
          <img src="${product.imageUrl || 'images/default-product.png'}" alt="${product.name}" onerror="this.src='images/default-product.png'">
          <strong>${product.name}</strong>
          <span class="quantity">${product.quantity || '1 KG'}</span>
          <span class="price">Ksh${product.price}</span>
          <a href="#" class="cart-btn" data-id="${product.id}">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </a>
        `;
        
        productContainer.appendChild(productBox);
      });
      
      // Add cart functionality
      document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const productId = this.getAttribute('data-id');
          alert('Product added to cart!');
        });
      });
    })
    .catch(error => {
      console.error("Error getting products:", error);
      productContainer.innerHTML = '<p>Error loading products. Please try again.</p>';
    });
});