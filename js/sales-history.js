// Sales History JavaScript
document.addEventListener('DOMContentLoaded', function() {
  initializeSalesHistory();
});

function initializeSalesHistory() {
  // Set default date range (last 30 days)
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
  
  document.getElementById('date-to').value = today.toISOString().split('T')[0];
  document.getElementById('date-from').value = thirtyDaysAgo.toISOString().split('T')[0];
  
  // Initialize event listeners
  document.getElementById('filter-btn').addEventListener('click', applyFilters);
  document.getElementById('export-btn').addEventListener('click', exportToCSV);
  document.getElementById('refresh-btn').addEventListener('click', loadSalesData);
  document.getElementById('close-modal').addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  document.getElementById('sale-details-modal').addEventListener('click', (e) => {
    if (e.target.id === 'sale-details-modal') {
      closeModal();
    }
  });
  
  // Load sales data
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loadSalesData(user.uid);
    } else {
      window.location.href = 'login.html';
    }
  });
}

let allSalesData = [];
let filteredSalesData = [];

async function loadSalesData(userId) {
  const loadingElement = document.getElementById('loading');
  const tableContainer = document.getElementById('table-container');
  const emptyState = document.getElementById('empty-state');

  // Show loading state
  loadingElement.style.display = 'block';
  tableContainer.style.display = 'none';
  emptyState.style.display = 'none';

  try {
    // Get sales from Firestore
    const salesSnapshot = await firebase.firestore()
      .collection('manual_sales')
      .where('vendorId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    console.log('Sales loaded from Firestore:', salesSnapshot.size);

    // Process sales data
    allSalesData = salesSnapshot.docs.map(doc => {
      const sale = doc.data();
      return {
        id: doc.id,
        type: 'manual',
        date: sale.createdAt.toDate().toISOString(),
        customer: sale.customerName || 'Walk-in Customer',
        items: sale.items || [],
        totalAmount: sale.totalAmount || 0,
        paymentMethod: sale.paymentMethod || 'cash',
        notes: sale.notes || ''
      };
    });

    // Hide loading
    loadingElement.style.display = 'none';

    // Update statistics
    updateSalesStatistics();

    // Apply initial filters
    applyFilters();

  } catch (error) {
    console.error('Error loading sales data:', error);
    loadingElement.style.display = 'none';
    showError('Error loading sales data. Please try again.');
  }
}

function updateSalesStatistics() {
  const totalManual = allSalesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
  
  document.getElementById('total-online-sales').textContent = `Ksh 0.00`;
  document.getElementById('total-manual-sales').textContent = `Ksh ${totalManual.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
  document.getElementById('total-combined-sales').textContent = `Ksh ${totalManual.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function applyFilters() {
  const dateFrom = document.getElementById('date-from').value;
  const dateTo = document.getElementById('date-to').value;
  const saleType = document.getElementById('sale-type').value;
  
  filteredSalesData = allSalesData.filter(sale => {
    // Date filter
    if (dateFrom) {
      const saleDate = new Date(sale.date);
      const fromDate = new Date(dateFrom);
      if (saleDate < fromDate) return false;
    }
    
    if (dateTo) {
      const saleDate = new Date(sale.date);
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      if (saleDate > toDate) return false;
    }
    
    // Type filter
    if (saleType !== 'all' && sale.type !== saleType) {
      return false;
    }
    
    return true;
  });
  
  renderSalesTable();
}

function renderSalesTable() {
  const tableContainer = document.getElementById('table-container');
  const emptyState = document.getElementById('empty-state');
  const salesTbody = document.getElementById('sales-tbody');
  const salesCount = document.getElementById('sales-count');
  
  if (filteredSalesData.length === 0) {
    tableContainer.style.display = 'none';
    emptyState.style.display = 'block';
    salesCount.textContent = '0 sales found';
    return;
  }
  
  tableContainer.style.display = 'block';
  emptyState.style.display = 'none';
  salesCount.textContent = `${filteredSalesData.length} sales found`;
  
  salesTbody.innerHTML = '';
  
  filteredSalesData.forEach((sale) => {
    const row = createSaleRow(sale);
    salesTbody.appendChild(row);
  });

  // Add event listeners to view buttons
  document.querySelectorAll('.btn-view').forEach(button => {
    button.addEventListener('click', (e) => {
      const saleId = e.currentTarget.dataset.saleId;
      viewSaleDetails(saleId);
    });
  });
}

function createSaleRow(sale) {
  const row = document.createElement('tr');
  
  // Format date
  const formattedDate = new Date(sale.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Format products
  const productsList = sale.items.map(item => 
    `${item.name} (${item.quantity})`
  ).join(', ');
  
  // Payment method icon
  const paymentIcon = getPaymentIcon(sale.paymentMethod);
  
  row.innerHTML = `
    <td>
      <div class="sale-id">#${sale.id.substring(0, 8)}</div>
    </td>
    <td>
      <div class="sale-date">${formattedDate}</div>
    </td>
    <td>${sale.customer}</td>
    <td>
      <div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" 
           title="${productsList}">
        ${productsList}
      </div>
    </td>
    <td>
      <div class="sale-amount">Ksh ${sale.totalAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</div>
    </td>
    <td>
      <div class="payment-method">
        <div class="payment-icon ${getPaymentClass(sale.paymentMethod)}">
          ${paymentIcon}
        </div>
        ${sale.paymentMethod.toUpperCase()}
      </div>
    </td>
    <td>
      <span class="sale-type type-manual">MANUAL</span>
    </td>
    <td>
      <button class="action-btn btn-view" data-sale-id="${sale.id}">
        <i class="fas fa-eye"></i> View
      </button>
    </td>
  `;
  
  return row;
}

function getPaymentIcon(method) {
  switch (method.toLowerCase()) {
    case 'cash': return '<i class="fas fa-money-bill"></i>';
    case 'mpesa': return '<i class="fas fa-mobile-alt"></i>';
    case 'card': return '<i class="fas fa-credit-card"></i>';
    case 'bank-transfer': return '<i class="fas fa-university"></i>';
    default: return '<i class="fas fa-question"></i>';
  }
}

function getPaymentClass(method) {
  switch (method.toLowerCase()) {
    case 'cash': return 'payment-cash';
    case 'mpesa': return 'payment-mpesa';
    case 'card': 
    case 'bank-transfer': return 'payment-card';
    default: return 'payment-cash';
  }
}

function viewSaleDetails(saleId) {
  const sale = allSalesData.find(s => s.id === saleId);
  if (!sale) {
    console.error('Sale not found:', saleId);
    return;
  }

  const modal = document.getElementById('sale-details-modal');
  const modalContent = document.getElementById('modal-content');
  
  const formattedDate = new Date(sale.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  modalContent.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.5rem; color: #2d3748;">Sale Information</h4>
      <div style="background: #f8fafc; padding: 1rem; border-radius: 8px;">
        <p><strong>Sale ID:</strong> #${sale.id}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Customer:</strong> ${sale.customer}</p>
        <p><strong>Payment Method:</strong> ${sale.paymentMethod.toUpperCase()}</p>
        <p><strong>Type:</strong> MANUAL</p>
        ${sale.notes ? `<p><strong>Notes:</strong> ${sale.notes}</p>` : ''}
      </div>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.5rem; color: #2d3748;">Items Sold</h4>
      <div style="background: #f8fafc; border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #e2e8f0;">
              <th style="padding: 0.75rem; text-align: left; font-size: 0.875rem;">Product</th>
              <th style="padding: 0.75rem; text-align: center; font-size: 0.875rem;">Qty</th>
              <th style="padding: 0.75rem; text-align: right; font-size: 0.875rem;">Price</th>
              <th style="padding: 0.75rem; text-align: right; font-size: 0.875rem;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${sale.items.map(item => `
              <tr>
                <td style="padding: 0.75rem; border-top: 1px solid #e2e8f0;">${item.name}</td>
                <td style="padding: 0.75rem; text-align: center; border-top: 1px solid #e2e8f0;">${item.quantity}</td>
                <td style="padding: 0.75rem; text-align: right; border-top: 1px solid #e2e8f0;">Ksh ${parseFloat(item.price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</td>
                <td style="padding: 0.75rem; text-align: right; border-top: 1px solid #e2e8f0; font-weight: 600;">Ksh ${(item.price * item.quantity).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #e2e8f0; font-weight: 600;">
              <td colspan="3" style="padding: 0.75rem; text-align: right;">Total Amount:</td>
              <td style="padding: 0.75rem; text-align: right; color: #38a169;">Ksh ${sale.totalAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('sale-details-modal').style.display = 'none';
}

function exportToCSV() {
  if (filteredSalesData.length === 0) {
    alert('No data to export. Please adjust your filters.');
    return;
  }
  
  const headers = ['Sale ID', 'Date', 'Customer', 'Products', 'Amount', 'Payment Method', 'Type'];
  const csvContent = [
    headers.join(','),
    ...filteredSalesData.map(sale => {
      const formattedDate = new Date(sale.date).toLocaleDateString();
      const productsList = sale.items.map(item => 
        `${item.name} (${item.quantity})`
      ).join('; ');
      
      return [
        `#${sale.id}`,
        formattedDate,
        `"${sale.customer}"`,
        `"${productsList}"`,
        sale.totalAmount.toFixed(2),
        sale.paymentMethod,
        'MANUAL'
      ].join(',');
    })
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sales-history-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showSuccessToast('Sales data exported successfully!');
}

function showError(message) {
  const loadingElement = document.getElementById('loading');
  loadingElement.innerHTML = `
    <div style="text-align: center; padding: 3rem; color: #e53e3e;">
      <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
      <h3>Error</h3>
      <p>${message}</p>
      <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
        <i class="fas fa-refresh"></i> Try Again
      </button>
    </div>
  `;
}

function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Make functions globally available
window.viewSaleDetails = viewSaleDetails;