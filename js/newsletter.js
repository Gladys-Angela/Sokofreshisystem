document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const termsCheckbox = document.getElementById('newsletter-terms-checkbox');
  const successMessage = document.getElementById('newsletter-success');
  const errorMessage = document.getElementById('newsletter-error');
  
  // EmailJS configuration
  // Replace these with your actual EmailJS credentials
  const emailjsServiceId = 'service_sokofreshi';
  const emailjsTemplateId = 'template_newsletter';
  const emailjsUserId = 'YOUR_EMAILJS_USER_ID';
  
  // Initialize EmailJS
  emailjs.init(emailjsUserId);
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset messages
      successMessage.style.display = 'none';
      errorMessage.style.display = 'none';
      
      // Validate email
      const email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        return;
      }
      
      // Check terms agreement
      if (!termsCheckbox.checked) {
        errorMessage.textContent = 'Please agree to the terms and conditions.';
        errorMessage.style.display = 'block';
        return;
      }
      
      // Disable submit button and show loading state
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
      
      // Get Firebase instance
      const db = firebase.firestore();
      
      // Save to Firestore
      db.collection('newsletter_subscribers').add({
        email: email,
        subscribedAt: new Date().toISOString(),
        active: true
      })
      .then(function() {
        // Send confirmation email using EmailJS
        const templateParams = {
          to_email: email,
          to_name: email.split('@')[0], // Use part before @ as name
          subject: 'Welcome to Soko freshi Newsletter!',
          unsubscribe_link: 'https://sokofreshi.com/unsubscribe?email=' + encodeURIComponent(email)
        };
        
        return emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams);
      })
      .then(function(response) {
        console.log('Email sent successfully:', response);
        // Show success message
        successMessage.style.display = 'block';
        emailInput.value = '';
        termsCheckbox.checked = false;
      })
      .catch(function(error) {
        console.error('Error:', error);
        // Even if email sending fails, the subscription was saved
        successMessage.style.display = 'block';
        emailInput.value = '';
        termsCheckbox.checked = false;
      })
      .finally(function() {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
    });
  }
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});