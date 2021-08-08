import styles from './Card.module.css';

const Card = ({label, value, unit = '', icon}) => {
  return (
    <div className={styles.card}>
      <p>{label}</p>
      <p className={styles.value}>{value}</p>
      <p>{unit}</p>
      <img className={styles.image} src={icon.default} alt={`Humidity`} />
    </div>
  )
};

export default Card;