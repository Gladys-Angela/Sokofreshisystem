// Soko freshi Chatbot
document.addEventListener('DOMContentLoaded', function() {
  // Create chatbot HTML structure
  const chatbotHTML = `
    <div class="chatbot-container" id="chatbot">
      <div class="chatbot-header" id="chatbot-header">
        <h3><i class="fas fa-robot"></i> Soko freshi Assistant</h3>
        <button class="chatbot-toggle" id="chatbot-toggle">
          <i class="fas fa-chevron-up" id="toggle-icon"></i>
        </button>
      </div>
      <div class="chatbot-body">
        <div class="chatbot-messages" id="chatbot-messages"></div>
        <div class="chatbot-input">
          <input type="text" id="user-input" placeholder="Type your question here...">
          <button id="send-button"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;
  
  // Add chatbot to the page
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  
  // Get DOM elements
  const chatbot = document.getElementById('chatbot');
  const chatbotHeader = document.getElementById('chatbot-header');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const toggleIcon = document.getElementById('toggle-icon');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  
  // Knowledge base for the chatbot
  const knowledgeBase = {
    "hello": "Hello! How can I help you with Soko freshi today?",
    "hi": "Hi there! How can I assist you with Soko freshi groceries?",
    "hey": "Hey! How can I help you today?",
    
    "who are you": "I'm the Soko freshi Assistant, here to help you with questions about our online grocery service.",
    "what is efresh": "Soko freshi is an online grocery platform that connects customers with local vendors selling fresh produce, meat, fish, and spices. We deliver fresh groceries right to your doorstep!",
    
    "how to order": "To order groceries: 1) Browse products on our Products page, 2) Add items to your cart, 3) Proceed to checkout, 4) Enter delivery details, and 5) Complete payment. Your fresh groceries will be delivered to your doorstep!",
    "delivery time": "We typically deliver within 24 hours of order placement. For some areas, same-day delivery is available if you order before 11 AM.",
    "delivery fee": "Delivery fees start at Ksh 100 and may vary based on your location and order size. Orders above Ksh 2,000 qualify for free delivery!",
    
    "payment methods": "We accept M-Pesa, credit/debit cards, and cash on delivery. You can select your preferred payment method during checkout.",
    "return policy": "If you're not satisfied with the quality of products received, you can request a return within 24 hours of delivery. We'll arrange for pickup and provide a refund or replacement.",
    
    "how to register": "To register, click on the 'Register' button in the top navigation bar. You can register as a customer to shop or as a vendor to sell your products.",
    "become vendor": "To become a vendor, click on 'Register' and select 'Vendor'. Fill in your store details, contact information, and account credentials. Once approved, you can start selling your products on Soko freshi!",
    
    "contact": "You can reach our customer service team at +254 758 599393 or email us at angie@gmail.com. We're available Monday to Saturday, 8 AM to 8 PM.",
    "location": "Our main office is located in Nairobi, Kenya. We currently deliver to most areas within Nairobi and its suburbs.",
    
    "products": "We offer a wide range of fresh groceries including fruits, vegetables, fish, meat, and spices. All our products are sourced from local vendors to ensure freshness and quality.",
    "organic": "Yes, we have a selection of organic products. You can filter for organic items on our Products page.",
    
    "minimum order": "There's no minimum order value, but orders below Ksh 500 may incur a small service fee.",
    "cancel order": "You can cancel your order within 1 hour of placing it. Go to 'My Orders' in your dashboard and select the cancel option for the specific order.",
    
    "app": "Yes, we have a mobile app available for both Android and iOS. You can download it from Google Play Store or Apple App Store.",
    "discount": "We regularly offer discounts and promotions. Subscribe to our newsletter to stay updated on our latest offers!",
    
    "help": "I can help you with information about ordering, delivery, payments, returns, registration, becoming a vendor, and more. Just ask me a specific question!"
  };
  
  // Toggle chatbot open/closed
  chatbotHeader.addEventListener('click', function() {
    chatbot.classList.toggle('open');
    toggleIcon.classList.toggle('fa-chevron-up');
    toggleIcon.classList.toggle('fa-chevron-down');
    
    // If opening the chatbot for the first time, show welcome message
    if (chatbot.classList.contains('open') && chatbotMessages.children.length === 0) {
      addBotMessage("Welcome to Soko freshi! I'm your virtual assistant here to help with any questions about our services.");
      setTimeout(() => {
        addBotMessage("You can ask about our products, ordering process, delivery options, payment methods, or anything else you'd like to know about Soko freshi. How may I assist you today?");
      }, 800);
    }
  });
  
  // Send message when button is clicked
  sendButton.addEventListener('click', sendMessage);
  
  // Send message when Enter key is pressed
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Function to send user message and get bot response
  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addUserMessage(message);
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process the message and respond after a short delay
    setTimeout(() => {
      removeTypingIndicator();
      const response = getBotResponse(message);
      addBotMessage(response);
    }, 1000);
  }
  
  // Function to add user message to chat
  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Function to add bot message to chat
  function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Function to show typing indicator
  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingIndicator);
    scrollToBottom();
  }
  
  // Function to remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  // Function to scroll chat to bottom
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Function to get bot response based on user input
  function getBotResponse(userMessage) {
    // Convert to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Define categories for better organization of responses
    const categories = {
      greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      about: ['who are you', 'what is sokofreshi', 'about sokofreshi', 'company', 'business'],
      ordering: ['how to order', 'place order', 'buy', 'purchase', 'shopping', 'checkout'],
      delivery: ['delivery', 'shipping', 'when will', 'how long', 'receive order'],
      payment: ['payment', 'pay', 'mpesa', 'card', 'cash', 'credit', 'debit'],
      returns: ['return', 'refund', 'exchange', 'damaged', 'quality', 'not satisfied'],
      account: ['register', 'sign up', 'create account', 'login', 'sign in', 'forgot password', 'reset password'],
      vendor: ['become vendor', 'sell on sokofreshi', 'vendor registration', 'supplier', 'seller'],
      contact: ['contact', 'customer service', 'help', 'support', 'phone', 'email', 'call', 'reach'],
      products: ['products', 'items', 'groceries', 'fruits', 'vegetables', 'meat', 'fish', 'spices', 'organic'],
      pricing: ['price', 'cost', 'how much', 'discount', 'offer', 'promotion', 'sale'],
      orders: ['my order', 'track order', 'cancel order', 'order status', 'minimum order'],
      app: ['app', 'mobile app', 'android', 'ios', 'download'],
      thanks: ['thank', 'thanks', 'appreciate', 'helpful']
    };
    
    // Check for category matches first
    for (const category in categories) {
      if (categories[category].some(keyword => message.includes(keyword))) {
        switch(category) {
          case 'greeting':
            return "Hello! I'm the Soko freshi Assistant. How can I help you with your grocery shopping today?";
          
          case 'about':
            return "Soko freshi is Kenya's premier online grocery platform connecting customers with local vendors selling fresh produce. We focus on quality, convenience, and supporting local farmers and vendors. Our mission is to make fresh groceries accessible to everyone while promoting sustainable farming practices.";
          
          case 'ordering':
            return "Ordering on Soko freshi is simple: 1) Browse our extensive catalog of fresh products, 2) Add items to your cart, 3) Proceed to checkout, 4) Enter your delivery address and preferred time slot, 5) Choose your payment method, and 6) Confirm your order. You'll receive an order confirmation via email and SMS with tracking information.";
          
          case 'delivery':
            return "We offer same-day delivery for orders placed before 11 AM and next-day delivery for later orders. Our delivery hours are 9 AM to 8 PM daily. You can select your preferred delivery time slot during checkout. We currently serve Nairobi and surrounding areas with plans to expand to other major cities soon.";
          
          case 'payment':
            return "We offer multiple secure payment options: 1) M-Pesa (our most popular option), 2) Credit/Debit cards (Visa, Mastercard), 3) Cash on delivery, and 4) Soko freshi Wallet. All online transactions are secured with industry-standard encryption to protect your financial information.";
          
          case 'returns':
            return "Customer satisfaction is our priority. If you're not completely satisfied with the quality of your products, you can request a return within 24 hours of delivery. Simply take a photo of the item, contact our customer service, and we'll arrange for pickup and provide a full refund or replacement. No questions asked for perishable items.";
          
          case 'account':
            if (message.includes('forgot') || message.includes('reset')) {
              return "To reset your password, click on 'Forgot Password?' on the login page. Enter your registered email address, and we'll send you a secure link to create a new password. The link expires in 24 hours for security reasons.";
            } else if (message.includes('login') || message.includes('sign in')) {
              return "To login, click the 'Login' button in the top navigation bar. Enter your email and password, and select your role (customer or vendor). We use secure authentication protocols to protect your account.";
            } else {
              return "Registration is quick and easy! Click 'Register' in the top navigation bar and choose whether you're registering as a customer or vendor. Fill in your details, verify your email, and you're ready to start shopping or selling on Soko freshi.";
            }
          
          case 'vendor':
            return "Becoming a Soko freshi vendor is a great opportunity to reach more customers! Click 'Register' and select 'Vendor'. Complete your store profile with details about your products and business. Our team will review your application within 48 hours. Once approved, you can start listing your products and selling on our platform. We charge a competitive 8% commission on sales with weekly payouts.";
          
          case 'contact':
            return "Our dedicated customer service team is available 7 days a week from 8 AM to 8 PM. You can reach us via: Phone: +254 758 599393, Email: support@sokofreshi.co.ke, Live Chat on our website, or through our social media channels. We typically respond to all inquiries within 2 hours during business hours.";
          
          case 'products':
            if (message.includes('organic')) {
              return "We have a growing selection of certified organic products sourced from trusted local farms. Look for the 'Certified Organic' label on our products. You can also use the 'Organic' filter on our Products page to see our full range of organic offerings.";
            } else {
              return "We offer thousands of fresh products across multiple categories: Farm-fresh fruits and vegetables, Quality meats and seafood, Dairy and eggs from local farms, Pantry essentials, Spices and herbs, Healthy snacks, and Specialty items. All our products are carefully sourced for quality and freshness.";
            }
          
          case 'pricing':
            if (message.includes('discount') || message.includes('offer') || message.includes('promotion')) {
              return "We regularly run promotions and special offers! First-time customers get 15% off their first order. We also have weekly specials, seasonal promotions, and bulk purchase discounts. Subscribe to our newsletter or check our 'Offers' page to stay updated on current deals.";
            } else {
              return "Our prices are competitive and transparent. We work directly with local farmers and suppliers to offer fair prices for quality products. Prices are always clearly displayed on each product page and are updated daily to reflect market rates. We also offer a price match guarantee on identical products from other online grocery services.";
            }
          
          case 'orders':
            if (message.includes('track') || message.includes('status')) {
              return "You can easily track your order in real-time through your Soko freshi account dashboard. After logging in, go to 'My Orders' to see all your orders and their current status. You'll also receive SMS and email updates at each stage of the delivery process.";
            } else if (message.includes('cancel')) {
              return "Orders can be canceled free of charge within 1 hour of placement. To cancel, log into your account, go to 'My Orders', select the order you wish to cancel, and click the 'Cancel Order' button. After the 1-hour window, please contact customer service as the order may already be in processing.";
            } else if (message.includes('minimum')) {
              return "There's no minimum order value on Soko freshi, but orders below Ksh 500 incur a small service fee of Ksh 50. Orders above Ksh 2,000 qualify for free delivery, while smaller orders have a delivery fee starting at Ksh 100 depending on your location.";
            } else {
              return "Managing your orders is easy through your Soko freshi account. You can view your order history, track current orders, reorder previous purchases, and manage subscriptions all from your personalized dashboard.";
            }
          
          case 'app':
            return "Yes, our mobile app offers the full Soko freshi experience with some exclusive features! Download the Soko freshi app from Google Play Store or Apple App Store to enjoy: Faster checkout with saved preferences, Real-time order tracking, Exclusive app-only offers, and Push notifications for order updates. The app is free and optimized for both smartphones and tablets.";
          
          case 'thanks':
            return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about Soko freshi or our services? I'm here to assist you with any other questions you might have.";
        }
      }
    }
    
    // Check for specific keywords that might not fit into categories
    if (message.includes('hours') || message.includes('open')) {
      return "Our online platform is available 24/7 for browsing and ordering. Our delivery hours are from 9 AM to 8 PM, seven days a week, including holidays. Customer service is available from 8 AM to 8 PM daily.";
    }
    
    if (message.includes('quality') || message.includes('fresh')) {
      return "Quality is our top priority at Soko freshi. We have a rigorous quality control process where each product is inspected before delivery. Our fresh produce is sourced daily from local farms, and we maintain optimal storage conditions to ensure maximum freshness. If you're ever not satisfied with the quality, we offer a 100% satisfaction guarantee.";
    }
    
    if (message.includes('subscription') || message.includes('weekly') || message.includes('monthly')) {
      return "Soko freshi offers convenient subscription services for regular essentials. You can set up weekly or monthly deliveries of your favorite products at a 5% discount. Manage your subscriptions easily through your account dashboard, adjusting quantities or skipping deliveries as needed.";
    }
    
    // Default response if no match is found
    return "I'd be happy to help you with that. Could you provide a bit more detail about what you're looking for? I can assist with information about our products, ordering process, delivery options, payment methods, or any other aspect of our service.";
  }
});