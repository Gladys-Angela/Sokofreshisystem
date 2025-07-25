/**
 * This script adds the isVisible field to all products in Firestore
 * Run this script once to update all existing products
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if Firebase is initialized
  if (typeof firebase === 'undefined' || !firebase.firestore) {
    console.error('Firebase is not initialized');
    return;
  }

  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = 'Checking products...';
  }

  // Function to add visibility field to all products
  async function addVisibilityToProducts() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.log('No user logged in. Please log in first.');
        if (statusElement) {
          statusElement.textContent = 'Please log in as admin first';
        }
        return;
      }

      // Check if user is admin
      const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
      const userRole = userDoc.data()?.role;

      if (userRole !== 'admin') {
        console.log('Only admins can update all products');
        if (statusElement) {
          statusElement.textContent = 'Only admins can update products';
        }
        return;
      }

      console.log('Starting product update...');
      if (statusElement) {
        statusElement.textContent = 'Starting product update...';
      }

      // Get all products without the visibility field
      const productsRef = firebase.firestore().collection('products');
      const snapshot = await productsRef.get();

      if (snapshot.empty) {
        console.log('No products found');
        if (statusElement) {
          statusElement.textContent = 'No products found';
        }
        return;
      }

      // Count products that need updating
      let updateCount = 0;
      let totalCount = snapshot.size;
      
      // Create a batch to update documents
      let batch = firebase.firestore().batch();
      let batchCount = 0;
      const BATCH_LIMIT = 500; // Firestore batch limit

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!('isVisible' in data)) {
          batch.update(doc.ref, { isVisible: true });
          updateCount++;
          batchCount++;
          
          // If we reach the batch limit, commit and create a new batch
          if (batchCount >= BATCH_LIMIT) {
            batch.commit();
            batch = firebase.firestore().batch();
            batchCount = 0;
          }
        }
      });

      // Commit any remaining updates
      if (batchCount > 0) {
        await batch.commit();
      }

      console.log(`Updated ${updateCount} out of ${totalCount} products`);
      if (statusElement) {
        statusElement.textContent = `Updated ${updateCount} out of ${totalCount} products`;
      }

      return updateCount;
    } catch (error) {
      console.error('Error updating products:', error);
      if (statusElement) {
        statusElement.textContent = `Error: ${error.message}`;
      }
    }
  }

  // Add button event listener if it exists
  const updateButton = document.getElementById('update-products-btn');
  if (updateButton) {
    updateButton.addEventListener('click', addVisibilityToProducts);
  } else {
    // Auto-run if no button is present
    addVisibilityToProducts();
  }
});

// Make function available globally
window.addVisibilityToProducts = function() {
  console.log('Running product visibility update...');
  // This will be called from the button click
};