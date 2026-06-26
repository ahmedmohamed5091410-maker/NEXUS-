// Mobile Hamburger Menu - مشترك بين جميع الصفحات الفرعية
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (!hamburger) return;

    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('open');
        navOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        navOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);
});
