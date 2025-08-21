import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/internaship.module.css'
import interns from '../assets/images/inters.jpg'


const Internship = () => {
  return (
    <section className={styles.internship} id="internship">
      <div className={styles.container}>
        <div className='flex flex-col text-center pb-10'>
          <h2 className='font-bold text-4xl w-full'>Internship Program</h2>
          <p className=''>Shape your future with QUANTA</p>
        </div>
        <div className={styles.internshipContent}>
          <motion.div 
            className={styles.internshipImage}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={interns} alt="QUANTA interns" className={styles.internshipImg} />
          </motion.div>
          <motion.div 
            className={styles.internshipText}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Launch Your Tech Career</h3>
            <p>
              At QUANTA, we help new software developers grow by giving them the opportunity to work with
              experienced developers. Once you perform well, you'll have the chance to be selected as a
              full-time company employee.
            </p>
            <ul className={styles.internshipFeatures}>
              <li><FontAwesomeIcon icon={faCheckCircle} className="text-[#8828A3] mr-2" /> Hands-on experience with real projects</li>
              <li><FontAwesomeIcon icon={faCheckCircle} className="text-[#8828A3]  mr-2" /> Mentorship from industry experts</li>
              <li><FontAwesomeIcon icon={faCheckCircle} className="text-[#8828A3]  mr-2" /> Potential for full-time employment</li>
              <li><FontAwesomeIcon icon={faCheckCircle} className="text-[#8828A3]  mr-2" /> Cutting-edge technology stack</li>
            </ul>
            <div className={styles.internshipButtons}>
              <a href="internship.html" className={`${styles.btn} ${styles.btnPrimary}`}>
                Learn More About Our Program
              </a>
              <a 
                href="https://forms.gle/example" 
                className={`${styles.btn} ${styles.btnSecondary}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Internship;