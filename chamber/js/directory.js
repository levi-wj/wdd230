var directory = (function () {
    let curView = 'grid',
        cardContainer = null,
        listContainer = null,
        cardButton = null,
        listButton = null;
    const companyData = (async () => {
        return await fetch(document.location.origin + '/wdd230/chamber/data/data.json')
            .catch(alert)
            .then(response => response.json());
        })();

    window.addEventListener('load', async () => {
        cardContainer = document.getElementById('main__card-section');
        listContainer = document.getElementById('main__list-section');
        cardButton = document.getElementById('discover__cardbutton');
        listButton = document.getElementById('discover__listbutton');

        companyData.then(companyJSON => {
            companyJSON.forEach(company => {
                let card = createCard(company),
                    li = createLi(company);

                cardContainer.appendChild(card);
                listContainer.appendChild(li);
            });
        });
    });

    createCard = data => {
        let card = document.createElement('section'),
            img = document.createElement('img'),
            name = document.createElement('h4'),
            address = document.createElement('p'),
            phone = document.createElement('p'),
            site = document.createElement('a');

        img.setAttribute('src', data.img);
        img.height = 160;
        name.textContent = data.name;
        address.innerText = data.address;
        phone.innerText = data.phone;
        site.innerText = data.website;
        site.href = data.website;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(site);

        return card;
    }

    createLi = data => {
        let row = document.createElement('tr'),
            name = document.createElement('td'),
            address = document.createElement('td'),
            phone = document.createElement('td'),
            sitetd = document.createElement('td'),
            sitea = document.createElement('a');

        name.textContent = data.name;
        address.innerText = data.address;
        phone.innerText = data.phone;
        sitea.innerText = data.website;
        sitea.href = data.website;
        sitetd.appendChild(sitea);

        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(phone);
        row.appendChild(sitetd);

        return row;
    }

    changeView = view => {
        if (curView !== view) {
            curView = view;
            cardContainer.classList.toggle('hidden');
            listContainer.classList.toggle('hidden');
            cardButton.classList.toggle('active');
            listButton.classList.toggle('active');
        }
    }

    return {
        changeView: changeView
    }
})();