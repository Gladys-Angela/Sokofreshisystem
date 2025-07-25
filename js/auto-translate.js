// Auto-include translation system
(function() {
  // Add language selector CSS
  const linkExists = document.querySelector('link[href="css/language-selector.css"]');
  if (!linkExists) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/language-selector.css';
    document.head.appendChild(link);
  }
  
  // Add language selector if it doesn't exist
  if (!document.getElementById('language-selector')) {
    const container = document.createElement('div');
    container.className = 'language-selector-container';
    
    const select = document.createElement('select');
    select.id = 'language-selector';
    
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
    
    // Set current language
    const currentLang = localStorage.getItem('language') || 'en';
    select.value = currentLang;
    
    container.appendChild(select);
    document.body.appendChild(container);
  }
  
  // Load translations script if not already loaded
  if (typeof translations === 'undefined') {
    const translationsScript = document.createElement('script');
    translationsScript.src = 'js/translations.js';
    document.body.appendChild(translationsScript);
    
    translationsScript.onload = function() {
      loadTranslateScript();
    };
  } else {
    loadTranslateScript();
  }
  
  function loadTranslateScript() {
    // Load universal translate script if not already loaded
    if (!document.querySelector('script[src="js/universal-translate.js"]')) {
      const translateScript = document.createElement('script');
      translateScript.src = 'js/universal-translate.js';
      document.body.appendChild(translateScript);
    }
  }
})();