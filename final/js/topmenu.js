window.addEventListener('load', () => {
    const mobileMenu = document.getElementById('navbar-mobile');

    document.getElementById('ham-btn').addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});