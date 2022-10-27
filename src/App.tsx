import { Suspense, useRef, useState } from 'react'
import PrintWeatherForcastData from './PrintWeatherForcastData';
import PrintCurrentWeather from './PrintCurrentWeather'
import { citiesFr } from './../cities-fr';
import './App.css'
import './../css/weathericons.css';
const Loading = () => <div className='loader'></div>;

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCityCurrentWeather, setselectedCityCurrentWeather] = useState();
  const [weatherForecastData, setWeatherForecastData] = useState();

  const slectedCity = async (event) => {
    setLoading(true)
    const lat = event.target[event.target.selectedIndex].getAttribute('data-lat');
    const lon = event.target[event.target.selectedIndex].getAttribute('data-lat');
    const city = event.target[event.target.selectedIndex].getAttribute('data-city');
    setCity(city.toUpperCase());
    const apikey = "18d696b86e3d2c5639a52b32d6aff1e7";
    const weatherApi = `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    const weatherData = await fetch(weatherApi)
      .then(data => data.json())
      .then(data => data);
    const weatherForecastUrl = `https:api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&cnt=30&units=metric&appid=${apikey}`;
    const weatherForecast = await fetch(weatherForecastUrl)
      .then(data => data.json())
      .then(data => data);
    const currentWeather = [weatherData].map(data => {
      const date = new Date(data.dt);
      const getWeekDay = weekdays[date.getDay()]
      const day = { day: getWeekDay.substring(0, 3) }
      const weatherIcon = data.weather[0].id;
      const temprature = { temp: data.main.temp, temp_min: data.main.temp_min, temp_max: data.main.temp_max }
      return { ...temprature, ...day, weatherIcon }
    });
    setselectedCityCurrentWeather([...currentWeather]);
    console.log(selectedCityCurrentWeather, 'selectedCityCurrentWeather')
    let weatherForecastData = weatherForecast.list.map(data => {
      const date = new Date(data["dt_txt"]);
      const getWeekDay = weekdays[date.getDay()]
      const day = { day: getWeekDay.substring(0, 3) }
      const weatherIcon = data.weather[0].id;
      const temperature = { temp: data.main.temp, temp_max: data.main.temp_max, temp_min: data.main.temp_min, }
      return { ...day, ...temperature, weatherIcon }
    });
    const getSingleDayReport = weatherForecastData.filter((data, index, array) => (index % 8 === 0));
    setWeatherForecastData(getSingleDayReport.splice(1, 3));
    setLoading(false);
  }
  return (
    <div className="App">
      <select onChange={slectedCity} className='citySelected'>
        <option>Please select the city ...</option>
        {citiesFr.map((city: { nm: string }) => {
          return (
            <option
              id={city.id}
              key={city.id}
              data-lat={city.lat}
              data-lon={city.lon}
              data-city={city.nm}
              value={city.id}>
              {city.nm}
            </option>
          )
        })}
      </select>
      {loading ? <Loading /> : <div className='weatherResultData'>
        {selectedCityCurrentWeather && <PrintCurrentWeather city={city} selectedCityCurrentWeather={selectedCityCurrentWeather} />}
        {weatherForecastData && <PrintWeatherForcastData weatherForecastData={weatherForecastData} />}
      </div>
      }
    </div>
  )
}

export default App;
