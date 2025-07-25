// Enhanced customer dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  if (typeof auth === 'undefined' || typeof db === 'undefined') {
    console.error('Firebase not initialized');
    return;
  }

  // Load vendors for the shop by vendor section
  async function loadVendors() {
    try {
      const vendorsContainer = document.getElementById('vendors-list');
      if (!vendorsContainer) return;
      
      const vendorsSnapshot = await db.collection('users')
        .where('role', '==', 'vendor')
        .where('approved', '==', true)
        .limit(8)
        .get();
      
      if (vendorsSnapshot.empty) {
        vendorsContainer.innerHTML = '<p>No vendors available at the moment.</p>';
        return;
      }
      
      let vendorsHTML = '';
      vendorsSnapshot.forEach(doc => {
        const vendor = doc.data();
        vendorsHTML += `
          <div class="vendor-card">
            <div class="vendor-icon">
              <i class="fas fa-store"></i>
            </div>
            <h4>${vendor.storeName || 'Store'}</h4>
            <p>${vendor.storeCategory || 'Various Products'}</p>
            <a href="products.html?vendor=${doc.id}" class="vendor-btn">Shop Now</a>
          </div>
        `;
      });
      
      vendorsContainer.innerHTML = vendorsHTML;
    } catch (error) {
      console.error('Error loading vendors:', error);
    }
  }

  // Load reviews functionality
  async function loadReviewForm() {
    const reviewForm = document.getElementById('review-form');
    if (!reviewForm) return;
    
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const user = auth.currentUser;
      if (!user) {
        alert('Please log in to submit a review');
        return;
      }
      
      const vendorId = reviewForm.getAttribute('data-vendor-id');
      const rating = document.querySelector('input[name="rating"]:checked')?.value;
      const comment = document.getElementById('review-comment').value;
      
      if (!rating) {
        alert('Please select a rating');
        return;
      }
      
      try {
        await db.collection('reviews').add({
          userId: user.uid,
          vendorId,
          rating: parseInt(rating),
          comment,
          date: new Date()
        });
        
        alert('Review submitted successfully!');
        reviewForm.reset();
        
        // Reload reviews if on the reviews page
        if (typeof loadVendorReviews === 'function') {
          loadVendorReviews(vendorId);
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
      }
    });
  }

  // Initialize dashboard components
  function initDashboard() {
    loadVendors();
    loadReviewForm();
  }

  // Initialize when auth state changes
  auth.onAuthStateChanged(user => {
    if (user) {
      initDashboard();
    }
  });
});