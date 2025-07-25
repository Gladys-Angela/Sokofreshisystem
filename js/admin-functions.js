// Admin core functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on an admin page
  if (!window.location.pathname.includes('admin_')) return;
  
  // Get user roles map
  let userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
  
  // Add event listeners for admin actions
  setupAdminActions();
  
  // Setup modal functionality if modal exists
  setupModals();
  
  // Add user form submission
  const addUserForm = document.getElementById('add-user-form');
  if (addUserForm) {
    addUserForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('user-email').value.trim().toLowerCase();
      const role = document.getElementById('user-role').value;
      const password = document.getElementById('user-password').value;
      
      // Add user to Firebase Auth
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Add user to roles map
          userRolesMap[email] = role;
          localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
          
          // Close modal
          closeModal('add-user-modal');
          
          // Show success message
          showNotification('User added successfully!', 'success');
          
          // Reload page to show new user
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          console.error('Error adding user:', error);
          showNotification(`Error: ${error.message}`, 'error');
        });
    });
  }
  
  // Edit user form submission
  const editUserForm = document.getElementById('edit-user-form');
  if (editUserForm) {
    editUserForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('edit-user-email').value.trim().toLowerCase();
      const role = document.getElementById('edit-user-role').value;
      
      // Update user role
      userRolesMap[email] = role;
      localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
      
      // Close modal
      closeModal('edit-user-modal');
      
      // Show success message
      showNotification('User updated successfully!', 'success');
      
      // Reload page to show updated user
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }
  
  // Setup admin actions (view, edit, delete, approve, reject)
  function setupAdminActions() {
    // View user action
    document.addEventListener('click', function(e) {
      if (e.target.closest('.btn-view')) {
        e.preventDefault();
        const row = e.target.closest('tr');
        const email = row.querySelector('td:nth-child(3)').textContent;
        const role = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        // Show user details in a modal
        showUserDetails(email, role);
      }
    });
    
    // Edit user action
    document.addEventListener('click', function(e) {
      if (e.target.closest('.btn-edit')) {
        e.preventDefault();
        const row = e.target.closest('tr');
        const email = row.querySelector('td:nth-child(3)').textContent;
        const role = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        // Show edit user modal
        showEditUserModal(email, role);
      }
    });
    
    // Delete user action
    document.addEventListener('click', function(e) {
      if (e.target.closest('.btn-delete')) {
        e.preventDefault();
        const row = e.target.closest('tr');
        const email = row.querySelector('td:nth-child(3)').textContent;
        
        // Confirm deletion
        if (confirm(`Are you sure you want to delete user ${email}?`)) {
          // Remove user from roles map
          delete userRolesMap[email];
          localStorage.setItem('userRolesMap', JSON.stringify(userRolesMap));
          
          // Show success message
          showNotification('User deleted successfully!', 'success');
          
          // Remove row from table
          row.remove();
        }
      }
    });
    
    // Approve vendor action
    document.addEventListener('click', function(e) {
      if (e.target.closest('.btn-approve')) {
        e.preventDefault();
        const row = e.target.closest('tr');
        const storeName = row.querySelector('td:nth-child(2)').textContent;
        
        // Show success message
        showNotification(`Vendor "${storeName}" approved successfully!`, 'success');
        
        // Remove row from pending table
        row.remove();
      }
    });
    
    // Reject vendor action
    document.addEventListener('click', function(e) {
      if (e.target.closest('.btn-reject')) {
        e.preventDefault();
        const row = e.target.closest('tr');
        const storeName = row.querySelector('td:nth-child(2)').textContent;
        
        // Show success message
        showNotification(`Vendor "${storeName}" rejected!`, 'warning');
        
        // Remove row from pending table
        row.remove();
      }
    });
    
    // Add user button
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
      addUserBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showAddUserModal();
      });
    }
  }
  
  // Show user details modal
  function showUserDetails(email, role) {
    alert(`User Details:\nEmail: ${email}\nRole: ${role}`);
  }
  
  // Show edit user modal
  function showEditUserModal(email, role) {
    const editUserModal = document.getElementById('edit-user-modal');
    if (!editUserModal) {
      createEditUserModal();
    }
    
    document.getElementById('edit-user-email').value = email;
    document.getElementById('edit-user-role').value = role;
    
    openModal('edit-user-modal');
  }
  
  // Show add user modal
  function showAddUserModal() {
    const addUserModal = document.getElementById('add-user-modal');
    if (!addUserModal) {
      createAddUserModal();
    }
    
    openModal('add-user-modal');
  }
  
  // Create edit user modal if it doesn't exist
  function createEditUserModal() {
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
            <div class="form-group">
              <label for="edit-user-email">Email</label>
              <input type="email" id="edit-user-email" readonly>
            </div>
            <div class="form-group">
              <label for="edit-user-role">Role</label>
              <select id="edit-user-role">
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
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
  }
  
  // Create add user modal if it doesn't exist
  function createAddUserModal() {
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
  }
  
  // Add modal styles
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
  
  // Setup modals
  function setupModals() {
    // Close modal when clicking on X or Cancel
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('close') || e.target.classList.contains('close-modal')) {
        const modal = e.target.closest('.modal');
        if (modal) {
          closeModal(modal.id);
        }
      }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
      }
    });
  }
  
  // Open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  // Close modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  // Show notification
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
});