import { motion } from 'framer-motion';
import styles from '../css/Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroOverlay}></div>
      <div className=' w-full'>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            TO THE UNIVERSE
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building AI-powered innovations that lead humanity into the next era of intelligence
          </motion.p>
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#products" className={`${styles.btn} ${styles.btnPrimary}`}>Explore Products</a>
            <a href="#services" className={`${styles.btn} ${styles.btnSecondary}`}>Explore Services</a>
            <a 
              href="/research" 
              className={`${styles.btn} ${styles.btnSecondary}`}
              rel="noopener noreferrer"
            >
              Research & Innovation Program
            </a>
          </motion.div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollDot}></span>
      </div>
    </section>
  );
};

export default Hero;