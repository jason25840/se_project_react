export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
  };
  result.type = getWeatherType(
    (result.temp.F = `${Math.round(data.main.temp)}`),
    (result.temp.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}`)
  );
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, data);
  return result;
};

const isDay = ({ sunrise, sunset }, data) => {
  const now = new Date(data.dt * 1000);
  return now >= new Date(sunrise * 1000) && now <= new Date(sunset * 1000);
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else if (temperature < 66) {
    return "cold";
  }
};

