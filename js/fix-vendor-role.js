// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendorRole() {
  const vendorEmail = 'levy@gmail.com';
  
  try {
    // First, try to find the user by email in Firestore
    const usersRef = firebase.firestore().collection('users');
    const querySnapshot = await usersRef.where('email', '==', vendorEmail).get();
    
    if (!querySnapshot.empty) {
      // User document exists, update the role
      querySnapshot.forEach(async (doc) => {
        await doc.ref.update({
          role: 'vendor',
          updatedAt: new Date()
        });
        console.log('Updated role for user:', doc.id);
        alert('Vendor role updated successfully for ' + vendorEmail);
      });
    } else {
      console.log('No user document found for:', vendorEmail);
      alert('User document not found. The user may need to register again or the role will be set during next login.');
    }
  } catch (error) {
    console.error('Error fixing vendor role:', error);
    alert('Error: ' + error.message);
  }
}

// Run the function
fixVendorRole();

// Utility script to fix vendor role for specific users
// Run this once in the browser console

async function fixVendor