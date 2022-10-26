let temp = 55,
    windspeed = 10,
    chill = Math.round((35.74 + (0.6215 * temp))-(35.75 * Math.pow(windspeed,0.16)) + (0.4275*temp*Math.pow(windspeed,0.16)));

document.getElementById('wind-speed').innerText = windspeed + ' MPH';
document.getElementById('wind-chill').innerText = chill;