// Fallback products script that will always show products even if Firestore fails
document.addEventListener('DOMContentLoaded', function() {
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // Try to load from Firestore first
  loadFromFirestore()
    .then(success => {
      if (!success) {
        // If Firestore fails, load static products
        loadStaticProducts();
      }
    })
    .catch(() => {
      // On any error, load static products
      loadStaticProducts();
    });
  
  // Function to load from Firestore
  async function loadFromFirestore() {
    try {
      productContainer.innerHTML = '<p>Loading products...</p>';
      
      const snapshot = await firebase.firestore().collection('products').get();
      
      if (snapshot.empty) {
        productContainer.innerHTML = '<p>No products found</p>';
        return false;
      }
      
      // Clear container
      productContainer.innerHTML = '';
      
      // Display products
      snapshot.forEach(doc => {
        const product = {
          id: doc.id,
          ...doc.data()
        };
        
        displayProduct(product);
      });
      
      return true;
    } catch (error) {
      console.error("Error getting products:", error);
      return false;
    }
  }
  
  // Function to load static products as fallback
  function loadStaticProducts() {
    const staticProducts = [
      {
        id: '1',
        name: "Apple",
        price: 150,
        quantity: "1 KG",
        imageUrl: "images/apple.jpg"
      },
      {
        id: '2',
        name: "Orange",
        price: 180,
        quantity: "1 KG",
        imageUrl: "images/orange.jpg"
      },
      {
        id: '3',
        name: "Tomato",
        price: 120,
        quantity: "1 KG",
        imageUrl: "images/tomato.png"
      },
      {
        id: '4',
        name: "Potato",
        price: 90,
        quantity: "1 KG",
        imageUrl: "images/potato.jpg"
      }
    ];
    
    // Clear container
    productContainer.innerHTML = '';
    
    // Display static products
    staticProducts.forEach(product => {
      displayProduct(product);
    });
  }
  
  // Function to display a product
  function displayProduct(product) {
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
    
    // Add cart functionality
    const cartBtn = productBox.querySelector('.cart-btn');
    cartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert(`${product.name} added to cart!`);
    });
  }
});