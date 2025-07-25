// Load products from Firestore to display on homepage
document.addEventListener('DOMContentLoaded', function() {
  console.log("Direct product display loaded");
  
  // Get references to product containers
  const featuredContainer = document.querySelector('#popular-product .product-container');
  const fruitsContainer = document.querySelector('#fruits-product .product-container');
  const vegetablesContainer = document.querySelector('#vegetables-product .product-container');
  const allProductsContainer = document.querySelector('#all-products .product-container');
  
  if (!db) {
    console.error('Firestore not initialized');
    loadFallbackProducts();
    return;
  }
  
  // Load all products from Firestore
  db.collection('products').get().then((querySnapshot) => {
    // Clear static product placeholders
    if (featuredContainer) featuredContainer.innerHTML = '';
    if (fruitsContainer) fruitsContainer.innerHTML = '';
    if (vegetablesContainer) vegetablesContainer.innerHTML = '';
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
      fruits.forEach(product => {
        fruitsContainer.appendChild(createProductBox(product));
      });
    }
    
    if (vegetablesContainer) {
      const vegetables = products.filter(p => p.category === 'Vegetables');
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
    loadFallbackProducts();
  });
  
  // Function to load fallback products if Firestore fails
  function loadFallbackProducts() {
    console.log("Loading fallback products");
    
    // Featured products
    if (featuredContainer && featuredContainer.innerHTML.includes('Loading')) {
      featuredContainer.innerHTML = `
        <div class="product-box">
          <img src="images/apple.jpg" alt="Apple">
          <strong>Apple</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh150</span>
          <a href="#" class="cart-btn" data-product-id="apple1">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="product-box">
          <img src="images/orange.jpg" alt="Orange">
          <strong>Orange</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh180</span>
          <a href="#" class="cart-btn" data-product-id="orange1">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="product-box">
          <img src="images/tomato.png" alt="Tomato">
          <strong>Tomato</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh120</span>
          <a href="#" class="cart-btn" data-product-id="tomato1">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
      `;
    }
    
    // Fruits products
    if (fruitsContainer && fruitsContainer.innerHTML.includes('Loading')) {
      fruitsContainer.innerHTML = `
        <div class="product-box">
          <img src="images/apple.jpg" alt="Apple">
          <strong>Apple</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh150</span>
          <a href="#" class="cart-btn" data-product-id="apple2">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="product-box">
          <img src="images/orange.jpg" alt="Orange">
          <strong>Orange</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh180</span>
          <a href="#" class="cart-btn" data-product-id="orange2">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="product-box">
          <img src="images/mango.jpg" alt="Mango">
          <strong>Mango</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh350</span>
          <a href="#" class="cart-btn" data-product-id="mango1">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
      `;
    }
    
    // Vegetables products
    if (vegetablesContainer && vegetablesContainer.innerHTML.includes('Loading')) {
      vegetablesContainer.innerHTML = `
        <div class="product-box">
          <img src="images/tomato.png" alt="Tomato">
          <strong>Tomato</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh120</span>
          <a href="#" class="cart-btn" data-product-id="tomato2">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="product-box">
          <img src="images/potato.jpg" alt="Potato">
          <strong>Potato</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh100</span>
          <a href="#" class="cart-btn" data-product-id="potato1">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="product-box">
          <img src="images/onion.jpg" alt="Onion">
          <strong>Onion</strong>
          <span class="quantity">1 KG</span>
          <span class="price">Ksh90</span>
          <a href="#" class="cart-btn" data-product-id="onion1">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn">
            <i class="far fa-heart"></i>
          </a>
        </div>
      `;
    }
    
    // Trigger cart button setup
    if (typeof window.setupCartButtons === 'function') {
      window.setupCartButtons();
    } else if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('productsLoaded'));
    }
  }
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
  
  // Add direct click handler for cart button
  const cartBtn = productBox.querySelector('.cart-btn');
  cartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window.addToCart === 'function') {
      window.addToCart(product);
    } else {
      console.error('addToCart function not found');
      alert('Sorry, there was a problem adding this item to your cart. Please try again later.');
    }
  });
  
  return productBox;
}