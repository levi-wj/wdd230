window.addEventListener('load', () => {
    const stars = document.querySelectorAll('.fa-star');
    let starData = JSON.parse(localStorage.getItem('favorites')) ?? [];

    const starClick = (star, id) => {
        switchStarIcon(star);
        starData[id] = (star.classList.contains('fa-solid')) ? 1 : 0;
        localStorage.setItem('favorites', JSON.stringify(starData));
    }

    const switchStarIcon = (star) => {
        star.classList.toggle('fa-regular');
        star.classList.toggle('fa-solid');
    }

    for (let i = 0; i < stars.length; i++) {
        const id = i;
        if (starData[i] === 1) { switchStarIcon(stars[i]); }
        stars[i].onclick = () => { starClick(stars[i], id); };
    }
});