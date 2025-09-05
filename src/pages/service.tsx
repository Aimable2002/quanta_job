import { FaLaptopCode, FaMobileAlt, FaRobot, FaGraduationCap, FaBrain } from 'react-icons/fa';
import servicesData from '../decla/service';
import styles from '../css/Service.module.css'

const Services = () => {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>
            World-class technologies driven by AI, AGI, and superintelligence
          </p>
        </div>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesScroll}>
            {servicesData.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon === 'laptop-code' && <FaLaptopCode />}
                  {service.icon === 'mobile-alt' && <FaMobileAlt />}
                  {service.icon === 'robot' && <FaRobot />}
                  {service.icon === 'graduation-cap' && <FaGraduationCap />}
                  {service.icon === 'brain' && <FaBrain />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a 
                  href={service.link} 
                  className={styles.btnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;