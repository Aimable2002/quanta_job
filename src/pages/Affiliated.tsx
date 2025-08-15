import styles from '../css/Affiliated.module.css'

const AffiliateCTA = () => {
  return (
    <section id="affiliate" className={styles.affiliateCta}>
      <div className={styles.container}>
        <div className={styles.affiliateContent}>
          <h2 className={styles.affiliateTitle}>Support Our Innovation</h2>
          <p className={styles.affiliateText}>
            Partner with us to advance AI technology or contribute to our mission of building transformative intelligence solutions.
          </p>
          <a href="donate.html" className={`${styles.btn} ${styles.btnPrimary}`}>Support Us</a>
        </div>
      </div>
    </section>
  );
};

export default AffiliateCTA;