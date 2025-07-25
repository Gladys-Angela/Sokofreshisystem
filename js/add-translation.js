// Script to add universal translation to all pages
document.addEventListener('DOMContentLoaded', function() {
  // Create language selector if it doesn't exist
  if (!document.getElementById('language-selector')) {
    createLanguageSelector();
  }
  
  // Add translation script if not already present
  if (!document.querySelector('script[src="js/universal-translate.js"]')) {
    const script = document.createElement('script');
    script.src = 'js/universal-translate.js';
    document.body.appendChild(script);
  }
});

function createLanguageSelector() {
  // Check if there's already a language selector container
  let container = document.querySelector('.language-selector-container');
  
  if (!container) {
    // Create container
    container = document.createElement('div');
    container.className = 'language-selector-container';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.zIndex = '1000';
    
    // Create select element
    const select = document.createElement('select');
    select.id = 'language-selector';
    select.style.padding = '5px';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid #ccc';
    
    // Add options
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
}