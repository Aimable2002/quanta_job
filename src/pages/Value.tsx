import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import valuesData from '../decla/value';
import styles from '../css/value.module.css';

const Values = () => {
  return (
    <section className={styles.values}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionSubtitle}>The principles that drive our innovation</p>
        </div>

        <div className={styles.valuesGrid}>
          {valuesData.map((value) => (
            <div key={value.id} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FontAwesomeIcon icon={value.icon} className="#8828A3 text-3xl" />
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
