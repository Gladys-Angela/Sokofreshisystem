// This script hides Home, Products, and About Us links in the vendor portal after login
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is a vendor
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  // Get the navigation menu
  const navMenu = document.querySelector('.menu');
  
  if (isLoggedIn && userRole === 'vendor') {
    // If logged in as vendor, hide Home, Products, and About Us links
    const linksToHide = navMenu.querySelectorAll('a[href="index.html"], a[href="products.html"], a[href="about.html"]');
    
    linksToHide.forEach(link => {
      const listItem = link.parentElement;
      if (listItem) {
        listItem.style.display = 'none';
      }
    });
  }
});