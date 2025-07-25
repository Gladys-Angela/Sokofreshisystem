document.addEventListener('DOMContentLoaded', function() {
  // Get the vendor filter dropdown
  const vendorFilter = document.getElementById('vendor-filter');
  if (!vendorFilter) return;
  
  // Show loading state
  const loadingOption = document.createElement('option');
  loadingOption.textContent = 'Loading vendors...';
  loadingOption.disabled = true;
  vendorFilter.appendChild(loadingOption);
  
  // Load all vendors from Firestore
  loadVendors();
  
  function loadVendors() {
    // Query users collection for vendors
    firebase.firestore().collection('users')
      .where('role', '==', 'vendor')
      .get()
      .then((querySnapshot) => {
        // Remove loading option
        vendorFilter.removeChild(loadingOption);
        
        if (querySnapshot.empty) {
          const noVendorsOption = document.createElement('option');
          noVendorsOption.textContent = 'No vendors found';
          noVendorsOption.disabled = true;
          vendorFilter.appendChild(noVendorsOption);
          return;
        }
        
        // Add each vendor to the dropdown
        querySnapshot.forEach((doc) => {
          const vendorData = doc.data();
          const vendorName = vendorData.businessName || vendorData.displayName || 'Unnamed Vendor';
          
          const option = document.createElement('option');
          option.value = doc.id;
          option.textContent = vendorName;
          vendorFilter.appendChild(option);
        });
      })
      .catch((error) => {
        console.error('Error loading vendors:', error);
        
        // Remove loading option
        vendorFilter.removeChild(loadingOption);
        
        // Add error option
        const errorOption = document.createElement('option');
        errorOption.textContent = 'Error loading vendors';
        errorOption.disabled = true;
        vendorFilter.appendChild(errorOption);
        
        // Add fallback vendors
        addFallbackVendors();
      });
  }
  
  function addFallbackVendors() {
    // Add some fallback vendors in case Firestore fails
    const fallbackVendors = [
      { id: 'v1', name: 'Fresh Farms' },
      { id: 'v2', name: 'Citrus Growers' },
      { id: 'v3', name: 'Tropical Fruits' },
      { id: 'v4', name: 'Garden Fresh' },
      { id: 'v5', name: 'Root Vegetables' }
    ];
    
    fallbackVendors.forEach(vendor => {
      const option = document.createElement('option');
      option.value = vendor.id;
      option.textContent = vendor.name;
      vendorFilter.appendChild(option);
    });
  }
});