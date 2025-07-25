// Auto-include chatbot on all pages
document.addEventListener('DOMContentLoaded', function() {
  // Add chatbot CSS if not already present
  if (!document.querySelector('link[href="css/chatbot.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/chatbot.css';
    document.head.appendChild(link);
  }
  
  // Add chatbot script if not already present
  if (!document.querySelector('script[src="js/soko-freshi-chatbot.js"]')) {
    const script = document.createElement('script');
    script.src = 'js/soko-freshi-chatbot.js';
    document.body.appendChild(script);
  }
});