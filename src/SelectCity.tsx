import React from 'react';
import { citiesFr } from './../cities-fr';
import { apikey, weekdays } from './../local_env'

type weather = {
  "id": number,
  "main": string,
  "description": string,
  "icon": string
};
type main = {
  temp: number,
  temp_min: number,
  temp_max: number,
}
type CurrentWeatherType = {
  weatherIcon: number,
  day: string,
  weather: weather[],
  dt_txt: string,
  main: main
};
type splice = {
  splice: (x: number, y: number) => any[]
}
type Iprops = {
  setLoading: (state: boolean) => void,
  setWeatherForecastData: (x: any) => void,
  setselectedCityCurrentWeather: (data: any) => void,
  setCity: (city: string) => void
}

const SelectCity: React.FC<Iprops> = ({ setLoading, setWeatherForecastData, setselectedCityCurrentWeather, setCity }) => {
  const slectedCity = async (event: any) => {
    setLoading(true)
    const lat = event.target[event.target.selectedIndex].getAttribute('data-lat');
    const lon = event.target[event.target.selectedIndex].getAttribute('data-lat');
    const city = event.target[event.target.selectedIndex].getAttribute('data-city').toUpperCase();
    setCity(city);
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
    let weatherForecastData = weatherForecast.list.map((data: CurrentWeatherType) => {
      const date = new Date(data["dt_txt"]);
      const getWeekDay = weekdays[date.getDay()]
      const day = { day: getWeekDay.substring(0, 3) }
      const weatherIcon = data.weather[0].id;
      const temperature = { temp: data.main.temp, temp_max: data.main.temp_max, temp_min: data.main.temp_min, }
      return { ...day, ...temperature, weatherIcon }
    });
    const getSingleDayReport: CurrentWeatherType[] = weatherForecastData.filter((data: any, index: number) => (index % 8 === 0));
    const getDataForThreeDays = getSingleDayReport.splice(1, 3);
    setWeatherForecastData(getDataForThreeDays);
    setLoading(false);
  }
  return (
    <>
      <select onChange={slectedCity} className='citySelected'>
        <option>Please select the city ...</option>
        {citiesFr.map((city: {
          id: string | undefined;
          lat: any;
          lon: any; nm: string
        }) => {
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
    </>
  )
}

export default SelectCity