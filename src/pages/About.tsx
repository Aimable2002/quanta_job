import { motion } from 'framer-motion';
import styles from '../css/About.module.css'

import image1 from '../assets/images/img1.jpg'

const About = () => {
  return (
    <section className={styles.about} id="about" style={{paddingLeft: '10%', paddingRight: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div className=''>
        <div className='flex flex-col text-center'>
          <h2 className='font-bold text-4xl w-full'>Who We Are</h2>
          <p className={styles.sectionSubtitle}>
            The beginning of the most powerful tech company the world will ever know
          </p> 
        </div>
        <div className={styles.aboutContent}>
          <motion.div 
            className={styles.aboutText}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Our Vision</h3>
            <p>
              "To become the most powerful technology company in the world by building AI-powered innovations
              that lead humanity into the next era of intelligence — transforming life on Earth and beyond."
            </p>

            <h3>Our Mission</h3>
            <p>
              "To create world-class technologies driven by AI, AGI, and superintelligence — solving humanity's
              biggest challenges, shaping future realities before the world realizes them, and empowering a
              new global standard of innovation through extreme dedication, speed, and excellence."
            </p>
          </motion.div>
          <motion.div 
            className={styles.aboutImage}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={image1} alt="QUANTA team working" className={styles.aboutImg} />
            <div className={styles.imageOverlay}>
              <p>
                We are not here to play small. We are here to lead, dominate, and reimagine what's possible.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;