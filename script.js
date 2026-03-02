async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const resultDiv = document.getElementById("weatherResult");
    const button = document.querySelector('button[onclick="getWeather()"]');

    if (location === "") {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }

    const apiKey = "7498b6fe501847419c153010260203";
    // Use HTTPS and encode the query; trim whitespace from input
    const query = encodeURIComponent(location.trim());
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes`;

    try {
        // disable the button while fetching and show a loading state
        if (button) button.disabled = true;
        resultDiv.innerHTML = 'Loading...';

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
            const msg = (data && data.error && data.error.message) ? data.error.message : 'City not found. Try again!';
            resultDiv.innerHTML = msg;
            return;
        }

        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
        const cityName = data.location.name;
        const country = data.location.country;

        resultDiv.innerHTML = `
            <h3>${cityName}, ${country}</h3>
            <p>🌡 Temperature: ${temperature}°C</p>
            <p>☁ Condition: ${condition}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "Error fetching weather data.";
        console.error(error);
    } finally {
        if (button) button.disabled = false;
    }
}