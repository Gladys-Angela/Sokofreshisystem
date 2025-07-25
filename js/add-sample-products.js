// This script adds sample products to Firestore for testing
// Run this script once to populate the database with sample products

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is a vendor
  auth.onAuthStateChanged(async user => {
    if (user) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'vendor') {
        // Add sample products
        const sampleProducts = [
          {
            name: 'Fresh Apples',
            price: 150,
            quantity: '1 KG',
            category: 'Fruits',
            imageUrl: 'images/apple.jpg',
            featured: true,
            vendorId: user.uid
          },
          {
            name: 'Organic Oranges',
            price: 180,
            quantity: '1 KG',
            category: 'Fruits',
            imageUrl: 'images/orange.jpg',
            featured: false,
            vendorId: user.uid
          },
          {
            name: 'Ripe Mangoes',
            price: 350,
            quantity: '1 KG',
            category: 'Fruits',
            imageUrl: 'images/mango.jpg',
            featured: true,
            vendorId: user.uid
          },
          {
            name: 'Fresh Tomatoes',
            price: 120,
            quantity: '1 KG',
            category: 'Vegetables',
            imageUrl: 'images/tomato.png',
            featured: false,
            vendorId: user.uid
          },
          {
            name: 'Red Onions',
            price: 100,
            quantity: '1 KG',
            category: 'Vegetables',
            imageUrl: 'images/onion.jpg',
            featured: false,
            vendorId: user.uid
          }
        ];
        
        // Add each product to Firestore
        for (const product of sampleProducts) {
          try {
            await db.collection('products').add({
              ...product,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Added sample product: ${product.name}`);
          } catch (error) {
            console.error(`Error adding ${product.name}:`, error);
          }
        }
        
        alert('Sample products have been added to your inventory!');
      }
    }
  });
});