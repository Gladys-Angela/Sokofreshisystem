// Reviews functionality for customer dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Check if Firebase is initialized
  if (typeof firebase === 'undefined' || typeof db === 'undefined') {
    console.error('Firebase not initialized');
    return;
  }

  // Load vendor reviews
  async function loadVendorReviews(vendorId) {
    const reviewsContainer = document.getElementById('vendor-reviews');
    if (!reviewsContainer) return;
    
    try {
      const reviewsQuery = await db.collection('reviews')
        .where('vendorId', '==', vendorId)
        .orderBy('date', 'desc')
        .limit(10)
        .get();
      
      if (reviewsQuery.empty) {
        reviewsContainer.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
        return;
      }
      
      let reviewsHTML = '';
      const reviewPromises = reviewsQuery.docs.map(async doc => {
        const review = doc.data();
        let userName = 'Anonymous';
        
        // Get user name if available
        if (review.userId) {
          try {
            const userDoc = await db.collection('users').doc(review.userId).get();
            if (userDoc.exists) {
              const userData = userDoc.data();
              userName = userData.fullName || userData.name || 'Customer';
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
        
        const date = review.date ? review.date.toDate ? review.date.toDate() : new Date(review.date) : new Date();
        const formattedDate = date.toLocaleDateString();
        
        return `
          <div class="review-item">
            <div class="review-header">
              <div class="review-user">${userName}</div>
              <div class="review-rating">
                ${generateStars(review.rating || 0)}
              </div>
              <div class="review-date">${formattedDate}</div>
            </div>
            <div class="review-content">${review.comment || ''}</div>
          </div>
        `;
      });
      
      const reviewsContent = await Promise.all(reviewPromises);
      reviewsContainer.innerHTML = reviewsContent.join('');
    } catch (error) {
      console.error('Error loading reviews:', error);
      reviewsContainer.innerHTML = '<p>Failed to load reviews. Please try again later.</p>';
    }
  }

  // Generate star rating HTML
  function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    return stars;
  }

  // Make functions available globally
  window.loadVendorReviews = loadVendorReviews;
  window.generateStars = generateStars;
});