// Load products from Firestore to display on homepage
document.addEventListener('DOMContentLoaded', function() {
  // Get references to product containers
  const featuredContainer = document.querySelector('#popular-product .product-container');
  const fruitsContainer = document.querySelector('#fruits-product .product-container');
  const vegetablesContainer = document.querySelector('#vegetables-product .product-container');
  const allProductsContainer = document.querySelector('#all-products .product-container');
  
  if (!db) return; // Exit if Firestore is not initialized
  
  // Load all products from Firestore
  db.collection('products').get().then((querySnapshot) => {
    // Clear static product placeholders
    if (featuredContainer) featuredContainer.innerHTML = '';
    if (allProductsContainer) allProductsContainer.innerHTML = '';
    
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      products.push(product);
    });
    
    // Display featured products (first 3)
    if (featuredContainer) {
      const featuredProducts = products.slice(0, 3);
      featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductBox(product));
      });
    }
    
    // Display products by category
    if (fruitsContainer) {
      const fruits = products.filter(p => p.category === 'Fruits');
      fruitsContainer.innerHTML = '';
      fruits.forEach(product => {
        fruitsContainer.appendChild(createProductBox(product));
      });
    }
    
    if (vegetablesContainer) {
      const vegetables = products.filter(p => p.category === 'Vegetables');
      vegetablesContainer.innerHTML = '';
      vegetables.forEach(product => {
        vegetablesContainer.appendChild(createProductBox(product));
      });
    }
    
    // Display all products
    if (allProductsContainer) {
      products.forEach(product => {
        allProductsContainer.appendChild(createProductBox(product));
      });
    }
  }).catch(error => {
    console.error("Error loading products:", error);
  });
});

// Helper function to create product box HTML
function createProductBox(product) {
  const productBox = document.createElement('div');
  productBox.className = 'product-box';
  
  productBox.innerHTML = `
    <img src="${product.imageUrl || 'images/default-product.jpg'}" alt="${product.name}">
    <strong>${product.name}</strong>
    <span class="quantity">${product.quantity || '1 KG'}</span>
    <span class="price">Ksh${product.price}</span>
    <a href="#" class="cart-btn" data-product-id="${product.id}" data-vendor-id="${product.vendorId || 'unknown'}">
      <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
    </a>
    <a href="#" class="like-btn" data-product-id="${product.id}">
      <i class="far fa-heart"></i>
    </a>
  `;
  
  return productBox;
}