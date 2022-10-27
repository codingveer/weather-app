const PrintCurrentWeather = ({ selectedCityCurrentWeather = [], city }) => {
  return (
    <>
      <div>
        {selectedCityCurrentWeather &&
          selectedCityCurrentWeather.map((data) => {
            return (<div>
              <div className='weatherTitle'>{city}</div>
              <div><i className={`wi wi-icon-${data.weatherIcon} weather-main`}></i></div>
              <div className='currentTemprature'>{data.temp_max}<span>&deg;</span></div>
            </div>)
          })}
      </div>
    </>
  )
}

export default PrintCurrentWeather;