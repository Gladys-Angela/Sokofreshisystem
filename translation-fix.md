# Translation System Fix

## What Was Changed
1. Created universal-translate.js - A robust translation system that works on all pages
2. Created auto-translate.js - A script that automatically adds translation to any page
3. Created language-selector.css - Styling for the language selector
4. Updated index.html, login.html, register_customer.html, and register_vendor.html to use the new system
5. Added missing translations to translations.js
6. Created translation-helper.html - A helper page for adding translation to all pages

## How It Works
- The universal-translate.js script loads translations and applies them to all elements with data-translate attributes
- The auto-translate.js script automatically adds the language selector and translation scripts to any page
- When the language is changed, all pages with the translation system will update immediately
- The system uses localStorage to store the selected language, so it persists across page loads

## How to Add Translation to Any Page
Add this script tag just before the closing </body> tag:
```html
<script src="js/auto-translate.js"></script>
```

## How to Make Text Translatable
1. Add the data-translate attribute to any HTML element:
```html
<h1 data-translate="welcome">Welcome</h1>
```

2. Add the translation key to translations.js:
```javascript
en: {
  welcome: "Welcome"
},
sw: {
  welcome: "Karibu"
}
```

## Testing
1. Open any page with the translation system
2. Use the language selector in the top-right corner to switch between English and Swahili
3. Verify that all text with data-translate attributes changes language
4. Open multiple pages and verify that changing the language on one page affects all pages