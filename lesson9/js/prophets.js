const requestURL = document.location.origin + '/lesson9/data/prophets.json';

fetch(requestURL)
    .then(response => response.json())
    .then(jsonObject => {
        console.log(jsonObject)
        jsonObject.prophets.forEach(displayProphets);
    });

displayProphets = prophet => {
    let card = document.createElement('section'),
        img = document.createElement('img'),
        birthDate = document.createElement('p'),
        birthPlace = document.createElement('p'),
        h2 = document.createElement('h2');

    h2.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
    img.setAttribute('src', prophet.imageurl);

    card.appendChild(h2);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(img);
    document.getElementById('cards').appendChild(card);
}