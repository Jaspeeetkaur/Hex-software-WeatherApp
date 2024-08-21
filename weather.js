const apiKey = "c6c9b641203da19df5a7fa3a618a1aaf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

async function checkweather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    
    if (response.status == 404) {
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
      
        // Weather icon update logic with debugging
        const weatherCondition = data.weather[0].main.toLowerCase();
        console.log(`Weather Condition: ${weatherCondition}`); // Debugging log

        let iconSrc = '';

        if (weatherCondition === "clouds") {
            iconSrc = 'clouds.png';
        } else if (weatherCondition === "clear") {
            iconSrc = 'clear.png';
        } else if (weatherCondition === "rain") {
            iconSrc = 'rain.png';
        } else if (weatherCondition === "drizzle") {
            iconSrc = 'drizzle.png';
        } else if (weatherCondition === "mist") {
            iconSrc = 'mist.png';
        } else {
            iconSrc = 'default.png'; // Default icon
        }

        console.log(`Icon Path: ${iconSrc}`); // Debugging log

        // Force reload to avoid caching issues
        weatherIcon.src = `${iconSrc}?v=${new Date().getTime()}`;

        weatherElement.style.display = "block";
        errorElement.style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
