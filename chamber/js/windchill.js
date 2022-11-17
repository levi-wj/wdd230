(async () => {
    const APIKEY = '90427170ad700f5d9f60d25078b99c82',
        LAT = '64.8378',
        LON = '-147.7164',
        APIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&q=Fairbanks&units=units=imperial&appid=${APIKEY}`,
        response = await fetch(APIURL);

    weather = await response.json();
    // console.log(weather)
    showWeather(weather);
})();

showWeather = (weatherData) => {
    let chill = null;
    const ICONURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        temp = Math.round((weatherData.main.temp - 273.15) * 1.8000 + 32.00),
        windspeed = weatherData.wind.speed;
        
    if (temp <= 50 && windspeed > 3) {
        chill = Math.round(
            (35.74 + (0.6215 * temp)) - (35.75 * Math.pow(windspeed, 0.16)) + (0.4275 * temp * Math.pow(windspeed, 0.16))
        );
    }

    document.getElementById('content__temp').innerText = temp + 'F';
    document.getElementById('content__weather-icon').setAttribute('src', ICONURL);
    document.getElementById('content__weather-type').innerText = weatherData.weather[0].description;
    document.getElementById('content__wind-speed').innerText = windspeed + ' MPH';
    document.getElementById('content__wind-chill').innerText = (chill ? (chill + 'F') : 'N/A');
}