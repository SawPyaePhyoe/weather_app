let celVal = null;
const api_key = "e4b21160be86bobat4396ff5dfe04fa7";
const form = document.querySelector("#frm");
const inp_city = document.querySelector("#inp_city");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const describ = document.querySelector("#describtion");
const icon = document.querySelector("#icon");
const temp = document.querySelector("#temperature");
// const cel = document.querySelector("#celsius-link");
// const fah = document.querySelector("#fahrenheit-link");
const humi = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

function formatDate(date) {
  let currentDate = new Date(date);
  let hour = currentDate.getHours();
  let min = currentDate.getMinutes();
  let day = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${days[day]} ${hour}:${min}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach((item, index) => {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 d-flex flex-column align-items-center">
        <div class="weather-forecast-date">${formatDay(item.time)}</div>
        <img
          src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            item.condition.icon
          }.png
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            item.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            item.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${api_key}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  city.innerText = response.data.city;
  date.innerText = formatDate(response.data.time * 1000);
  describ.innerText = response.data.condition.description;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", `${response.data.condition.description}`);
  celVal = response.data.temperature.current;
  temp.innerText = Math.round(celVal);
  humi.innerText = response.data.temperature.humidity;
  wind.innerText = Math.round(response.data.wind.speed * 3.6);
  getForecast(response.data.coordinates);
}
const search = (city) => {
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${api_key}&units=metric`;
  axios.get(url).then(displayTemp);
};

form.onsubmit = (e) => {
  e.preventDefault();
  search(inp_city.value);
};
// fah.onclick = () => {
//   cel.classList.remove("active");
//   fah.classList.add("active");
//   let fahrenheiTemperature = (celVal * 9) / 5 + 32;
//   temp.innerHTML = Math.round(fahrenheiTemperature);
// };

// cel.onclick = () => {
//   cel.classList.add("active");
//   fah.classList.remove("active");
//   temp.innerHTML = Math.round(celVal);
// };
search("Myeik");
