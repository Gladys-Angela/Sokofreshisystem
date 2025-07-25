// Add product detail links to product boxes
document.addEventListener('DOMContentLoaded', function() {
  // Find all product boxes
  const productBoxes = document.querySelectorAll('.product-box');
  
  productBoxes.forEach(box => {
    // Get product name
    const productName = box.querySelector('strong').textContent;
    
    // Get product ID if available
    let productId = '';
    const cartBtn = box.querySelector('.cart-btn');
    if (cartBtn && cartBtn.dataset.productId) {
      productId = cartBtn.dataset.productId;
    }
    
    // Create a wrapper around the image and name
    const img = box.querySelector('img');
    const nameElement = box.querySelector('strong');
    
    if (img && nameElement) {
      // Create wrapper element
      const wrapper = document.createElement('a');
      wrapper.href = `product_details.html?id=${productId}&name=${encodeURIComponent(productName)}`;
      wrapper.style.textDecoration = 'none';
      wrapper.style.color = 'inherit';
      
      // Replace image with wrapped version
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      
      // Replace name with wrapped version
      const clonedName = nameElement.cloneNode(true);
      nameElement.parentNode.replaceChild(wrapper.cloneNode(true), nameElement);
      wrapper.appendChild(clonedName);
      
      // Add click event to the entire box
      box.style.cursor = 'pointer';
      box.addEventListener('click', function(e) {
        // Don't trigger if clicking on buttons
        if (e.target.tagName !== 'BUTTON' && 
            e.target.tagName !== 'I' && 
            !e.target.classList.contains('cart-btn') && 
            !e.target.classList.contains('like-btn')) {
          window.location.href = wrapper.href;
        }
      });
    }
  });
});