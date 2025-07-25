// Static products display script
document.addEventListener('DOMContentLoaded', function() {
  // Get product containers
  const featuredContainer = document.querySelector('#featured-products');
  const fruitsContainer = document.querySelector('#fruits-products');
  const vegetablesContainer = document.querySelector('#vegetables-products');
  
  // Clear loading messages
  if (featuredContainer) featuredContainer.innerHTML = '';
  if (fruitsContainer) fruitsContainer.innerHTML = '';
  if (vegetablesContainer) vegetablesContainer.innerHTML = '';
  
  // Featured products
  if (featuredContainer) {
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
  if (fruitsContainer) {
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
  if (vegetablesContainer) {
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
});