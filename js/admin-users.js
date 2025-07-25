// Script to load and display real registered users
document.addEventListener('DOMContentLoaded', function() {
  // Get the users table body
  const usersTableBody = document.querySelector('#users-table tbody');
  if (!usersTableBody) return;
  
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
  
  // Function to display users
  function displayUsers() {
    // Clear existing rows
    usersTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Loading users...</td></tr>';
    
    // Get all registered users from localStorage
    let users = [];
    
    // Add admin user (always present)
    users.push({
      id: 'admin-user',
      email: 'admin@efresh.com',
      role: 'admin',
      joinedDate: 'May 10, 2023',
      status: 'active'
    });
    
    // Add users from userRolesMap
    Object.entries(userRolesMap).forEach(([email, role]) => {
      // Skip admin user as we've already added it
      if (email === 'admin@efresh.com') return;
      
      users.push({
        id: `user-${Math.floor(Math.random() * 10000)}`,
        email: email,
        role: role,
        joinedDate: getCurrentDate(),
        status: 'active'
      });
    });
    
    // Get registered vendors from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const uniqueEmails = new Set();
    
    // Add emails from orders as customers if not already in users
    orders.forEach(order => {
      if (order.email && !uniqueEmails.has(order.email)) {
        uniqueEmails.add(order.email);
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === order.email);
        if (!existingUser) {
          users.push({
            id: `user-${Math.floor(Math.random() * 10000)}`,
            email: order.email,
            role: 'customer',
            joinedDate: order.date ? formatDate(new Date(order.date)) : getCurrentDate(),
            status: 'active'
          });
        }
      }
    });
    
    // Get vendors from localStorage
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    vendors.forEach(vendor => {
      if (vendor.email && !uniqueEmails.has(vendor.email)) {
        uniqueEmails.add(vendor.email);
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === vendor.email);
        if (!existingUser) {
          users.push({
            id: vendor.id || `vendor-${Math.floor(Math.random() * 10000)}`,
            email: vendor.email,
            role: 'vendor',
            joinedDate: vendor.joinedDate || getCurrentDate(),
            status: vendor.status || 'active'
          });
        }
      }
    });
    
    // Get all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    registeredUsers.forEach(user => {
      if (user.email && !uniqueEmails.has(user.email)) {
        uniqueEmails.add(user.email);
        
        users.push({
          id: user.id || `user-${Math.floor(Math.random() * 10000)}`,
          email: user.email,
          role: user.role || 'customer',
          joinedDate: user.joinedDate || getCurrentDate(),
          status: user.status || 'active'
        });
      }
    });
      
    // Clear loading message
    usersTableBody.innerHTML = '';
    
    // Display users
    if (users.length > 0) {
      users.forEach(user => {
        const userRow = createUserRow(user);
        usersTableBody.appendChild(userRow);
      });
    } else {
      // If no users, add a message
      const noUsersRow = document.createElement('tr');
      noUsersRow.innerHTML = `
        <td colspan="7" style="text-align: center; padding: 20px;">
          No users registered yet.
        </td>
      `;
      usersTableBody.appendChild(noUsersRow);
    }
  }
  
  // Function to create a user row
  function createUserRow(user) {
    const row = document.createElement('tr');
    row.dataset.id = user.id;
    row.dataset.email = user.email;
    row.dataset.role = user.role;
    
    // Extract name from email
    const name = user.email.split('@')[0].split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
    
    // Determine status class
    const statusClass = user.status === 'active' ? 'status-active' : 
                        user.status === 'pending' ? 'status-pending' : 'status-inactive';
    
    row.innerHTML = `
      <td>#${user.id}</td>
      <td>${name}</td>
      <td>${user.email}</td>
      <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
      <td>${user.joinedDate}</td>
      <td><span class="status ${statusClass}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
      <td>
        <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
        <a href="#" class="action-btn btn-edit"><i class="fas fa-edit"></i> Edit</a>
        ${user.role !== 'admin' ? '<a href="#" class="action-btn btn-delete"><i class="fas fa-trash"></i> Delete</a>' : ''}
      </td>
    `;
    
    // Add event listeners for actions
    const viewBtn = row.querySelector('.btn-view');
    const editBtn = row.querySelector('.btn-edit');
    const deleteBtn = row.querySelector('.btn-delete');
    
    if (viewBtn) {
      viewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showUserDetails(user);
      });
    }
    
    if (editBtn) {
      editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showEditUserModal(user);
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
          deleteUser(user.id, user.email, row);
        }
      });
    }
    
    return row;
  }
  
  // Function to show user details
  function showUserDetails(user) {
    // Create modal for user details
    const modal = document.createElement('div');
    modal.id = 'view-user-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>User Details</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="user-details">
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Role:</strong> ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            <p><strong>Joined Date:</strong> ${user.joinedDate}</p>
            <p><strong>Status:</strong> ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</p>
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
  
  // Function to show edit user modal
  function showEditUserModal(user) {
    // Create modal for editing user
    const modal = document.createElement('div');
    modal.id = 'edit-user-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit User</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form id="edit-user-form">
            <input type="hidden" id="edit-user-id" value="${user.id}">
            <div class="form-group">
              <label for="edit-user-email">Email</label>
              <input type="email" id="edit-user-email" value="${user.email}" readonly>
            </div>
            <div class="form-group">
              <label for="edit-user-role">Role</label>
              <select id="edit-user-role">
                <option value="customer" ${user.role === 'customer' ? 'selected' : ''}>Customer</option>
                <option value="vendor" ${user.role === 'vendor' ? 'selected' : ''}>Vendor</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-user-status">Status</label>
              <select id="edit-user-status">
                <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                <option value="pending" ${user.status === 'pending' ? 'selected' : ''}>Pending</option>
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
    const form = modal.querySelector('#edit-user-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const userId = document.getElementById('edit-user-id').value;
      const email = document.getElementById('edit-user-email').value;
      const role = document.getElementById('edit-user-role').value;
      const status = document.getElementById('edit-user-status').value;
      
      updateUser(userId, email, role, status, modal);
    });
  }
  
  // Function to update user
  async function updateUser(userId, email, role, status, modal) {
    try {
      // Update user in Firestore if available
      if (db) {
        await db.collection('users').doc(userId).update({
          userRole: role,
          status: status
        });
      }
      
      // Update user in localStorage as fallback
      const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
      userRolesMap[email] = role;
      localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
      
      // Close modal
      modal.remove();
      
      // Show success message
      showNotification('User updated successfully!', 'success');
      
      // Update user row in table
      const userRow = usersTableBody.querySelector(`tr[data-email="${email}"]`);
      if (userRow) {
        userRow.querySelector('td:nth-child(4)').textContent = role.charAt(0).toUpperCase() + role.slice(1);
        const statusSpan = userRow.querySelector('td:nth-child(6) .status');
        statusSpan.className = `status status-${status}`;
        statusSpan.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      } else {
        // Reload users if row not found
        displayUsers();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Error updating user. Please try again.', 'error');
    }
  }
  
  // Function to delete user
  async function deleteUser(userId, email, row) {
    try {
      // Delete user from Firestore if available
      if (db) {
        await db.collection('users').doc(userId).delete();
      }
      
      // Delete user from localStorage as fallback
      const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
      delete userRolesMap[email];
      localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
      
      // Show success message
      showNotification('User deleted successfully!', 'success');
      
      // Remove row from table
      row.remove();
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Error deleting user. Please try again.', 'error');
    }
  }
  
  // Function to add a new user
  document.addEventListener('click', function(e) {
    if (e.target.closest('#add-user-btn')) {
      e.preventDefault();
      showAddUserModal();
    }
  });
  
  // Function to show add user modal
  function showAddUserModal() {
    // Create modal for adding user
    const modal = document.createElement('div');
    modal.id = 'add-user-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add User</h2>
          <span class="close">&times;</span>
        </div>
        <div class="modal-body">
          <form id="add-user-form">
            <div class="form-group">
              <label for="user-email">Email</label>
              <input type="email" id="user-email" required>
            </div>
            <div class="form-group">
              <label for="user-role">Role</label>
              <select id="user-role">
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label for="user-password">Password</label>
              <input type="password" id="user-password" required>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary close-modal">Cancel</button>
              <button type="submit" class="btn-primary">Add User</button>
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
    const form = modal.querySelector('#add-user-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('user-email').value;
      const role = document.getElementById('user-role').value;
      const password = document.getElementById('user-password').value;
      
      addUser(email, role, password, modal);
    });
  }
  
  // Function to add user
  async function addUser(email, role, password, modal) {
    try {
      // Create user with Firebase Auth
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
      
      // Add user to Firestore if available
      if (db) {
        await db.collection('users').doc(userId).set({
          userEmail: email,
          userRole: role,
          status: 'active',
          createdAt: new Date()
        });
      }
      
      // Add user to localStorage as fallback
      const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
      userRolesMap[email] = role;
      localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
      
      // Close modal
      modal.remove();
      
      // Show success message
      showNotification('User added successfully!', 'success');
      
      // Reload users
      displayUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      showNotification(`Error adding user: ${error.message}`, 'error');
    }
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
      
      .user-details p {
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
  
  // Display users
  displayUsers();
});