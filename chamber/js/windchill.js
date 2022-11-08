let temp = 45,
    windspeed = 8,
    chill = null;
    
if (temp <= 50 && windspeed > 3) {
    chill = Math.round(
        (35.74 + (0.6215 * temp)) - (35.75 * Math.pow(windspeed, 0.16)) + (0.4275 * temp * Math.pow(windspeed, 0.16))
    );
}

document.getElementById('content__temp').innerText = temp + 'F';
document.getElementById('wind-speed').innerText = windspeed + ' MPH';
document.getElementById('wind-chill').innerText = (chill + 'F') ?? 'N/A';