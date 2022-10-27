import React, { Suspense, useRef, useState } from 'react'
import PrintWeatherForcastData from './PrintWeatherForcastData';
import PrintCurrentWeather from './PrintCurrentWeather';
import SelectCity from './SelectCity';
import './App.css'
import './../css/weathericons.css';
const Loading = () => <div className='loader'></div>;


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCityCurrentWeather, setselectedCityCurrentWeather] = useState();
  const [weatherForecastData, setWeatherForecastData] = useState();
  const [city, setCity] = useState<string>("");


  return (
    <div className="App">
      <SelectCity
        setLoading={setLoading}
        setWeatherForecastData={setWeatherForecastData}
        setselectedCityCurrentWeather={setselectedCityCurrentWeather}
        setCity={setCity}
      />
      {loading ? <Loading /> : <div className='weatherResultData'>
        {selectedCityCurrentWeather && <PrintCurrentWeather city={city} selectedCityCurrentWeather={selectedCityCurrentWeather} />}
        {weatherForecastData && <PrintWeatherForcastData weatherForecastData={weatherForecastData} />}
      </div>
      }
    </div>
  )
}

export default App;
