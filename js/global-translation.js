// Global translation script to apply translations to all pages
document.addEventListener('DOMContentLoaded', function() {
  // Add language selector to pages that don't have it
  addLanguageSelectorIfMissing();
  
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
  
  // Function to add language selector if missing
  function addLanguageSelectorIfMissing() {
    if (!document.getElementById('language-selector')) {
      // Check if language-selector-container exists
      let container = document.querySelector('.language-selector-container');
      
      // If container doesn't exist, create it
      if (!container) {
        container = document.createElement('div');
        container.className = 'language-selector-container';
        
        // Add CSS if needed
        if (!document.querySelector('style#language-selector-style')) {
          const style = document.createElement('style');
          style.id = 'language-selector-style';
          style.textContent = `
            .language-selector-container {
              position: fixed;
              top: 10px;
              right: 10px;
              z-index: 1000;
            }
            #language-selector {
              padding: 5px;
              border-radius: 4px;
              border: 1px solid #ccc;
              background-color: white;
              cursor: pointer;
            }
          `;
          document.head.appendChild(style);
        }
        
        // Insert after navigation if it exists, otherwise at the beginning of body
        const nav = document.querySelector('nav');
        if (nav) {
          nav.parentNode.insertBefore(container, nav.nextSibling);
        } else {
          document.body.insertBefore(container, document.body.firstChild);
        }
      }
      
      // Create and add the language selector
      const select = document.createElement('select');
      select.id = 'language-selector';
      
      // Add language options
      const enOption = document.createElement('option');
      enOption.value = 'en';
      enOption.textContent = 'English';
      enOption.setAttribute('data-translate', 'english');
      
      const swOption = document.createElement('option');
      swOption.value = 'sw';
      swOption.textContent = 'Swahili';
      swOption.setAttribute('data-translate', 'swahili');
      
      select.appendChild(enOption);
      select.appendChild(swOption);
      
      container.appendChild(select);
    }
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