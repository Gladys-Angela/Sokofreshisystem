// Remove dashboard link from navigation
document.addEventListener('DOMContentLoaded', function() {
  // Remove dashboard link from main menu
  const dashboardLinks = document.querySelectorAll('.menu a[href="customer_dashboard.html"]');
  dashboardLinks.forEach(link => {
    const listItem = link.parentElement;
    if (listItem) {
      listItem.remove();
    }
  });
});