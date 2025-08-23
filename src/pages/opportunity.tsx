import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/opportunity.module.css'

const Opportunity = () => {
  // Mock job data - in a real app, this would come from an API
  const jobOpenings = [
    {
      id: 1,
      title: "Software Engineer – AI Systems",
      team: "Engineering",
      location: "Kigali HQ",
      deadline: "2023-12-15",
    },
    {
      id: 2,
      title: "Product Manager",
      team: "Product",
      location: "Remote",
      deadline: "2023-12-20",
    },
    {
      id: 3,
      title: "Business Development Associate",
      team: "Business",
      location: "Hybrid",
      deadline: "2023-12-10",
    },
  ];

  return (
    <section className={styles.opportunity} id="opportunity">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Your Future at QUANTA Starts Here</h2>
          <p>
            At QUANTA, we are building next-generation AI solutions, LOR-powered platforms, 
            and transformative technologies that impact communities worldwide. We believe in 
            empowering talent — from experienced professionals to students eager to learn — 
            to innovate, grow, and make a difference.
          </p>
        </div>

        <div className={styles.content}>
          <motion.div 
            className={styles.careers}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Careers at QUANTA</h3>
            <p>Join our mission to build the future of AI and software innovation.</p>
            
            <div className={styles.jobListings}>
              {jobOpenings.map((job) => (
                <div key={job.id} className={styles.jobCard}>
                  <h4>{job.title}</h4>
                  <div className={styles.jobDetails}>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {job.team}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}</span>
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> Apply by {job.deadline}</span>
                  </div>
                  <button className={styles.applyButton}>Apply Now</button>
                </div>
              ))}
            </div>
            
            <button className={styles.viewAllButton}>View Open Roles</button>
          </motion.div>

          <motion.div 
            className={styles.internships}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Internships & Early Talent</h3>
            <p>Kickstart your career through hands-on experience in AI, software, and innovation.</p>
            
            <div className={styles.internshipDetails}>
              <h4>Internship Details</h4>
              <div className={styles.detailItem}>
                <strong>Streams:</strong>
                <span>Engineering (AI, LOR Development, Software)</span>
              </div>
              <div className={styles.detailItem}>
                <strong>Duration:</strong>
                <span>3–6 months</span>
              </div>
              <div className={styles.detailItem}>
                <strong>Who can apply:</strong>
                <span>Students, recent graduates, and early professionals passionate about AI and technology</span>
              </div>
            </div>
            
            <button className={styles.internshipButton}>Apply for Internships</button>
            
            <div className={styles.whyQuanta}>
              <h4>Why QUANTA?</h4>
              <ul>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Build cutting-edge AI systems & LOR-powered solutions</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Be part of a bold startup solving real problems at scale</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Collaborate with a diverse, visionary team</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Learn, experiment, and grow in a culture of innovation</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.hiringProcess}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Hiring Process</h3>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <span>1</span>
              <p>Submit Application</p>
            </div>
            <div className={styles.step}>
              <span>2</span>
              <p>Review by QUANTA Team</p>
            </div>
            <div className={styles.step}>
              <span>3</span>
              <p>Interview & Assessment</p>
            </div>
            <div className={styles.step}>
              <span>4</span>
              <p>Offer & Onboarding</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.internshipInfo}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h4>Internship Cycles</h4>
          <p>Applications are open year-round. Selected interns may transition into full-time roles based on performance and business needs.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Opportunity;