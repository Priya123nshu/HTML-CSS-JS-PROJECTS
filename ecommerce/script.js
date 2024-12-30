document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityname");
    const weatherButton = document.getElementById("cityclk");
    const weather = document.getElementById("weather-info");
    const cityn = document.getElementById("citypame");
    const cityt = document.getElementById("temp");
    const cityd = document.getElementById("des");
    const err = document.getElementById("error-message");

    const API_KEY = "Your API";

    weatherButton.addEventListener("click", async function () {
        const city = cityInput.value.trim();
        console.log(city);
        if (!city) return;
        try {
            const weatherData = await fetch_weather_data(city);
            display_weather_data(weatherData);
        } catch (error) {
            console.log("ssss")
            showError();
        }
    });

    async function fetch_weather_data(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        
            const response = await fetch(url);

            // Check if response is ok
            if (!response.ok) {
                console.log("hhhh")
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the response JSON
            const data = await response.json();

            console.log("Response Type:", typeof data);
            console.log("Response Data:", data);

            return data; // Return parsed data for further use
    }

    function display_weather_data(data) {
        const { name, main, weather } = data;
        cityn.textContent = name;
        const tempink = main.temp - 273;
        const tempinc = tempink.toFixed(2); // "15.56"

        cityt.textContent = `Temperature: ${main.temp} k / ${tempinc}°C`;
        cityd.textContent = `Weather: ${weather[0].description}`;
        weather.classList.remove("hidden"); // Show weather info
        err.classList.add("hidden"); // Hide error message
    }

    function showError() {
        weather.classList.remove("hidden"); // Hide the weather info
        err.classList.add("hidden"); // Show the error message
    }
});




































































