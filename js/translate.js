// Load translations from translations.js
document.addEventListener('DOMContentLoaded', function() {
  // Check if translations object exists
  if (typeof translations === 'undefined') {
    // Load translations.js dynamically if not already loaded
    const script = document.createElement('script');
    script.src = 'js/translations.js';
    script.onload = initializeTranslations;
    document.head.appendChild(script);
  } else {
    initializeTranslations();
  }
});

function initializeTranslations() {
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    // Set initial value from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelector.value = savedLanguage;
    
    // Apply translations on page load
    applyTranslations(savedLanguage);
    
    // Remove any existing event listeners and add a new one
    languageSelector.removeEventListener('change', handleLanguageChange);
    languageSelector.addEventListener('change', handleLanguageChange);
  } else {
    // If no language selector on page, still apply translations
    const savedLanguage = localStorage.getItem('language') || 'en';
    applyTranslations(savedLanguage);
  }
}

// Separate function to handle language changes
function handleLanguageChange() {
  const selectedLanguage = this.value;
  localStorage.setItem('language', selectedLanguage);
  applyTranslations(selectedLanguage);
}

function applyTranslations(language) {
  if (!translations || !translations[language]) {
    console.error('Translations not available for language:', language);
    return;
  }
  
  console.log('Applying translations for language:', language);
  
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[language][key]) {
      // Handle different element types
      if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = translations[language][key];
      } else if (element.tagName === 'INPUT' && element.placeholder) {
        element.placeholder = translations[language][key];
      } else {
        element.textContent = translations[language][key];
      }
    } else {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
    }
  });
  
  // Update any dynamic content that needs translation
  updateDynamicTranslations(language);
}

function updateDynamicTranslations(language) {
  // Update any buttons or elements that might have been added dynamically
  const registerButtons = document.querySelectorAll('button[type="submit"]');
  registerButtons.forEach(button => {
    if (button.textContent.includes('Register as Customer')) {
      button.textContent = translations[language].register_as_customer || button.textContent;
    } else if (button.textContent.includes('Register as Vendor')) {
      button.textContent = translations[language].register_as_vendor || button.textContent;
    } else if (button.textContent.includes('Login')) {
      button.textContent = translations[language].login || button.textContent;
    }
  });
}

// Make function available globally
window.applyTranslations = function() {
  const savedLanguage = localStorage.getItem('language') || 'en';
  applyTranslations(savedLanguage);
};