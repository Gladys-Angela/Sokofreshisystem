// Help Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the help button and dropdown
  const helpButton = document.getElementById('help-button');
  const helpDropdown = document.getElementById('help-dropdown');
  
  // Toggle dropdown when help button is clicked
  helpButton.addEventListener('click', function(e) {
    e.stopPropagation();
    helpDropdown.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!helpDropdown.contains(e.target) && e.target !== helpButton) {
      helpDropdown.classList.remove('active');
    }
  });
  
  // Chat with us functionality
  const chatWithUs = document.getElementById('chat-with-us');
  if (chatWithUs) {
    chatWithUs.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Chat support will be available soon!');
    });
  }
});