# Soko freshi Chatbot Implementation

## Features
- Modern, responsive chatbot interface
- Smart responses to common questions about Soko freshi
- Knowledge base with information about:
  - Ordering process
  - Delivery information
  - Payment methods
  - Registration and login
  - Becoming a vendor
  - Return policy
  - Contact information
  - Products and services
- Typing indicators for a more natural conversation feel
- Minimizable interface that doesn't interfere with the main website

## Files Created
1. `css/chatbot.css` - Styling for the chatbot interface
2. `js/soko-freshi-chatbot.js` - Main chatbot functionality and knowledge base
3. `js/auto-chatbot.js` - Script to automatically add the chatbot to any page

## How to Add to Pages
Add these two lines to any page where you want the chatbot to appear:

```html
<link rel="stylesheet" href="css/chatbot.css">
<script src="js/soko-freshi-chatbot.js"></script>
```

Or simply add this single script before the closing </body> tag:

```html
<script src="js/auto-chatbot.js"></script>
```

## How It Works
1. The chatbot appears as a minimized chat window in the bottom-right corner
2. When clicked, it expands to show the chat interface
3. The bot sends a welcome message when first opened
4. Users can type questions and get intelligent responses
5. The knowledge base contains answers to common questions
6. The bot uses keyword matching to find the most relevant response

## Extending the Chatbot
To add more responses to the chatbot, edit the `knowledgeBase` object in `js/soko-freshi-chatbot.js`. Add new key-value pairs where:
- The key is a keyword or phrase to match in user questions
- The value is the response the chatbot should give

Example:
```javascript
"shipping": "We offer free shipping on orders over Ksh 2,000. For smaller orders, shipping costs start at Ksh 100 depending on your location."
```