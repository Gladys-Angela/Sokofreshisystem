/**
 * Record Sales JavaScript
 * Handles recording manual sales and updating product stock
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the record sales page
  if (!document.getElementById('record-sale-form')) return;
  
  // Initialize the sales form
  initSalesForm();
});

function initSalesForm() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      loadVendorProducts(user.uid);
      setupFormListeners();
    } else {
      // User is not signed in.
      window.location.href = 'login.html';
    }
  });
}

function setupFormListeners() {
  const form = document.getElementById('record-sale-form');
  if (form) {
    form.addEventListener('submit', handleSaleSubmission);
  }

  const addItemBtn = document.getElementById('add-item-btn');
  if (addItemBtn) {
    addItemBtn.addEventListener('click', addItemRow);
  }

  const paymentMethod = document.getElementById('payment-method');
  if (paymentMethod) {
    paymentMethod.addEventListener('change', validateForm);
  }

  const customerName = document.getElementById('customer-name');
  if (customerName) {
    customerName.addEventListener('input', validateForm);
  }

  const saleDate = document.getElementById('sale-date');
  if (saleDate) {
    saleDate.valueAsDate = new Date();
    saleDate.addEventListener('change', validateForm);
  }

  validateForm();
}

function validateForm() {
  const customerName = document.getElementById('customer-name').value;
  const saleDate = document.getElementById('sale-date').value;
  const paymentMethod = document.getElementById('payment-method').value;
  const itemRows = document.querySelectorAll('.item-row');
  
  const isValid = customerName && saleDate && paymentMethod && itemRows.length > 0;
  
  const submitButton = document.getElementById('submit-button');
  if (submitButton) {
    submitButton.disabled = !isValid;
  }
  
  return isValid;
}

async function loadVendorProducts(vendorId) {
  try {
    // Get products from Firestore
    const productsSnapshot = await firebase.firestore()
      .collection('products')
      .where('vendorId', '==', vendorId)
      .get();
    
    const productSelect = document.getElementById('product-select');
    if (!productSelect) return;
    
    // Clear existing options
    productSelect.innerHTML = '<option value="">Select a product</option>';
    
    // Add products to dropdown
    productsSnapshot.forEach(doc => {
      const product = doc.data();
      const option = document.createElement('option');
      option.value = doc.id;
      option.textContent = product.name;
      option.dataset.price = product.price;
      option.dataset.stock = product.stockQuantity || 0;
      productSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading vendor products:", error);
  }
}

function addItemRow() {
  const itemsContainer = document.getElementById('items-container');
  const productSelect = document.getElementById('product-select');
  const quantity = document.getElementById('quantity').value;
  
  if (!productSelect.value || quantity <= 0) {
    alert('Please select a product and enter a valid quantity');
    return;
  }
  
  const selectedOption = productSelect.options[productSelect.selectedIndex];
  const productId = productSelect.value;
  const productName = selectedOption.textContent;
  const price = parseFloat(selectedOption.dataset.price);
  const stock = parseInt(selectedOption.dataset.stock);
  
  // Check if there's enough stock
  if (quantity > stock) {
    alert(`Not enough stock. Only ${stock} units available.`);
    return;
  }
  
  // Check if product already exists in the sale
  const existingItems = document.querySelectorAll('.item-row');
  let existingItem = null;
  
  existingItems.forEach(item => {
    const itemId = item.querySelector('input[name="item-id"]').value;
    if (itemId === productId) {
      existingItem = item;
    }
  });
  
  if (existingItem) {
    // Update existing item quantity
    const existingQuantityInput = existingItem.querySelector('input[name="item-quantity"]');
    const existingQuantity = parseInt(existingQuantityInput.value);
    const newQuantity = existingQuantity + parseInt(quantity);
    
    // Check if new total quantity exceeds stock
    if (newQuantity > stock) {
      alert(`Not enough stock. Only ${stock} units available. You already have ${existingQuantity} in your sale.`);
      return;
    }
    
    // Update quantity display and hidden input
    existingQuantityInput.value = newQuantity;
    const quantityDisplay = existingItem.querySelector('.item-quantity');
    quantityDisplay.textContent = `${newQuantity} x Ksh ${price.toFixed(2)}`;
    
    // Update total for this item
    const totalDisplay = existingItem.querySelector('.item-total');
    totalDisplay.textContent = `Ksh ${(price * newQuantity).toFixed(2)}`;
  } else {
    // Create new item row
    const itemRow = document.createElement('div');
    itemRow.className = 'item-row';
    itemRow.style.display = 'flex';
    itemRow.style.justifyContent = 'space-between';
    itemRow.style.alignItems = 'center';
    itemRow.style.padding = '10px';
    itemRow.style.marginBottom = '10px';
    itemRow.style.backgroundColor = '#f8f9fa';
    itemRow.style.borderRadius = '8px';
    itemRow.style.border = '1px solid #e2e8f0';
    
    itemRow.innerHTML = `
      <div class="item-details" style="flex: 1;">
        <span class="item-name" style="display: block; font-weight: 600;">${productName}</span>
        <span class="item-quantity" style="display: block; color: #666; font-size: 0.9rem;">${quantity} x Ksh ${price.toFixed(2)}</span>
      </div>
      <div class="item-total" style="font-weight: 600; color: #00b761; margin: 0 15px;">
        Ksh ${(price * quantity).toFixed(2)}
      </div>
      <button type="button" class="remove-item-btn" style="background: #ff5252; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <i class="fas fa-times"></i>
      </button>
      <input type="hidden" name="item-id" value="${productId}">
      <input type="hidden" name="item-name" value="${productName}">
      <input type="hidden" name="item-price" value="${price}">
      <input type="hidden" name="item-quantity" value="${quantity}">
    `;
    
    // Add remove button functionality
    const removeBtn = itemRow.querySelector('.remove-item-btn');
    removeBtn.addEventListener('click', function() {
      itemRow.remove();
      updateTotal();
    });
    
    itemsContainer.appendChild(itemRow);
  }
  
  // Reset form fields
  productSelect.value = '';
  document.getElementById('quantity').value = '1';
  
  // Update total
  updateTotal();
}

function updateTotal() {
  const itemRows = document.querySelectorAll('.item-row');
  let total = 0;
  let itemCount = 0;
  
  itemRows.forEach(row => {
    const price = parseFloat(row.querySelector('input[name="item-price"]').value);
    const quantity = parseInt(row.querySelector('input[name="item-quantity"]').value);
    total += price * quantity;
    itemCount += quantity;
  });
  
  // Update the sale total in the products section
  const totalElement = document.getElementById('sale-total');
  if (totalElement) {
    totalElement.textContent = `Total: Ksh ${total.toFixed(2)}`;
  }
  
  // Update the summary sidebar
  const totalItemsElement = document.getElementById('total-items');
  if (totalItemsElement) {
    totalItemsElement.textContent = itemCount.toString();
  }
  
  const totalAmountElement = document.getElementById('total-amount');
  if (totalAmountElement) {
    totalAmountElement.textContent = `Ksh ${total.toFixed(2)}`;
  }
  
  // Enable/disable submit button based on whether there are items
  validateForm();
}

async function handleSaleSubmission(e) {
  e.preventDefault();
  
  const user = firebase.auth().currentUser;
  if (!user) {
    alert('You must be logged in to record a sale');
    return;
  }
  
  const itemRows = document.querySelectorAll('.item-row');
  if (itemRows.length === 0) {
    alert('Please add at least one item to the sale');
    return;
  }
  
  const customerName = document.getElementById('customer-name').value || 'Walk-in Customer';
  const paymentMethod = document.getElementById('payment-method').value;
  const notes = document.getElementById('sale-notes').value;
  
  // Collect items
  const items = [];
  let totalAmount = 0;
  
  itemRows.forEach(row => {
    const productId = row.querySelector('input[name="item-id"]').value;
    const name = row.querySelector('input[name="item-name"]').value;
    const price = parseFloat(row.querySelector('input[name="item-price"]').value);
    const quantity = parseInt(row.querySelector('input[name="item-quantity"]').value);
    
    items.push({
      productId,
      name,
      price,
      quantity
    });
    
    totalAmount += price * quantity;
  });
  
  // Create sale object for Firestore
  const sale = {
    vendorId: user.uid,
    customerName,
    paymentMethod,
    notes,
    items,
    totalAmount,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    type: 'manual'
  };

  try {
    // Save to Firestore
    await firebase.firestore().collection('manual_sales').add(sale);

    // Update product stock in Firestore
    await updateProductStock(items);
    
    // Update summary UI elements
    document.getElementById('total-items').textContent = '0';
    document.getElementById('total-amount').textContent = 'Ksh 0.00';
    document.getElementById('submit-button').disabled = true;
    
    // Show success message
    alert('Sale recorded successfully!');
    
    // Reset form
    document.getElementById('record-sale-form').reset();
    document.getElementById('items-container').innerHTML = '';
    updateTotal();
  } catch (error) {
    console.error('Error recording sale:', error);
    alert('Error recording sale. Please try again.');
  }
}

async function updateProductStock(items) {
  const db = firebase.firestore();
  const batch = db.batch();

  try {
    // Process each item
    for (const item of items) {
      const productRef = db.collection('products').doc(item.productId);

      // Get current product data
      const productDoc = await productRef.get();
      if (productDoc.exists) {
        const productData = productDoc.data();
        const currentStock = parseInt(productData.stockQuantity || 0);
        const newStock = Math.max(0, currentStock - item.quantity);

        // Update stock quantity
        batch.update(productRef, {
          stockQuantity: newStock,
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    // Commit all updates
    await batch.commit();
    console.log('Product stock updated successfully');
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error; // Re-throw to be caught by the calling function
  }
}

// Make functions available globally
window.addItemRow = addItemRow;
window.updateTotal = updateTotal;