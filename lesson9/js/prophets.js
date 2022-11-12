const requestURL = document.location.origin + '/wdd230/lesson9/data/prophets.json';

fetch(requestURL)
    .catch(alert)
    .then(response => response.json())
    .then(jsonObject => {
        jsonObject.prophets.forEach(displayProphet);
    });

displayProphet = pData => {
    let card = document.createElement('section'),
        img = document.createElement('img'),
        birthDate = document.createElement('p'),
        birthPlace = document.createElement('p'),
        h2 = document.createElement('h2');

    h2.textContent = `${pData.name} ${pData.lastname}`;
    birthDate.textContent = `Date of Birth: ${pData.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${pData.birthplace}`;
    img.setAttribute('src', pData.imageurl);

    card.appendChild(h2);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(img);
    document.getElementById('cards').appendChild(card);
}