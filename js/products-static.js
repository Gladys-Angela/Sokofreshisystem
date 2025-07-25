document.addEventListener('DOMContentLoaded', function() {
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;
  
  // Sample products data
  const allProducts = [
    {
      name: "Apple",
      price: 150,
      quantity: "1 KG",
      imageUrl: "images/apple.jpg",
      vendorName: "Fresh Farms",
      category: "Fruits"
    },
    {
      name: "Orange",
      price: 180,
      quantity: "1 KG",
      imageUrl: "images/orange.jpg",
      vendorName: "Citrus Growers",
      category: "Fruits"
    },
    {
      name: "Mango",
      price: 350,
      quantity: "1 KG",
      imageUrl: "images/mango.jpg",
      vendorName: "Tropical Fruits",
      category: "Fruits"
    },
    {
      name: "Tomato",
      price: 120,
      quantity: "1 KG",
      imageUrl: "images/tomato.png",
      vendorName: "Garden Fresh",
      category: "Vegetables"
    },
    {
      name: "Potato",
      price: 90,
      quantity: "1 KG",
      imageUrl: "images/potato.jpg",
      vendorName: "Root Vegetables",
      category: "Vegetables"
    },
    {
      name: "Onion",
      price: 100,
      quantity: "1 KG",
      imageUrl: "images/onion.jpg",
      vendorName: "Garden Fresh",
      category: "Vegetables"
    },
    {
      name: "Carrot",
      price: 110,
      quantity: "1 KG",
      imageUrl: "images/carrot.jpg",
      vendorName: "Root Vegetables",
      category: "Vegetables"
    },
    {
      name: "Cauliflower",
      price: 150,
      quantity: "1 PC",
      imageUrl: "images/cauliflower.jpg",
      vendorName: "Garden Fresh",
      category: "Vegetables"
    },
    {
      name: "Fish Fillet",
      price: 450,
      quantity: "500g",
      imageUrl: "images/fish.png",
      vendorName: "Fresh Catch",
      category: "Fish & Meat"
    },
    {
      name: "Chicken",
      price: 350,
      quantity: "1 KG",
      imageUrl: "images/fish.png",
      vendorName: "Fresh Catch",
      category: "Fish & Meat"
    },
    {
      name: "Black Pepper",
      price: 200,
      quantity: "100g",
      imageUrl: "images/spices.jpg",
      vendorName: "Spice World",
      category: "Spices"
    },
    {
      name: "Cinnamon",
      price: 180,
      quantity: "50g",
      imageUrl: "images/spices.jpg",
      vendorName: "Spice World",
      category: "Spices"
    }
  ];
  
  // Display static products on page load
  displayProducts();
  
  // Handle filter changes
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', displayProducts);
  }
  
  const vendorFilter = document.getElementById('vendor-filter');
  if (vendorFilter) {
    vendorFilter.addEventListener('change', displayProducts);
  }
  
  const sortFilter = document.getElementById('sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', displayProducts);
  }
  
  // Function to display products with filtering
  function displayProducts() {
    // Clear container
    productContainer.innerHTML = '';
    
    // Get filter values
    const category = categoryFilter ? categoryFilter.value : '';
    const vendor = vendorFilter && vendorFilter.selectedIndex > 0 ? 
                  vendorFilter.options[vendorFilter.selectedIndex].text : '';
    
    // Filter products
    let filteredProducts = allProducts;
    
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    if (vendor && vendor !== 'All Vendors') {
      filteredProducts = filteredProducts.filter(product => product.vendorName === vendor);
    }
    
    // Show message if no products match filters
    if (filteredProducts.length === 0) {
      productContainer.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 20px;">
          <p>No products found matching your criteria.</p>
        </div>
      `;
      return;
    }
    
    // Render each product
    filteredProducts.forEach(product => {
      const productBox = document.createElement('div');
      productBox.className = 'product-box';
      
      productBox.innerHTML = `
        <div class="vendor-badge">${product.vendorName}</div>
        <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='images/default-product.png'">
        <strong>${product.name}</strong>
        <span class="quantity">${product.quantity}</span>
        <div class="vendor-info">
          <i class="fas fa-store"></i> ${product.vendorName}
        </div>
        <span class="price">Ksh${product.price}</span>
        <div class="product-buttons">
          <a href="#" class="cart-btn" data-product-id="${product.name.toLowerCase()}">
            <i class="fas fa-shopping-bag"></i> <span data-translate="add_to_cart">Add to Cart</span>
          </a>
          <a href="#" class="like-btn" data-product-id="${product.name.toLowerCase()}">
            <i class="far fa-heart"></i>
          </a>
        </div>
      `;
      
      productContainer.appendChild(productBox);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.cart-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.closest('.product-box').querySelector('strong').textContent;
        alert(`${productName} added to cart!`);
      });
    });
    
    document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.closest('.product-box').querySelector('strong').textContent;
        alert(`${productName} added to wishlist!`);
      });
    });
  }
});