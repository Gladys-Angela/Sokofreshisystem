// Universal translation system
document.addEventListener('DOMContentLoaded', function() {
  // Load translations if not already loaded
  if (typeof translations === 'undefined') {
    loadTranslations();
  } else {
    initTranslation();
  }
});

function loadTranslations() {
  const script = document.createElement('script');
  script.src = 'js/translations.js';
  script.onload = initTranslation;
  document.head.appendChild(script);
}

function initTranslation() {
  // Get saved language or default to English
  const currentLang = localStorage.getItem('language') || 'en';
  
  // Set up language selector if it exists
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', function() {
      const newLang = this.value;
      localStorage.setItem('language', newLang);
      translatePage(newLang);
      
      // Update all other open pages if possible
      try {
        localStorage.setItem('languageChanged', Date.now().toString());
      } catch (e) {
        console.error('Could not set language change flag:', e);
      }
    });
  }
  
  // Apply translations immediately
  translatePage(currentLang);
  
  // Listen for language changes from other tabs/pages
  window.addEventListener('storage', function(event) {
    if (event.key === 'language' || event.key === 'languageChanged') {
      const newLang = localStorage.getItem('language') || 'en';
      translatePage(newLang);
      if (langSelector) langSelector.value = newLang;
    }
  });
}

function translatePage(lang) {
  if (!translations || !translations[lang]) {
    console.error('Translations not available for:', lang);
    return;
  }
  
  // Translate all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (!translations[lang][key]) return;
    
    // Handle different element types
    if (el.tagName === 'INPUT' && el.type === 'submit') {
      el.value = translations[lang][key];
    } else if (el.tagName === 'INPUT' && el.placeholder) {
      el.placeholder = translations[lang][key];
    } else {
      el.textContent = translations[lang][key];
    }
  });
}

// Make translation function available globally
window.translatePage = translatePage;