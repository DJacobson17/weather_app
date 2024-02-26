const searchForm = document.getElementById('searchForm');
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');
const checkbox = document.getElementById('scale');



searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(searchBar.value).then(data => {
    const scale = document.getElementById('scale');
    console.log(data);
    console.log(scale.checked);
    const forecast = data.forecast.forecast.forecastday;
    const lastUpdated = data.current.current.last_updated;
    const condition = data.current.current.condition;
    const forecastToday = forecast[0];
    const forecastTodayDate = forecastToday.date;
    const forecastTodayCondition = forecastToday.day.condition;
    const forecastTomorrow = forecast[1];
    const forecastTomorrowDate = forecastTomorrow.date;
    const forecastTomorrowCondition = forecastTomorrow.day.condition;
    const forecastDayAfterTomorrow = forecast[2];
    const forecastDayAfterTomorrowDate = forecastDayAfterTomorrow.date;
    const forecastDayAfterTomorrowCondition = forecastDayAfterTomorrow.day.condition;
    const location = data.current.location.name;
    const region = data.current.location.region;

    if (scale.checked == false) {
      console.log('Fahrenheit');
      const currentTemp = data.current.current.temp_f ;
      console.log(currentTemp);
      const feelsLike = data.current.current.feelslike_f;
      const forecastTodayMax = data.forecast.forecast.forecastday[0].day.maxtemp_f;
      const forecastTodayMin = data.forecast.forecast.forecastday[0].day.mintemp_f;
      const forecastTomorrowMax = data.forecast.forecast.forecastday[1].day.maxtemp_f;
      const forecastTomorrowMin = data.forecast.forecast.forecastday[1].day.mintemp_f;
      const forecastDayAfterTomorrowMax = data.forecast.forecast.forecastday[2].day.maxtemp_f;
      const forecastDayAfterTomorrowMin = data.forecast.forecast.forecastday[2].day.mintemp_f;
      return { location, region, lastUpdated, condition, forecastToday, forecastTodayDate, forecastTodayCondition, forecastTomorrowCondition, forecastTomorrowDate, forecastDayAfterTomorrowDate, forecastDayAfterTomorrowCondition  ,currentTemp, feelsLike, forecastTodayMax, forecastTodayMin, forecastTomorrowMax, forecastTomorrowMin, forecastDayAfterTomorrowMax, forecastDayAfterTomorrowMin}
    } else {
      const currentTemp = data.current.current.temp_c;
      console.log(currentTemp);
      const feelsLike = data.current.current.feelslike_c;
      const forecastTodayMax = data.forecast.forecast.forecastday[0].day.maxtemp_c;
      const forecastTodayMin = data.forecast.forecast.forecastday[0].day.mintemp_c;
      const forecastTomorrowMax = data.forecast.forecast.forecastday[1].day.maxtemp_c;
      const forecastTomorrowMin = data.forecast.forecast.forecastday[1].day.mintemp_c;
      const forecastDayAfterTomorrowMax = data.forecast.forecast.forecastday[2].day.maxtemp_c;
      const forecastDayAfterTomorrowMin = data.forecast.forecast.forecastday[2].day.mintemp_c;
      return { location, region, lastUpdated, condition, forecastToday, forecastTodayDate, forecastTodayCondition, forecastTomorrowCondition, forecastTomorrowDate, forecastDayAfterTomorrowDate, forecastDayAfterTomorrowCondition  ,currentTemp, feelsLike, forecastTodayMax, forecastTodayMin, forecastTomorrowMax, forecastTomorrowMin, forecastDayAfterTomorrowMax, forecastDayAfterTomorrowMin}
    };

}).catch (error => {

  console.error(error);
}).then(data => {
  console.log(data);

  result.innerHTML = '';
  displayResults(data);
});
});
  
function displayResults(data) {
  result.innerHTML = `
  <h1>${data.location}</h1>
  <h2>${data.region}</h2>
  <div class="current">
  <p>Last updated: ${data.lastUpdated}</p>
  <div class="currentTemp">${data.currentTemp}°</div>
  <p>Feels like: ${data.feelsLike}°</p>
  <p>${data.condition.text}</p>
  </div>
  <h2>3-Day Forecast</h2>
  <div class=forecast>
  <div  class="line">
  <h3>Today</h3>
  <p class="range">${data.forecastTodayMin}°-------------------- ${data.forecastTodayMax}°</p>
  <img src= '${data.forecastTodayCondition.icon}'/>
  </div>
  <div  class="line middle">
  <h3>Tomorrow</h3>
  <p class="range">${data.forecastTomorrowMin}°-------------------- ${data.forecastTomorrowMax}°</p>
  <img src= '${data.forecastTomorrowCondition.icon}'/>

  </div>
  <div  class="line">
  <h3>Day After Tomorrow</h3>
  <p class="range">${data.forecastDayAfterTomorrowMin}°-------------------- ${data.forecastDayAfterTomorrowMax}°</p>
  <img src= '${data.forecastDayAfterTomorrowCondition.icon}'/>
  </div>
  </div>
  `;
}



async function getWeather(location) {
  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(`https://api.weatherapi.com/v1/current.json?key=ea43a0ac9bf647dd922223359242202&q=${location}`),
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea43a0ac9bf647dd922223359242202&q=${location}&days=3`)
  ]);
  
  const [current, forecast] = await Promise.all([currentResponse.json(), forecastResponse.json()]);
  return { current, forecast };
}

