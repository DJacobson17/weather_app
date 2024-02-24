async function getWeather(location) {
  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(`https://api.weatherapi.com/v1/current.json?key=ea43a0ac9bf647dd922223359242202&q=${location}`),
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea43a0ac9bf647dd922223359242202&q=${location}&days=3`)
  ]);
  
  const [current, forecast] = await Promise.all([currentResponse.json(), forecastResponse.json()]);
  return { current, forecast };
}

getWeather('Chicago').then(data => {
  console.log(data);
  const lastUpdated = data.current.current.last_updated;
  const currentTempF = data.current.current.temp_f;
  const currentFeelsLikeF = data.current.current.feelslike_f;
  const currentTempC = data.current.current.temp_c;
  const currentFeelsLikeC = data.current.current.feelslike_c;
  const condition = data.current.current.condition;

  const forecast = data.forecast.forecastday;
  const forecastToday = forecast[0];
  const forecastTomorrow = forecast[1];
  const forecastTodayDate = forecastToday.date;
  const forecastDayAfterTomorrowDate = forecastDayAfterTomorrow.date;
  const forecastTodayCondition = forecastToday.day.condition;
  const forecastTodayMaxF = forecastToday.day.maxtemp_f; 
  const forecastTodayMinF = forecastToday.day.mintemp_f;
  const forecastTodayMaxC = forecastToday.day.maxtemp_c;
  const forecastTodayMinC = forecastToday.day.mintemp_c;
  const forecastTomorrowDate = forecastTomorrow.date;
  const forecastTomorrowCondition = forecastTomorrow.day.condition;
  const forecastTomorrowMaxF = forecastTomorrow.day.maxtemp_f;
  const forecastTomorrowMinF = forecastTomorrow.day.mintemp_f;
  const forecastTomorrowMaxC = forecastTomorrow.day.maxtemp_c;
  const forecastTomorrowMinC = forecastTomorrow.day.mintemp_c;
  const forecastDayAfterTomorrow = forecast[2];
  const forecastDayAfterTomorrowCondition = forecastDayAfterTomorrow.day.condition;
  const forecastDayAfterTomorrowMaxF = forecastDayAfterTomorrow.day.maxtemp_f;
  const forecastDayAfterTomorrowMinF = forecastDayAfterTomorrow.day.mintemp_f;
  const forecastDayAfterTomorrowMaxC = forecastDayAfterTomorrow.day.maxtemp_c;
  const forecastDayAfterTomorrowMinC = forecastDayAfterTomorrow.day.mintemp_c;


  console.log(`Last updated: ${lastUpdated}`);
  console.log(`Current temperature in F: ${currentTempF}`);
  console.log(`Feels like in F: ${currentFeelsLikeF}`);
  console.log(`Current temperature in C: ${currentTempC}`);
  console.log(`Feels like in C: ${currentFeelsLikeC}`);
  console.log(`Condition: ${condition.text}`);
}).catch (error => {

  console.error(error);
});

