// Fix navigation to remove redundancy between home and dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Update navigation links
  const navLinks = document.querySelectorAll('.menu a[href="home.html"]');
  navLinks.forEach(link => {
    link.href = "index.html";
    link.textContent = "Home";
  });
  
  // Redirect home.html to index.html
  if (window.location.pathname.endsWith('home.html')) {
    window.location.replace('index.html');
  }
});