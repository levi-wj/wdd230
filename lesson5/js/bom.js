window.addEventListener('load', () => {
    let input = document.getElementById('favchap'),
        listEle = document.getElementById('chaplist');

    document.getElementById('favchapbtn').addEventListener('click', () => {
        if (input.value) {
            listEle.appendChild(createBOMRow(input.value));
            input.value = '';
            input.focus();
        }
    });

    function createBOMRow(value) {
        let li = document.createElement('li'),
            button = document.createElement('button');

        li.innerText = value;
        button.innerHTML = '<i class="fa fa-xmark"></i>';
        button.classList.add('list-x-button');
        button.ariaLabel = 'Delete row button';
        button.onclick = removeBOMRow;

        li.appendChild(button);

        return li;
    }

    function removeBOMRow() {
        this.parentElement.remove();
    }
});
