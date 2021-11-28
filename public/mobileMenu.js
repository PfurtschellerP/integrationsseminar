var mobileMenuOpen = false;
var mobileMenu = document.getElementById('mobile-menu');
mobileMenu.style.display = 'none';
function toggleMobileMenu() {
  if (mobileMenuOpen) {
    mobileMenu.style.display = 'none';
    mobileMenuOpen = false;
  } else {
    mobileMenu.style.display = 'block';
    mobileMenuOpen = true;
  }
}
