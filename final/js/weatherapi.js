navigator.geolocation.getCurrentPosition(res => {
    const LAT = res.coords.latitude.toFixed(4),
        LON = res.coords.latitude.toFixed(4);
    
    (async () => {
        const APIKEY = '90427170ad700f5d9f60d25078b99c82',
            APIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&q=Fairbanks&units=units=imperial&appid=${APIKEY}`,
            response = await fetch(APIURL);

        weather = await response.json();
        console.log(weather)
        showWeather(weather);
    })();
});

showWeather = (weatherData) => {
    let curTempEle = document.getElementById('current-temp'),
        iconPathEle = document.getElementById('icon-src'),
        iconEle = document.getElementById('weathericon')
        figurecaption = document.querySelector('figcaption');
    const ICONURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        temp = Math.round((weatherData.main.temp - 273.15)* 1.8000 + 32.00);

    curTempEle.textContent = temp;
    iconPathEle.textContent = ICONURL;
    iconEle.setAttribute('src', ICONURL);
    iconEle.setAttribute('alt', weatherData.weather[0].description);
    figurecaption.textContent = weatherData.weather[0].description;
}