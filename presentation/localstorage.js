const valueContainer = document.getElementById('value-container'),
    valueInput = document.getElementById('store-value'),
    saveBtn = document.getElementById('submit-value'),
    viewBtn = document.getElementById('read-value'),
    keyName = 'demokey';

const saveValue = () => {
    localStorage.setItem(keyName, valueInput.value);
    valueInput.value = '';
}

const viewValue = () => valueContainer.innerText = localStorage.getItem(keyName);

saveBtn.addEventListener('click', saveValue);
viewBtn.addEventListener('click', viewValue)