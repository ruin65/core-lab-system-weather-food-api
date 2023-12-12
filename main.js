document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const locationInput = document.getElementById("locationInput");
    const weatherResultDiv = document.getElementById("weatherResult");
    const recipeResultDiv = document.getElementById("recipeResult"); // 新增加的食谱结果容器

    searchButton.addEventListener("click", function() {
        searchWeather();
    });
  
    async function searchWeather() {
        const locationName = locationInput.value;
        if (!locationName) {
            weatherResultDiv.innerHTML = "<p>Please enter a location.</p>";
            recipeResultDiv.innerHTML = ""; // 清空食谱推荐容器
            return;
        }

        try {
            const response = await fetch(`https://weathernow-wigc.onrender.com/weather?locationName=${encodeURIComponent(locationName)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const weatherData = await response.json();
            displayWeatherData(weatherData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherResultDiv.innerHTML = `<p>Error fetching weather data.</p>`;
            recipeResultDiv.innerHTML = ""; // 清空食谱推荐容器
        }
    }
  
    function displayWeatherData(data) {
        if (data && data.success && data.data) {
            const weatherInfo = data.data;
    
            const temperatureF = kelvinToFahrenheit(weatherInfo.main.temp).toFixed(1);
            const recipe = getRecipeByTemperature(temperatureF); // 获取食谱对象
    
            const cityImage = document.getElementById("plateimage");
            cityImage.style.display = 'block'; 
    
            weatherResultDiv.innerHTML = `
                <div class="weather-info">
                    <br><br><br>
                    <h2>${weatherInfo.name}, ${weatherInfo.sys.country}</h2>
                    <p>Temperature: ${temperatureF} °F</p>
                    <p>Humidity: ${weatherInfo.main.humidity}%</p>
                    <p>Wind Speed: ${weatherInfo.wind.speed} m/s</p>
                    <p>Cloudiness: ${weatherInfo.clouds.all}%</p>
                </div>
            `;
    
            recipeResultDiv.innerHTML = `<br><br><br><h3>Recommended Recipe</h3> <h4>${recipe.name}</h4> <br><br><p>${recipe.description}</p>`;
        } else {
            weatherResultDiv.innerHTML = "<p>Weather data not available for this location.</p>";
            recipeResultDiv.innerHTML = ""; // 清空食谱推荐容器
        }
    }
    

    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9/5 + 32;
    }

    function getRecipeByTemperature(temperatureF) {
        if (temperatureF >= 95) {
            return { name: "Chilled Gazpacho", description: "A refreshing, cold tomato soup with cucumber, bell peppers, and onions." };
        } else if (temperatureF >= 85) {
            return { name: "Summer Berry Salad", description: "A light salad with mixed berries, spinach, and a sweet vinaigrette." };
        } else if (temperatureF >= 75) {
            return { name: "Grilled Vegetable Skewers", description: "Skewers of marinated vegetables grilled to perfection." };
        } else if (temperatureF >= 65) {
            return { name: "Chicken Caesar Wrap", description: "Grilled chicken with Caesar salad wrapped in a soft tortilla." };
        } else if (temperatureF >= 55) {
            return { name: "Margherita Pizza", description: "Classic pizza with fresh tomatoes, mozzarella, and basil." };
        } else if (temperatureF >= 45) {
            return { name: "Creamy Mushroom Soup", description: "A rich and creamy soup with a mix of wild mushrooms." };
        } else if (temperatureF >= 35) {
            return { name: "Classic Beef Stew", description: "Hearty stew with tender beef chunks, potatoes, and carrots." };
        } else if (temperatureF >= 25) {
            return { name: "Spicy Chili", description: "A bold and spicy chili with ground beef and beans." };
        } else if (temperatureF >= 15) {
            return { name: "Hot Chocolate with Marshmallows", description: "Warm and comforting chocolate drink topped with marshmallows." };
        } else {
            return { name: "Hearty Lentil Pot Pie", description: "Savory pie filled with lentils and vegetables in a rich gravy." };
        }
    }
});
