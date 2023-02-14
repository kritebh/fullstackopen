import React from 'react'

function Weather({weatherInfo}) {
  return (
    <div>
        <h3>Weather in {weatherInfo.capital}</h3>
        <p>temperature - {weatherInfo.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="icon" />
        <p>wind {weatherInfo.wind.speed} m/s</p>
    </div>
  )
}

export default Weather