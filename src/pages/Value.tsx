import valuesData from '../decla/value';
import styles from '../css/value.module.css'

const Values = () => {
  return (
    <section className={styles.values}>
      <div className={styles.container}>
        <div className='flex flex-col text-center'>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionSubtitle}>The principles that drive our innovation</p>
        </div>
        <div className={styles.valuesGrid}>
          {valuesData.map((value) => (
            <div key={value.id} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <i className={`fas fa-${value.icon}`}></i>
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