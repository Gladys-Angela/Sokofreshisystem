// Firestore Security Rules Setup Guide
// Copy these rules to your Firebase Console > Firestore Database > Rules

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Allow users to read and write their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Allow any authenticated user to read the role field for role-based access control
      allow get: if request.auth != null;

      // Allow admins to read and write all user data
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Products collection - vendors can manage their own products
    match /products/{productId} {
      // Allow anyone to read products (for browsing)
      allow read: if true;
      
      // Allow vendors to create products
      allow create: if request.auth != null && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'vendor' &&
                       request.resource.data.vendorId == request.auth.uid;
      
      // Allow vendors to update/delete their own products
      allow update, delete: if request.auth != null && 
                               resource.data.vendorId == request.auth.uid &&
                               get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'vendor';
                               
      // Allow admins to manage all products
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Manual sales collection - vendors can manage their own sales
    match /manual_sales/{saleId} {
      allow read, write: if request.auth != null && 
                            resource.data.vendorId == request.auth.uid &&
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'vendor';
      allow create: if request.auth != null && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'vendor' &&
                       request.resource.data.vendorId == request.auth.uid;
    }
    
    // Reviews collection - authenticated users can read all, write their own
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                               resource.data.userId == request.auth.uid;
    }
    
    // Orders collection - users can manage their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
                            resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid;
    }
    
    // Admin access - admins can read/write everything
    match /{document=**} {
      allow read, write: if request.auth != null && 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
*/

console.log('Copy the rules above to your Firebase Console > Firestore Database > Rules');
console.log('Make sure to publish the rules after copying them.');

/**
 * Frequently Asked Questions (FAQ)
 * 
 * Q: How do I apply these Firestore security rules?
 * A: Copy the rules above and paste them into Firebase Console > Firestore Database > Rules section, 
 *    then click "Publish" to make them active.
 * 
 * Q: What permissions do these rules provide?
 * A: These rules implement role-based access control where:
 *    - Users can read/write only their own data
 *    - Vendors can manage their products and sales
 *    - Admins have full access to all collections
 *    - Anyone can read products and reviews
 * 
 * Q: How do I test if my rules are working correctly?
 * A: Use the testFirestorePermissions() function provided below to verify 
 *    permissions for the currently logged-in user.
 * 
 * Q: How do I set up user roles?
 * A: When creating a user document, include a "role" field with values like 
 *    "user", "vendor", or "admin" to control their access level.
 * 
 * Q: Are there any security considerations I should be aware of?
 * A: Always validate data on your server-side functions as well, as client-side 
 *    rules can be bypassed if your app has security vulnerabilities.
 */

// Function to test if the current user has the correct permissions
async function testFirestorePermissions() {
  try {
    const user = firebase.auth().currentUser;
    if (!user) {
      console.log('No user logged in');
      return;
    }
    
    console.log('Testing Firestore permissions for user:', user.uid);
    
    // Test reading user data
    try {
      const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
      console.log('✓ Can read user data');
      console.log('User role:', userDoc.data()?.role);
    } catch (error) {
      console.error('✗ Cannot read user data:', error);
    }
    
    // Test reading products
    try {
      const productsSnapshot = await firebase.firestore().collection('products').limit(1).get();
      console.log('✓ Can read products collection');
    } catch (error) {
      console.error('✗ Cannot read products collection:', error);
    }
    
    // Test vendor-specific product query
    try {
      const vendorProductsSnapshot = await firebase.firestore()
        .collection('products')
        .where('vendorId', '==', user.uid)
        .limit(1)
        .get();
      console.log('✓ Can query vendor products');
    } catch (error) {
      console.error('✗ Cannot query vendor products:', error);
    }
    
    // Test if products have visibility field
    try {
      const allProductsSnapshot = await firebase.firestore()
        .collection('products')
        .limit(5)
        .get();
      
      if (!allProductsSnapshot.empty) {
        console.log('Sample product fields:');
        const sampleProduct = allProductsSnapshot.docs[0].data();
        console.log(Object.keys(sampleProduct));
        console.log('Visibility field exists:', 'isVisible' in sampleProduct);
        
        // If visibility field doesn't exist, add it to products
        if (!('isVisible' in sampleProduct)) {
          console.log('Adding visibility field to products...');
          
          // Get user role to check if user is admin
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          const userRole = userDoc.data()?.role;
          
          if (userRole === 'admin') {
            // Update all products to add visibility field
            const batchSize = 500;
            const query = firebase.firestore().collection('products').limit(batchSize);
            
            return updateQueryBatch(query);
            
            async function updateQueryBatch(query) {
              const snapshot = await query.get();
              
              // When there are no documents left, we are done
              if (snapshot.size === 0) {
                console.log('Finished adding visibility field to all products');
                return;
              }
              
              // Create a batch to update documents
              const batch = firebase.firestore().batch();
              
              snapshot.docs.forEach((doc) => {
                batch.update(doc.ref, { isVisible: true });
              });
              
              // Commit the batch
              await batch.commit();
              console.log(`Updated ${snapshot.size} products with visibility field`);
              
              // Get the last document
              const last = snapshot.docs[snapshot.docs.length - 1];
              
              // Construct a new query starting after the last document
              const nextQuery = firebase.firestore()
                .collection('products')
                .startAfter(last)
                .limit(batchSize);
              
              // Call again with the new query
              return updateQueryBatch(nextQuery);
            }
          } else {
            console.log('User is not admin. Cannot update products.');
          }
        }
      }
    } catch (error) {
      console.error('Error checking product fields:', error);
    }
    
  } catch (error) {
    console.error('Error testing permissions:', error);
  }
}

// Make function available globally
window.testFirestorePermissions = testFirestorePermissions;