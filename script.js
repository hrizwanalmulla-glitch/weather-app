const apiKey = CONFIG.API_KEY;

async function getWeather() {
  const city = document.getElementById("city").value;

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) {
    alert("City not found");
    return;
  }

  updateUI(data);
}

function updateUI(data) {
  document.getElementById("weather").classList.remove("hidden");

  const condition = data.weather[0].main.toLowerCase();

  document.getElementById("temp").innerText =
    `${Math.round(data.main.temp)}°C`;

  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("details").innerText =
    `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

   let icon = "☀️";

if (condition.includes("cloud")) icon = "☁️";
if (condition.includes("rain")) icon = "🌧️";
if (condition.includes("snow")) icon = "❄️";
if (condition.includes("clear")) icon = "☀️";

document.getElementById("icon").innerText = icon;

  changeBackground(condition);
}

function changeBackground(condition) {
  let image = "clear";

  if (condition.includes("cloud")) image = "clouds";
  if (condition.includes("rain")) image = "rain";
  if (condition.includes("snow")) image = "snow";
  if (condition.includes("haze") || condition.includes("mist")) image = "haze";

  document.body.style.backgroundImage = `url(${image}.jpg)`;
}

