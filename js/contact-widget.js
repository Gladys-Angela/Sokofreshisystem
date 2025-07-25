document.addEventListener('DOMContentLoaded', function() {
  // Create contact widget HTML
  const contactWidgetHTML = `
    <div class="contact-widget">
      <div class="contact-widget-button" id="contact-widget-button">
        <i class="fab fa-whatsapp"></i>
      </div>
      <div class="contact-popup" id="contact-popup">
        <div class="contact-popup-header">
          <img src="images/favicon.png" alt="eFresh Support">
          <div class="contact-popup-header-text">
            <h4>eFresh Customer Support</h4>
            <p>We typically reply within 10 minutes</p>
          </div>
        </div>
        <div class="contact-popup-body">
          <p>Need assistance with your order or have questions about our products? Our customer support team is ready to help!</p>
        </div>
        <a href="https://wa.me/254758599393?text=Hello%20eFresh,%20I%20need%20assistance%20with%20" class="contact-option whatsapp" target="_blank">
          <i class="fab fa-whatsapp"></i>
          <span>Chat on WhatsApp</span>
        </a>
        <a href="mailto:angie@gmail.com?subject=eFresh%20Customer%20Support&body=Hello%20eFresh%20Team,%0A%0AI%20need%20assistance%20with%20" class="contact-option email">
          <i class="fas fa-envelope"></i>
          <span>Email Us</span>
        </a>
        <a href="tel:+254758599393" class="contact-option phone">
          <i class="fas fa-phone-alt"></i>
          <span>Call Us</span>
        </a>
        <a href="#" class="contact-option chat-trigger">
          <i class="fas fa-comment-dots"></i>
          <span>Chat with Bot</span>
        </a>
      </div>
    </div>
  `;
  
  // Add contact widget to the body
  const contactWidgetContainer = document.createElement('div');
  contactWidgetContainer.innerHTML = contactWidgetHTML;
  document.body.appendChild(contactWidgetContainer);
  
  // Toggle contact popup
  const contactButton = document.getElementById('contact-widget-button');
  const contactPopup = document.getElementById('contact-popup');
  
  contactButton.addEventListener('click', function() {
    contactPopup.classList.toggle('active');
  });
  
  // Close popup when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.contact-widget') || 
        (event.target.closest('.contact-option') && !event.target.closest('.chat-trigger'))) {
      contactPopup.classList.remove('active');
    }
  });
  
  // Add event listener for chat bot trigger
  setTimeout(() => {
    const chatTrigger = document.querySelector('.chat-trigger');
    if (chatTrigger) {
      chatTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        contactPopup.classList.remove('active');
        
        // Find and trigger chatbot toggle
        const chatbotToggle = document.getElementById('chatbot-toggle');
        if (chatbotToggle && typeof toggleChatbot === 'function') {
          toggleChatbot();
        } else {
          // Fallback if chatbot function isn't available
          window.location.href = window.location.pathname + '?openChat=true';
        }
      });
    }
  }, 500);
});