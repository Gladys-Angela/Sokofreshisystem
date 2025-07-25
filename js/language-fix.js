/**
 * Fix for language selector functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  const languageSelector = document.getElementById('language-selector');
  
  if (languageSelector) {
    // Set initial value from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelector.value = savedLanguage;
    
    // Apply translations immediately
    if (typeof translations !== 'undefined') {
      applyTranslations(savedLanguage);
    }
    
    // Add direct event listener
    languageSelector.addEventListener('change', function() {
      const selectedLanguage = this.value;
      console.log('Language changed to:', selectedLanguage);
      localStorage.setItem('language', selectedLanguage);
      
      if (typeof translations !== 'undefined') {
        applyTranslations(selectedLanguage);
      } else {
        console.error('Translations object not available');
        // Try to load translations
        const script = document.createElement('script');
        script.src = 'js/translations.js';
        script.onload = function() {
          applyTranslations(selectedLanguage);
        };
        document.head.appendChild(script);
      }
    });
  }
});