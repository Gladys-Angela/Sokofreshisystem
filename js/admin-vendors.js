// Script to load and display real vendors
document.addEventListener('DOMContentLoaded', function() {
  // Get the vendors table bodies
  const pendingVendorsTableBody = document.querySelector('#pending-vendors-table tbody');
  const allVendorsTableBody = document.querySelector('#all-vendors-table tbody');
  if (!pendingVendorsTableBody || !allVendorsTableBody) return;
  
  // Get Firestore instance
  let db;
  try {
    if (firebase && firebase.firestore) {
      db = firebase.firestore();
    }
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
  
  // Get stored user roles map as fallback
  const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
  
  // Function to display vendors
  async function displayVendors() {
    // Clear existing rows and show loading
    pendingVendorsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Loading pending vendors...</td></tr>';
    allVendorsTableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Loading vendors...</td></tr>';
    
    try {
      let pendingVendors = [];
      let approvedVendors = [];
      
      // Try to get vendors from Firestore first
      try {
        if (db) {
          // Get all vendors first
          const vendorsSnapshot = await db.collection('users')
            .where('userRole', '==', 'vendor')
            .get();
          
          if (!vendorsSnapshot.empty) {
            vendorsSnapshot.forEach(doc => {
              const vendorData = doc.data();
              const isApproved = vendorData.approved === true;
              
              const vendorObj = {
                id: doc.id,
                email: vendorData.userEmail || vendorData.email || '',
                storeName: vendorData.storeName || '',
                storeCategory: vendorData.storeCategory || '',
                joinedDate: vendorData.createdAt ? 
                  formatDate(vendorData.createdAt instanceof Date ? vendorData.createdAt : new Date(vendorData.createdAt)) : 
                  getCurrentDate()
              };
              
              if (isApproved) {
                approvedVendors.push({
                  ...vendorObj,
                  productsCount: vendorData.productsCount || Math.floor(10 + Math.random() * 40),
                  revenue: vendorData.revenue || Math.floor(20000 + Math.random() * 80000),
                  status: vendorData.status || 'active'
                });
              } else {
                pendingVendors.push(vendorObj);
              }
            });
          }
        }
      } catch (firestoreError) {
        console.error('Error fetching vendors from Firestore:', firestoreError);
      }
      
      // Always check localStorage for vendors regardless of Firestore results
      // This ensures we show all vendors, including those added locally
      const storedVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      console.log('Found vendors in localStorage:', storedVendors);
      
      if (storedVendors.length > 0) {
        storedVendors.forEach(vendor => {
          // Check if vendor is pending or approved
          const isPending = vendor.status === 'pending';
          
          if (isPending) {
            pendingVendors.push({
              id: vendor.id || `VND-${Math.floor(1000 + Math.random() * 9000)}`,
              email: vendor.email,
              storeName: vendor.storeName || generateStoreName(vendor.email),
              storeCategory: vendor.storeCategory || getRandomCategory(),
              joinedDate: vendor.joinedDate ? formatDate(new Date(vendor.joinedDate)) : getCurrentDate()
            });
          } else {
            approvedVendors.push({
              id: vendor.id || `VND-${Math.floor(1000 + Math.random() * 9000)}`,
              email: vendor.email,
              storeName: vendor.storeName || generateStoreName(vendor.email),
              storeCategory: vendor.storeCategory || getRandomCategory(),
              productsCount: vendor.productsCount || Math.floor(10 + Math.random() * 40),
              revenue: vendor.revenue || Math.floor(20000 + Math.random() * 80000),
              status: vendor.status || 'active',
              joinedDate: vendor.joinedDate ? formatDate(new Date(vendor.joinedDate)) : getCurrentDate()
            });
          }
        });
      }
      
      // If still no vendors, fallback to userRolesMap
      if (pendingVendors.length === 0 && approvedVendors.length === 0) {
        // Fallback to userRolesMap if no vendors found in localStorage
        console.log('No vendors found in localStorage, using userRolesMap');
        Object.entries(userRolesMap).forEach(([email, role]) => {
          // Only process vendors
          if (role !== 'vendor') return;
          
          // Randomly determine if this is a pending vendor (for demo purposes)
          const isPending = email.includes('new') || email.includes('pending') || Math.random() < 0.2;
          
          if (isPending) {
            pendingVendors.push({
              id: `VND-${Math.floor(1000 + Math.random() * 9000)}`,
              email: email,
              storeName: generateStoreName(email),
              storeCategory: getRandomCategory(),
              joinedDate: getCurrentDate()
            });
          } else {
            approvedVendors.push({
              id: `VND-${Math.floor(1000 + Math.random() * 9000)}`,
              email: email,
              storeName: generateStoreName(email),
              storeCategory: getRandomCategory(),
              productsCount: Math.floor(10 + Math.random() * 40),
              revenue: Math.floor(20000 + Math.random() * 80000),
              status: Math.random() > 0.2 ? 'active' : 'inactive',
              joinedDate: getCurrentDate()
            });
          }
        });
      }
      
      // Clear loading messages
      pendingVendorsTableBody.innerHTML = '';
      allVendorsTableBody.innerHTML = '';
      
      // Display pending vendors
      if (pendingVendors.length > 0) {
        pendingVendors.forEach(vendor => {
          const pendingRow = createPendingVendorRow(vendor);
          pendingVendorsTableBody.appendChild(pendingRow);
        });
      } else {
        // If no pending vendors, add a message
        const noPendingRow = document.createElement('tr');
        noPendingRow.innerHTML = `
          <td colspan="6" style="text-align: center; padding: 20px;">
            No pending vendor approvals.
          </td>
        `;
        pendingVendorsTableBody.appendChild(noPendingRow);
      }
      
      // Display approved vendors
      if (approvedVendors.length > 0) {
        approvedVendors.forEach(vendor => {
          const vendorRow = createVendorRow(vendor);
          allVendorsTableBody.appendChild(vendorRow);
        });
      } else {
        // If no vendors, add a message
        const noVendorsRow = document.createElement('tr');
        noVendorsRow.innerHTML = `
          <td colspan="8" style="text-align: center; padding: 20px;">
            No approved vendors yet.
          </td>
        `;
        allVendorsTableBody.appendChild(noVendorsRow);
      }
    } catch (error) {
      console.error('Error loading vendors:', error);
      pendingVendorsTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 20px; color: #dc3545;">
            <i class="fas fa-exclamation-circle"></i> Error loading pending vendors. Please try again.
          </td>
        </tr>
      `;
      allVendorsTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 20px; color: #dc3545;">
            <i class="fas fa-exclamation-circle"></i> Error loading vendors. Please try again.
          </td>
        </tr>
      `;
    }
  }
  
  // Function to create a pending vendor row
  function createPendingVendorRow(vendor) {
    const row = document.createElement('tr');
    row.dataset.id = vendor.id;
    row.dataset.email = vendor.email;
    
    // Extract name from email if not provided
    const name = extractNameFromEmail(vendor.email);
    
    // Use provided store name or generate one
    const storeName = vendor.storeName || `${name}'s Store`;
    
    // Use provided category or default
    const category = vendor.storeCategory || getRandomCategory();
    
    row.innerHTML = `
      <td>#${vendor.id}</td>
      <td>${storeName}</td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${vendor.joinedDate}</td>
      <td>
        <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
        <a href="#" class="action-btn btn-approve"><i class="fas fa-check"></i> Approve</a>
        <a href="#" class="action-btn btn-reject"><i class="fas fa-times"></i> Reject</a>
      </td>
    `;
    
    // Add event listeners for actions
    const viewBtn = row.querySelector('.btn-view');
    const approveBtn = row.querySelector('.btn-approve');
    const rejectBtn = row.querySelector('.btn-reject');
    
    if (viewBtn) {
      viewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showVendorDetails(vendor);
      });
    }
    
    if (approveBtn) {
      approveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        approveVendor(vendor.id, row);
      });
    }
    
    if (rejectBtn) {
      rejectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        rejectVendor(vendor.id, row);
      });
    }
    
    return row;
  }
  
  // Function to create a vendor row
  function createVendorRow(vendor) {
    const row = document.createElement('tr');
    row.dataset.id = vendor.id;
    row.dataset.email = vendor.email;
    
    // Extract name from email if not provided
    const name = extractNameFromEmail(vendor.email);
    
    // Use provided store name or generate one
    const storeName = vendor.storeName || `${name}'s Store`;
    
    // Use provided category or default
    const category = vendor.storeCategory || getRandomCategory();
    
    // Use provided status or default
    const status = vendor.status || 'active';
    const statusClass = status === 'active' ? 'status-active' : 'status-inactive';
    
    row.innerHTML = `
      <td>#${vendor.id}</td>
      <td>${storeName}</td>
      <td>${name}</td>
      <td>${category}</td>
      <td>${vendor.productsCount || 0}</td>
      <td>Ksh ${(vendor.revenue || 0).toLocaleString()}</td>
      <td><span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
      <td>
        <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
        <a href="#" class="action-btn btn-edit"><i class="fas fa-edit"></i> Edit</a>
        <a href="#" class="action-btn btn-delete"><i class="fas fa-trash"></i> Delete</a>
      </td>
    `;
    
    // Add event listeners for actions
    const viewBtn = row.querySelector('.btn-view');
    const editBtn = row.querySelector('.btn-edit');
    const deleteBtn = row.querySelector('.btn-delete');
    
    if (viewBtn) {
      viewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showVendorDetails(vendor);
      });
    }
    
    if (editBtn) {
      editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showEditVendorModal(vendor);
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete vendor ${storeName}?`)) {
          deleteVendor(vendor.id, row);
        }
      });
    }
    
    return row;
  }
  
  // Function to show vendor details
  function showVendorDetails(vendor) {
    // Create modal for vendor details
    const modal = document.createElement('div');
    modal.id = 'view-vendor-modal';
    modal.className = 'modal';
    
    // Extract name from email if not provided
    const name = extractNameFromEmail(vendor.email);
    
    // Use provided store name or generate one
    const storeName = vendor.storeName || `${name}'s Store`;
    
    // Use provided category or default
    const category = vendor.storeCategory || getRandomCategory();
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Vendor Details</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="vendor-details">
            <p><strong>ID:</strong> ${vendor.id}</p>
            <p><strong>Store Name:</strong> ${storeName}</p>
            <p><strong>Owner:</strong> ${name}</p>
            <p><strong>Email:</strong> ${vendor.email}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Joined Date:</strong> ${vendor.joinedDate}</p>
            ${vendor.status ? `<p><strong>Status:</strong> ${vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}</p>` : ''}
            ${vendor.productsCount ? `<p><strong>Products:</strong> ${vendor.productsCount}</p>` : ''}
            ${vendor.revenue ? `<p><strong>Revenue:</strong> Ksh ${vendor.revenue.toLocaleString()}</p>` : ''}
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary close-modal">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add modal styles if not already added
    addModalStyles();
    
    // Show modal
    modal.style.display = 'block';
    
    // Close modal when clicking on X or Close button
    modal.querySelector('.close').addEventListener('click', function() {
      modal.remove();
    });
    
    modal.querySelector('.close-modal').addEventListener('click', function() {
      modal.remove();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
  
  // Function to show edit vendor modal
  function showEditVendorModal(vendor) {
    // Create modal for editing vendor
    const modal = document.createElement('div');
    modal.id = 'edit-vendor-modal';
    modal.className = 'modal';
    
    // Extract name from email if not provided
    const name = extractNameFromEmail(vendor.email);
    
    // Use provided store name or generate one
    const storeName = vendor.storeName || `${name}'s Store`;
    
    // Use provided category or default
    const category = vendor.storeCategory || getRandomCategory();
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit Vendor</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form id="edit-vendor-form">
            <input type="hidden" id="edit-vendor-id" value="${vendor.id}">
            <div class="form-group">
              <label for="edit-vendor-email">Email</label>
              <input type="email" id="edit-vendor-email" value="${vendor.email}" readonly>
            </div>
            <div class="form-group">
              <label for="edit-vendor-store-name">Store Name</label>
              <input type="text" id="edit-vendor-store-name" value="${storeName}" required>
            </div>
            <div class="form-group">
              <label for="edit-vendor-category">Category</label>
              <select id="edit-vendor-category">
                <option value="Fruits" ${category === 'Fruits' ? 'selected' : ''}>Fruits</option>
                <option value="Vegetables" ${category === 'Vegetables' ? 'selected' : ''}>Vegetables</option>
                <option value="Fish & Meat" ${category === 'Fish & Meat' ? 'selected' : ''}>Fish & Meat</option>
                <option value="Spices" ${category === 'Spices' ? 'selected' : ''}>Spices</option>
                <option value="Mixed Products" ${category === 'Mixed Products' ? 'selected' : ''}>Mixed Products</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-vendor-status">Status</label>
              <select id="edit-vendor-status">
                <option value="active" ${vendor.status === 'active' ? 'selected' : ''}>Active</option>
                <option value="inactive" ${vendor.status === 'inactive' ? 'selected' : ''}>Inactive</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary close-modal">Cancel</button>
              <button type="submit" class="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add modal styles if not already added
    addModalStyles();
    
    // Show modal
    modal.style.display = 'block';
    
    // Close modal when clicking on X or Cancel button
    modal.querySelector('.close').addEventListener('click', function() {
      modal.remove();
    });
    
    modal.querySelector('.close-modal').addEventListener('click', function() {
      modal.remove();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Handle form submission
    const form = modal.querySelector('#edit-vendor-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const vendorId = document.getElementById('edit-vendor-id').value;
      const email = document.getElementById('edit-vendor-email').value;
      const storeName = document.getElementById('edit-vendor-store-name').value;
      const category = document.getElementById('edit-vendor-category').value;
      const status = document.getElementById('edit-vendor-status').value;
      
      updateVendor(vendorId, email, storeName, category, status, modal);
    });
  }
  
  // Function to approve vendor
  async function approveVendor(vendorId, row) {
    try {
      // Update vendor in Firestore if available
      if (db) {
        await db.collection('users').doc(vendorId).update({
          approved: true,
          status: 'active'
        });
      }
      
      // Show success message
      showNotification('Vendor approved successfully!', 'success');
      
      // Remove row from pending table
      row.remove();
      
      // Reload vendors to show in approved list
      displayVendors();
    } catch (error) {
      console.error('Error approving vendor:', error);
      showNotification('Error approving vendor. Please try again.', 'error');
    }
  }
  
  // Function to reject vendor
  async function rejectVendor(vendorId, row) {
    try {
      // Update vendor in Firestore if available
      if (db) {
        await db.collection('users').doc(vendorId).update({
          approved: false,
          status: 'rejected'
        });
      }
      
      // Show success message
      showNotification('Vendor rejected successfully!', 'warning');
      
      // Remove row from pending table
      row.remove();
    } catch (error) {
      console.error('Error rejecting vendor:', error);
      showNotification('Error rejecting vendor. Please try again.', 'error');
    }
  }
  
  // Function to update vendor
  async function updateVendor(vendorId, email, storeName, category, status, modal) {
    try {
      // Update vendor in Firestore if available
      if (db) {
        await db.collection('users').doc(vendorId).update({
          storeName: storeName,
          storeCategory: category,
          status: status
        });
      }
      
      // Close modal
      modal.remove();
      
      // Show success message
      showNotification('Vendor updated successfully!', 'success');
      
      // Reload vendors
      displayVendors();
    } catch (error) {
      console.error('Error updating vendor:', error);
      showNotification('Error updating vendor. Please try again.', 'error');
    }
  }
  
  // Function to delete vendor
  async function deleteVendor(vendorId, row) {
    try {
      // Delete vendor from Firestore if available
      if (db) {
        await db.collection('users').doc(vendorId).delete();
      }
      
      // Show success message
      showNotification('Vendor deleted successfully!', 'success');
      
      // Remove row from table
      row.remove();
    } catch (error) {
      console.error('Error deleting vendor:', error);
      showNotification('Error deleting vendor. Please try again.', 'error');
    }
  }
  
  // Helper function to extract name from email
  function extractNameFromEmail(email) {
    return email.split('@')[0].split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
  }
  
  // Helper function to generate store name
  function generateStoreName(email) {
    const name = extractNameFromEmail(email);
    return `${name}'s Store`;
  }
  
  // Helper function to get random category
  function getRandomCategory() {
    const categories = ['Fruits', 'Vegetables', 'Fish & Meat', 'Spices', 'Mixed Products'];
    return categories[Math.floor(Math.random() * categories.length)];
  }
  
  // Helper function to get current date in format "Month DD, YYYY"
  function getCurrentDate() {
    const date = new Date();
    return formatDate(date);
  }
  
  // Helper function to format date
  function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
  
  // Helper function to add modal styles
  function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
      }
      
      .modal-content {
        background-color: white;
        margin: 10% auto;
        padding: 0;
        width: 50%;
        max-width: 500px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      }
      
      .modal-header {
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-header h2 {
        margin: 0;
        font-size: 20px;
      }
      
      .modal-body {
        padding: 20px;
      }
      
      .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }
      
      .close:hover {
        color: #333;
      }
      
      .form-group {
        margin-bottom: 15px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
      }
      
      .form-group input, .form-group select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }
      
      .btn-primary {
        background-color: #00b761;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .btn-secondary {
        background-color: #f1f1f1;
        color: #333;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .vendor-details p {
        margin-bottom: 10px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Helper function to show notification
  function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 5px;
          color: white;
          font-weight: 500;
          z-index: 1001;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(-20px);
        }
        
        .notification.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .notification.success {
          background-color: #28a745;
        }
        
        .notification.error {
          background-color: #dc3545;
        }
        
        .notification.warning {
          background-color: #ffc107;
          color: #333;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Function to check localStorage data
  function checkLocalStorageData() {
    console.log('Checking localStorage data:');
    console.log('userRolesMap:', JSON.parse(localStorage.getItem('userRolesMap') || '{}'));
    console.log('registeredUsers:', JSON.parse(localStorage.getItem('registeredUsers') || '[]'));
    console.log('vendors:', JSON.parse(localStorage.getItem('vendors') || '[]'));
  }
  
  // Function to add test vendors to localStorage
  function addTestVendors() {
    // Create test vendors
    const testVendors = [
      {
        id: 'vendor-' + Date.now(),
        email: 'fruits@vendor.com',
        storeName: 'Fresh Fruits Store',
        storeCategory: 'Fruits',
        joinedDate: new Date().toISOString(),
        status: 'active',
        productsCount: 25,
        revenue: 45000
      },
      {
        id: 'vendor-' + (Date.now() + 1),
        email: 'vegetables@vendor.com',
        storeName: 'Green Vegetables',
        storeCategory: 'Vegetables',
        joinedDate: new Date().toISOString(),
        status: 'active',
        productsCount: 18,
        revenue: 32000
      },
      {
        id: 'vendor-' + (Date.now() + 2),
        email: 'pending@vendor.com',
        storeName: 'New Vendor Store',
        storeCategory: 'Mixed Products',
        joinedDate: new Date().toISOString(),
        status: 'pending'
      }
    ];
    
    // Save to localStorage
    localStorage.setItem('vendors', JSON.stringify(testVendors));
    
    // Also update userRolesMap for compatibility
    const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
    testVendors.forEach(vendor => {
      userRolesMap[vendor.email] = 'vendor';
    });
    localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
    
    console.log('Test vendors added to localStorage');
    displayVendors(); // Refresh the display
  }
  
  // Add debug buttons to the page
  function addDebugButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.bottom = '20px';
    buttonContainer.style.right = '20px';
    buttonContainer.style.zIndex = '1000';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '10px';
    
    const checkButton = document.createElement('button');
    checkButton.textContent = 'Debug: Check Data';
    checkButton.style.padding = '10px';
    checkButton.style.backgroundColor = '#f1f1f1';
    checkButton.style.border = '1px solid #ddd';
    checkButton.style.borderRadius = '5px';
    checkButton.style.cursor = 'pointer';
    
    checkButton.addEventListener('click', function() {
      checkLocalStorageData();
      displayVendors(); // Refresh the display
    });
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Debug: Add Test Vendors';
    addButton.style.padding = '10px';
    addButton.style.backgroundColor = '#d4edda';
    addButton.style.border = '1px solid #c3e6cb';
    addButton.style.borderRadius = '5px';
    addButton.style.cursor = 'pointer';
    
    addButton.addEventListener('click', function() {
      addTestVendors();
    });
    
    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(addButton);
    document.body.appendChild(buttonContainer);
  }
  
  // Check localStorage data on page load
  checkLocalStorageData();
  
  // Add debug buttons
  addDebugButtons();
  
  // Display vendors
  displayVendors();
});