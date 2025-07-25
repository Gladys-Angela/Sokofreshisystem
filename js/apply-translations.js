// Script to apply translations to all pages
(function() {
  // Function to add translation scripts to all pages
  function addTranslationScripts() {
    // Check if translations.js is already included
    if (!document.querySelector('script[src="js/translations.js"]')) {
      const translationsScript = document.createElement('script');
      translationsScript.src = 'js/translations.js';
      document.head.appendChild(translationsScript);
    }
    
    // Check if global-translation.js is already included
    if (!document.querySelector('script[src="js/global-translation.js"]')) {
      const globalTranslationScript = document.createElement('script');
      globalTranslationScript.src = 'js/global-translation.js';
      document.head.appendChild(globalTranslationScript);
    }
  }
  
  // Add translation scripts when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTranslationScripts);
  } else {
    addTranslationScripts();
  }
})();