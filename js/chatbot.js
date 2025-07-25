document.addEventListener('DOMContentLoaded', function() {
  // Create chat bot elements if they don't exist
  if (!document.querySelector('.chat-support')) {
    createChatElements();
  }
  
  // Initialize chat functionality
  initializeChat();
});

// Create chat elements
function createChatElements() {
  // Create chat button and widget container
  const chatHTML = `
    <div class="chat-support">
      <div class="chat-btn" id="chat-btn">
        <i class="fas fa-comments"></i>
      </div>
      <div class="chat-tooltip">Need Help? Chat with Us</div>
    </div>
    
    <div class="chat-widget" id="chat-widget">
      <div class="chat-header">
        <h3><i class="fas fa-headset"></i> Soko freshi Support</h3>
        <button class="close-btn" id="close-chat"><i class="fas fa-times"></i></button>
      </div>
      
      <div class="chat-body" id="chat-body">
        <div class="chat-message bot-message">
          👋 Hello! Welcome to Soko freshi Support. How can I help you today?
        </div>
        
        <div class="quick-replies">
          <div class="quick-reply" onclick="sendQuickReply('How do I add products?')">How do I add products?</div>
          <div class="quick-reply" onclick="sendQuickReply('How to track sales?')">How to track sales?</div>
          <div class="quick-reply" onclick="sendQuickReply('Payment issues')">Payment issues</div>
        </div>
      </div>
      
      <div class="chat-footer">
        <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." onkeypress="handleKeyPress(event)">
        <button class="send-btn" onclick="sendMessage()" title="Send Message"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `;
  
  // Add chat elements to the body
  const chatContainer = document.createElement('div');
  chatContainer.innerHTML = chatHTML;
  document.body.appendChild(chatContainer);
}

// Initialize chat functionality
function initializeChat() {
  const chatButton = document.getElementById('chat-btn');
  const chatWidget = document.getElementById('chat-widget');
  const closeChat = document.getElementById('close-chat');
  const chatBody = document.getElementById('chat-body');
  
  if (chatButton && chatWidget && closeChat) {
    // Set initial state with CSS
    chatWidget.style.opacity = '0';
    chatWidget.style.transform = 'translateY(20px)';
    
    // Open chat widget
    chatButton.addEventListener('click', function() {
      chatWidget.style.display = 'block';
      setTimeout(() => {
        chatWidget.style.opacity = '1';
        chatWidget.style.transform = 'translateY(0)';
        
        // Ensure chat body scrolls to bottom when opened
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }, 50);
    });
    
    // Close chat widget
    closeChat.addEventListener('click', function() {
      chatWidget.style.opacity = '0';
      chatWidget.style.transform = 'translateY(20px)';
      setTimeout(() => {
        chatWidget.style.display = 'none';
      }, 300);
    });
    
    // Add minimize functionality
    const minimizeBtn = document.createElement('button');
    minimizeBtn.className = 'close-btn minimize-btn';
    minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
    minimizeBtn.style.marginRight = '5px';
    minimizeBtn.title = 'Minimize';
    
    minimizeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      chatWidget.style.opacity = '0';
      chatWidget.style.transform = 'translateY(20px)';
      setTimeout(() => {
        chatWidget.style.display = 'none';
      }, 300);
    });
    
    // Insert minimize button before close button
    if (closeChat.parentNode) {
      closeChat.parentNode.insertBefore(minimizeBtn, closeChat);
    }
  }
}

// Send message
function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');
  
  if (!chatInput || !chatBody) return;
  
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot-message typing-indicator';
    typingIndicator.innerHTML = '<span>•</span><span>•</span><span>•</span>';
    chatBody.appendChild(typingIndicator);
    
    // Scroll to show typing indicator
    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: 'smooth'
    });
    
    // Process the message and get a response with a realistic delay
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, 'bot');
    }, 800);
    
    // Focus the input field again
    chatInput.focus();
  }
}

// Handle Enter key press
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Send quick reply
function sendQuickReply(message) {
  addMessage(message, 'user');
  
  // Show typing indicator
  const chatBody = document.getElementById('chat-body');
  if (chatBody) {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot-message typing-indicator';
    typingIndicator.innerHTML = '<span>•</span><span>•</span><span>•</span>';
    chatBody.appendChild(typingIndicator);
    
    // Scroll to show typing indicator
    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: 'smooth'
    });
  }
  
  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage(response, 'bot');
  }, 800);
}

// Add message to chat
function addMessage(text, sender) {
  const chatBody = document.getElementById('chat-body');
  if (!chatBody) return;
  
  // Remove any existing typing indicator
  const existingTyping = chatBody.querySelector('.typing-indicator');
  if (existingTyping) {
    chatBody.removeChild(existingTyping);
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message`;
  messageDiv.textContent = text;
  
  chatBody.appendChild(messageDiv);
  
  // Scroll to bottom with smooth animation
  chatBody.scrollTo({
    top: chatBody.scrollHeight,
    behavior: 'smooth'
  });
  
  // Add quick replies for bot messages
  if (sender === 'bot') {
    // Only add quick replies for certain responses
    if (text.includes('anything else') || text.includes('How can I help') || text.includes('rephrase your question')) {
      const quickReplies = document.createElement('div');
      quickReplies.className = 'quick-replies';
      quickReplies.innerHTML = `
        <div class="quick-reply" onclick="sendQuickReply('How do I add products?')">How do I add products?</div>
        <div class="quick-reply" onclick="sendQuickReply('How to track sales?')">How to track sales?</div>
        <div class="quick-reply" onclick="sendQuickReply('Payment issues')">Payment issues</div>
      `;
      chatBody.appendChild(quickReplies);
      
      // Scroll again after adding quick replies
      chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: 'smooth'
      });
    }
  }
}

// Get bot response based on user message
function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('add product') || lowerMessage.includes('how do i add')) {
    return "To add a product, go to your Vendor Dashboard and click on 'Add New Product'. Fill in the product details including name, price, category, and upload an image. Click 'Add Product' to save it to your inventory.";
  }
  else if (lowerMessage.includes('track sales') || lowerMessage.includes('sales history')) {
    return "You can track your sales by going to the 'Sales' tab in your Vendor Dashboard. There you'll find a complete history of all your orders, revenue statistics, and performance metrics.";
  }
  else if (lowerMessage.includes('payment') || lowerMessage.includes('payout')) {
    return "For payment issues, please check the 'Sales History' page for transaction details. Payouts are processed every 7 days. If you're experiencing specific issues, please contact our support team through the 'Chat Support' page for personalized assistance.";
  }
  else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! How can I help you with your Soko freshi account today?";
  }
  else if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  else {
    return "I'm not sure I understand. Could you please rephrase your question? Or you can select one of the quick reply options below.";
  }
}