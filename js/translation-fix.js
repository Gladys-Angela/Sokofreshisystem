// Fix for translation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Ensure translations are loaded
  if (typeof translations === 'undefined') {
    console.log('Loading translations...');
    const script = document.createElement('script');
    script.src = 'js/translations.js';
    script.onload = function() {
      console.log('Translations loaded successfully');
      initTranslation();
    };
    document.head.appendChild(script);
  } else {
    console.log('Translations already loaded');
    initTranslation();
  }

  function initTranslation() {
    // Get language selector
    const languageSelector = document.getElementById('language-selector');
    if (!languageSelector) {
      console.error('Language selector not found');
      return;
    }

    // Get saved language or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    console.log('Current language:', savedLanguage);
    
    // Set selector value
    languageSelector.value = savedLanguage;
    
    // Apply translations immediately
    translatePage(savedLanguage);
    
    // Add event listener for language change
    languageSelector.addEventListener('change', function() {
      const selectedLanguage = this.value;
      console.log('Language changed to:', selectedLanguage);
      localStorage.setItem('language', selectedLanguage);
      translatePage(selectedLanguage);
    });
  }

  // Function to translate the page
  function translatePage(language) {
    if (!translations || !translations[language]) {
      console.error('Translation not available for:', language);
      return;
    }

    console.log('Applying translations for:', language);
    
    // Translate all elements with data-translate attribute
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
  }
});

// Make translation function available globally
window.translatePage = function(language) {
  if (!translations || !translations[language]) {
    console.error('Translation not available for:', language);
    return;
  }

  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[language][key]) {
      if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = translations[language][key];
      } else if (element.tagName === 'INPUT' && element.placeholder) {
        element.placeholder = translations[language][key];
      } else {
        element.textContent = translations[language][key];
      }
    }
  });
};