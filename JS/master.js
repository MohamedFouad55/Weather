const apiKey = "86d9bcab9b8f4a97a2152625240712";
const weatherData = document.getElementById("weatherData");
const getWeatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");

getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    await getWeather(city);
});

async function getWeather(city) {
    weatherData.innerHTML = "Loading...";
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
        );
        const data = await response.json();
        console.log(data);
        if (data.error) {
            weatherData.innerHTML = `<p class="text-danger">${data.error.message}</p>`;
            return;
        }
        displayWeather(data);
    } catch (error) {
        console.log(error);
        weatherData.innerHTML = `<p class="text-danger">Error fetching data</p>`;
    }
}

function displayWeather(data) {
    const forecast = data.forecast.forecastday;
    let cartona = ``;
    for (let i = 0; i < forecast.length; i++) {
        const day = forecast[i];
        cartona += `
            <div class="card border today text-bg-light mb-3" style="min-width: 33.33%">
                <div class="card-header d-flex justify-content-between align-items-baseline">
                    <span class="day">${day.date}</span>
                </div>
                <div class="card-body mt-3">
                    <h5 class="location">${data.location.name}</h5>
                    <p class="temperture display-2 fw-bolder text-white">
                        ${day.day.avgtemp_c}°C
                    </p>
                    <div>
                        <img loading="lazy" src="${day.day.condition.icon}" alt="forecast-icon" />
                    </div>
                    <p class="weather-condition text-primary">${day.day.condition.text}</p>
                    <div class="d-flex justify-content-between">
                        <span>
                            <img width="15" height="15" src="images/icon-umberella.png" alt="icon-umberella" />
                            20%
                        </span>
                        <span>
                            <img width="15" height="15" src="images/icon-wind.png" alt="icon-wind" />
                            18km/h
                        </span>
                        <span>
                            <img width="15" height="15" src="images/icon-compass.png" alt="icon-compass" />
                            East
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
    weatherData.innerHTML = cartona;
}

