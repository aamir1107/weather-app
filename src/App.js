import React, { useState } from 'react'
import classes from './app.module.scss'



const api = {
  key: "6808717a4b8f658ee72c3e3789e17650",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')

        });
    }
  }



  const dateBuilder = (e) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (

    <div className={`${classes.app}${weather?.main?.temp > 16 ? ` ${classes.warm}` : ''}`}>

      <div className={classes.searchBox}>
        <input className={classes.searchBar}
          type='text'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
          placeholder="search...">
        </input>
      </div>
      {(weather.main != undefined) ? (
        <div>
          <div className={classes.locatonBox}>
            <div className={classes.location}> {weather.name}</div>
            <div className={classes.date}> {dateBuilder(new Date())}</div>
          </div>

          <div className={classes.weatherBox}>
            <div className={classes.temp}>
              {Math.round(weather?.main?.temp || 0)}
            </div>
            <div className={classes.weather}>
              {weather?.main?.temp > 16 ? "Sunny" : "Cold"}
            </div>
            <div className={classes.humadity}>
              {weather?.main?.humidity}
            </div>
            <div className={classes.country}>
              {weather?.sys?.country}
            </div>
          </div>
        </div>
      ) : ('')}

    </div>

  );
}


export default App;
