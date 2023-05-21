let celVal = null;
const form = document.querySelector("#frm");
const inp_city = document.querySelector("#inp_city");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const describ = document.querySelector("#describtion");
const icon = document.querySelector("#icon");
const temp = document.querySelector("#temperature");
const cel = document.querySelector("#celsius-link");
const fah = document.querySelector("#fahrenheit-link");
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

function displayTemp(response) {
  city.innerText = response.data.name;
  date.innerText = formatDate(response.data.dt * 1000);
  describ.innerText = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
  celVal = response.data.main.temp;
  temp.innerText = Math.round(celVal);
  humi.innerText = response.data.main.humidity;
  wind.innerText = Math.round(response.data.wind.speed * 3.6);
}
const search = (city) => {
  const api_key = "937856c108498ceccba8d4ca9fce0eeb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  axios.get(url).then(displayTemp);
};

form.onsubmit = (e) => {
  e.preventDefault();
  search(inp_city.value);
};
fah.onclick = () => {
  cel.classList.remove("active");
  fah.classList.add("active");
  let fahrenheiTemperature = (celVal * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheiTemperature);
};

cel.onclick = () => {
  cel.classList.add("active");
  fah.classList.remove("active");
  temp.innerHTML = Math.round(celVal);
};
search("Myeik");
