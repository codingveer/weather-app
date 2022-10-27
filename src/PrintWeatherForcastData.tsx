const PrintWeatherForcastData = ({ weatherForecastData }) => {
  return (
    <>{(weatherForecastData && weatherForecastData.length) &&
      <div className="weatherForecastTable">
        <div className='weatherRow  forecastHeader'>
          {weatherForecastData.map(data => <span>{data.day}</span>)}
        </div>
        <div className='weatherRow weatherRowIcons'>
          {weatherForecastData.map(data => <span><i className={`wi wi-icon-${data.weatherIcon} weather-main`}></i></span>)}
        </div>
        <div className='weatherRow marginTopRow'>
          {weatherForecastData.map(data => (<>
            <div>{data.temp_max}&deg;</div>
            <div>
              {data.temp_max}&deg;
            </div>
          </>))}

        </div>
        <div className='weatherRow'>
        </div>
      </div>}
    </>
  )
}
export default PrintWeatherForcastData;