import { useState } from 'react';

import styles from './Place.module.css';

const Place = ({onSubmit}) => {
  const [ place, setPlace ] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    onSubmit(place);
  }

  return (
    <div className={styles.place}>
      <form onSubmit={(e) => formSubmit(e)}>
        <input className={styles.input} placeholder={`Search for a city...`} onChange={(e) => {setPlace(e.target.value)}} />
      </form>
    </div>
  )
};

export default Place;