document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = question.classList.contains('active');
      
      // Close all other answers
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
      
      // Toggle current answer
      if (!isActive) {
        question.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
  
  // Category tabs functionality
  const categoryCards = document.querySelectorAll('.category-card');
  const faqSections = document.querySelectorAll('.category-faqs');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      
      // Remove active class from all cards and sections
      categoryCards.forEach(c => c.classList.remove('active'));
      faqSections.forEach(s => s.style.display = 'none');
      
      // Add active class to clicked card and show corresponding section
      card.classList.add('active');
      document.getElementById(`${category}-faqs`).style.display = 'block';
    });
  });
  
  // Show default category (products)
  document.querySelector('.category-card[data-category="products"]').click();
  
  // Chat button functionality
  document.getElementById('start-chat').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Chat support will be available soon!');
  });
  
  // Search functionality
  const searchInput = document.getElementById('help-search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      if (searchTerm.length < 2) {
        // Reset view if search is cleared
        document.querySelectorAll('.faq-item').forEach(item => {
          item.style.display = 'block';
        });
        return;
      }
      
      // Search through all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});