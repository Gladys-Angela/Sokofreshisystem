// Batch update script to add translation support to all pages
// This script should be run in the browser console on any page of the website

(function() {
  // Function to fetch HTML content
  async function fetchHtml(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  }

  // Function to update HTML with translation scripts
  function addTranslationScripts(html) {
    // Check if scripts are already included
    if (html.includes('global-translation.js') || html.includes('auto-include-translations.js')) {
      return html; // Already has translation scripts
    }
    
    // Add auto-include script before </head>
    return html.replace('</head>', '<script src="js/auto-include-translations.js"></script>\n</head>');
  }

  // Function to save updated HTML
  async function saveHtml(url, html) {
    console.log(`Would save updated HTML to ${url}`);
    // In a real implementation, this would use a server-side API to save the file
    // For demonstration purposes, we'll just log what would be saved
    
    // Example of what a real implementation might look like:
    /*
    try {
      const response = await fetch('/api/save-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: url, content: html })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save ${url}: ${response.status} ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error saving ${url}:`, error);
      return false;
    }
    */
    
    return true; // Simulate successful save
  }

  // Main function to update all pages
  async function updateAllPages() {
    // List of HTML files to update
    const pages = [
      'index.html', 'about.html', 'products.html', 'cart.html',
      'login.html', 'register.html', 'checkout.html',
      'customer_dashboard.html', 'my_orders.html', 'wishlist.html',
      // Add all other HTML files here
    ];
    
    console.log(`Starting batch update of ${pages.length} pages...`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const page of pages) {
      console.log(`Processing ${page}...`);
      
      // Fetch current HTML
      const html = await fetchHtml(page);
      if (!html) {
        failCount++;
        continue;
      }
      
      // Add translation scripts
      const updatedHtml = addTranslationScripts(html);
      
      // Save updated HTML
      const success = await saveHtml(page, updatedHtml);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    console.log(`Batch update completed: ${successCount} pages updated, ${failCount} failed.`);
    console.log('Note: This is a simulation. In a real implementation, you would need server-side code to actually save the files.');
    console.log('Please follow the instructions in update-all-pages.html to manually update your files.');
  }

  // Run the update
  updateAllPages();
})();