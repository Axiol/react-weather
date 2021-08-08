import { useState } from 'react';
import { useQuery } from 'react-query';

import styles from './Wrapper.module.css';

import Weather from '../Weather/Weather';
import Card from '../Card/Card';
import Place from '../Place/Place';

const humidity = require('../../assets/images/humidity.svg');
const windspeed = require('../../assets/images/windspeed.svg');
const winddirection = require('../../assets/images/winddirection.svg');
const visibility = require('../../assets/images/visibility.svg');
const sunrise = require('../../assets/images/sunrise.svg');
const sunset = require('../../assets/images/sunset.svg');

const Wrapper = () => {
  const [ place, setPlace ] = useState('liège');

  const { isLoading, error, data } = useQuery(['weatherData', place], () =>
     fetch(`${process.env.REACT_APP_API_URL}/weather?q=${place}&units=metric&appid=${process.env.REACT_APP_API_KEY}`).then(res =>
       res.json()
     )
   );

   const mToKm = (value) => {
     return value / 1000;
   };

   const tcToHour = (value) => {
    const date = new Date(value * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    return hours + ':' + minutes.substr(-2);
   };

   const degToCardinal = (angle) => {
    const degreePerDirection = 360 / 8;
    const offsetAngle = angle + degreePerDirection / 2;
  
    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "N/E"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "S/E"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "S/W"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                  : "N/W";
  };

  const updatePlace = (value) => {
    console.log(value);
    setPlace(value);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error.';

  return (
    <div className={styles.wrapper}>
      <div className={styles.weather}>
        <Weather place={data.name} condition={data.weather[0].description} conditionId={data.weather[0].id} temperature={data.main.temp} feels={data.main.feels_like} />
      </div>
      <div className={styles.data}>
        <Place onSubmit={updatePlace} />
        <Card label={'Humidity'} value={data.main.humidity} unit={`%`} icon={humidity} />
        <Card label={'Wind speed'} value={data.wind.speed} unit={`m/s`} icon={windspeed} />
        <Card label={'Wind direction'} value={degToCardinal(data.wind.deg)} icon={winddirection} />
        <Card label={'Visibility'} value={mToKm(data.visibility)} unit={`km`} icon={visibility} />
        <Card label={'Sunrise'} value={tcToHour(data.sys.sunrise)} icon={sunrise} />
        <Card label={'Sunset'} value={tcToHour(data.sys.sunset)} icon={sunset} />
      </div>
    </div>
  )
};

export default Wrapper