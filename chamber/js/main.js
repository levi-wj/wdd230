window.addEventListener('load', () => {
    let d = new Date();

    setupOnclicks();   

    // Header announcement
    if (d.getDay() > 0 && d.getDay() < 3) {
        document.getElementById('header__announcement').classList.remove('hidden');
    }

    // Header date
    document.getElementById('header__date').innerText = 
        `${d.toLocaleDateString('en-us', {weekday: 'long'})}, ${d.getDate()} ${d.toLocaleDateString('en-us', {month: 'long'})} ${d.getFullYear()}`;

    // Footer date
    document.getElementById('footer__lastupdated').innerText = document.lastModified;
});

function setupOnclicks() {
    document.getElementById('header__hambtn').addEventListener('click', () => {
        document.getElementById('header__navbar--mobile').classList.toggle('hidden');
    });
}