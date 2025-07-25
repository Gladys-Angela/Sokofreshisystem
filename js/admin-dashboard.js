// Script to update admin dashboard with real data
document.addEventListener('DOMContentLoaded', function() {
  // Get user roles map
  const userRolesMap = JSON.parse(localStorage.getItem('userRolesMap') || '{}');
  
  // Count users by role
  let customerCount = 0;
  let vendorCount = 0;
  let adminCount = 0;
  
  Object.values(userRolesMap).forEach(role => {
    if (role === 'customer') customerCount++;
    else if (role === 'vendor') vendorCount++;
    else if (role === 'admin') adminCount++;
  });
  
  // Total users
  const totalUsers = customerCount + vendorCount + adminCount;
  
  // Update user count in dashboard
  const userCountElement = document.querySelector('.card-blue .card-value');
  if (userCountElement) {
    userCountElement.textContent = totalUsers || 1; // At least show 1 for admin
  }
  
  // Update vendor count in dashboard
  const vendorCountElement = document.querySelector('.card-red .card-value');
  if (vendorCountElement) {
    vendorCountElement.textContent = vendorCount || 0;
  }
  
  // Update recent users table
  updateRecentUsersTable();
  
  function updateRecentUsersTable() {
    const recentUsersTableBody = document.querySelector('#recent-users-table tbody');
    if (!recentUsersTableBody) return;
    
    // Clear existing rows
    recentUsersTableBody.innerHTML = '';
    
    // Add admin user
    const adminRow = document.createElement('tr');
    adminRow.innerHTML = `
      <td>#USR-1019</td>
      <td>Admin User</td>
      <td>admin@efresh.com</td>
      <td>Admin</td>
      <td>May 10, 2023</td>
      <td><span class="status status-active">Active</span></td>
      <td>
        <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
      </td>
    `;
    recentUsersTableBody.appendChild(adminRow);
    
    // Add recent users (up to 4)
    let count = 0;
    Object.entries(userRolesMap).forEach(([email, role]) => {
      // Skip admin user as we've already added it
      if (email === 'admin@efresh.com' || count >= 4) return;
      
      count++;
      
      // Extract name from email
      const name = email.split('@')[0].split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      // Random status
      const statuses = ['active', 'active', 'active', 'inactive', 'pending'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const statusClass = status === 'active' ? 'status-active' : 
                          status === 'pending' ? 'status-pending' : 'status-inactive';
      
      // Random date
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 10));
      const joinedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      const userRow = document.createElement('tr');
      userRow.innerHTML = `
        <td>#USR-${1020 + count}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${role.charAt(0).toUpperCase() + role.slice(1)}</td>
        <td>${joinedDate}</td>
        <td><span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        <td>
          <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
        </td>
      `;
      recentUsersTableBody.appendChild(userRow);
    });
    
    // If no additional users, add placeholder rows
    while (count < 4) {
      count++;
      const placeholderRow = document.createElement('tr');
      placeholderRow.innerHTML = `
        <td>#USR-${1020 + count}</td>
        <td>User ${count}</td>
        <td>user${count}@example.com</td>
        <td>Customer</td>
        <td>May ${10 - count}, 2023</td>
        <td><span class="status status-active">Active</span></td>
        <td>
          <a href="#" class="action-btn btn-view"><i class="fas fa-eye"></i> View</a>
        </td>
      `;
      recentUsersTableBody.appendChild(placeholderRow);
    }
  }
});