// Product Manager - Handles product data persistence
const productManager = {
  // Store products in localStorage to persist between page navigations
  saveProduct: function(productId, productData) {
    // Get existing products or initialize empty object
    let products = JSON.parse(localStorage.getItem('efreshProducts') || '{}');
    
    // Update or add the product
    products[productId] = productData;
    
    // Save back to localStorage
    localStorage.setItem('efreshProducts', JSON.stringify(products));
    
    return true;
  },
  
  // Get all products from localStorage
  getAllProducts: function() {
    return JSON.parse(localStorage.getItem('efreshProducts') || '{}');
  },
  
  // Get a specific product
  getProduct: function(productId) {
    const products = this.getAllProducts();
    return products[productId];
  },
  
  // Delete a product
  deleteProduct: function(productId) {
    let products = this.getAllProducts();
    
    if (products[productId]) {
      delete products[productId];
      localStorage.setItem('efreshProducts', JSON.stringify(products));
      
      // Also delete from Firestore if available
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        firebase.firestore().collection('products').doc(productId).delete()
          .catch(error => console.error("Error deleting product from Firestore:", error));
      }
      
      return true;
    }
    
    return false;
  },
  
  // Load vendor products from Firestore
  loadVendorProducts: async function(vendorId) {
    if (typeof firebase === 'undefined' || !firebase.firestore) {
      return this.getAllProducts();
    }
    
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('products').where('vendorId', '==', vendorId).get();
      
      let products = {};
      snapshot.forEach(doc => {
        products[doc.id] = doc.data();
      });
      
      // Update localStorage with the latest data
      localStorage.setItem('efreshProducts', JSON.stringify(products));
      
      return products;
    } catch (error) {
      console.error("Error loading vendor products:", error);
      return this.getAllProducts();
    }
  }
};

// Initialize with default products if none exist
document.addEventListener('DOMContentLoaded', function() {
  const products = productManager.getAllProducts();
  
  if (Object.keys(products).length === 0) {
    // Add default products
    const defaultProducts = {
      'apple': {
        name: "Apple",
        price: 150,
        quantity: "1 KG",
        category: "Fruits",
        featured: true,
        isVisible: true,
        imageUrl: "images/apple.jpg"
      },
      'orange': {
        name: "Orange",
        price: 180,
        quantity: "1 KG",
        category: "Fruits",
        featured: false,
        isVisible: true,
        imageUrl: "images/orange.jpg"
      },
      'mango': {
        name: "Mango",
        price: 350,
        quantity: "1 KG",
        category: "Fruits",
        featured: true,
        isVisible: true,
        imageUrl: "images/mango.jpg"
      },
      'tomato': {
        name: "Tomato",
        price: 120,
        quantity: "1 KG",
        category: "Vegetables",
        featured: false,
        isVisible: true,
        imageUrl: "images/tomato.png"
      }
    };
    
    // Save default products
    Object.keys(defaultProducts).forEach(id => {
      productManager.saveProduct(id, defaultProducts[id]);
    });
  }
});