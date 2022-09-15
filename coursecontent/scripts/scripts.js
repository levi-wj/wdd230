(function () {
    window.addEventListener('load', () => {
        const now = new Date();

        document.querySelector('footer div span').textContent = now.getFullYear();
        document.getElementById('last-updated').textContent = document.lastModified;
    });
})();