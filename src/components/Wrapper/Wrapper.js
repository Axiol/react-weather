import { useQuery } from 'react-query';

import styles from './Wrapper.module.css';

import Weather from '../Weather/Weather';

const Wrapper = () => {
  const { isLoading, error, data } = useQuery('weatherData', () =>
     fetch(`${process.env.REACT_APP_API_URL}/weather?q=liège&units=metric&appid=${process.env.REACT_APP_API_KEY}`).then(res =>
       res.json()
     )
   );

  if (isLoading) return 'Loading...';
  if (error) return 'Error.';

  return (
    <div className={styles.wrapper}>
      <div className={styles.weather}>
        <Weather place={data.name} condition={data.weather[0].description} conditionId={data.weather[0].id} temperature={data.main.temp} feels={data.main.feels_like} />
      </div>
      <div className={styles.data}>
        &nbsp;
      </div>
    </div>
  )
};

export default Wrapper