import styles from './Weather.module.css';

const atmosphere = require('../../assets/images/atmosphere.svg');
const clear = require('../../assets/images/clear.svg');
const clouds = require('../../assets/images/clouds.svg');
const drizzle = require('../../assets/images/drizzle.svg');
const rain = require('../../assets/images/rain.svg');
const snow = require('../../assets/images/snow.svg');
const thunderstorm = require('../../assets/images/thunderstorm.svg');

const Weather = ({place, condition, conditionId, temperature, feels}) => {
  let weatherIcon = null;
  switch (true) {
    case (conditionId >= 200 && conditionId < 300):
      weatherIcon = thunderstorm;
      break;
    case (conditionId >= 300 && conditionId < 400):
      weatherIcon = drizzle;
      break;
    case (conditionId >= 500 && conditionId < 600):
      weatherIcon = rain;
      break;
    case (conditionId >= 600 && conditionId < 700):
      weatherIcon = snow;
      break;
    case (conditionId >= 700 && conditionId < 800):
      weatherIcon = atmosphere;
      break;
    case (conditionId === 800):
      weatherIcon = clear;
      break;
    case (conditionId >= 800 && conditionId < 810):
      weatherIcon = clouds;
      break;
    default:
      weatherIcon = clear;
  }

  return (
    <div className={styles.weather}>
      <h1 className={styles.titre}>{place}</h1>
      <p className={styles.current}>{condition}</p>
      <img className={styles.icon} src={weatherIcon.default} alt={condition} />
      <p className={styles.temperature}>{temperature}°C</p>
      <p className={styles.feels}>Feels like {feels}°C</p>
    </div>
  )
};

export default Weather;