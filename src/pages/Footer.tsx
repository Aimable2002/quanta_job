import { FaLinkedin, FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import styles from '../css/Footer.module.css'
import logo from '../assets/quanta.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (

<footer className={`${styles.footer}`}>
      <div className='px-[2%]'> 
        <div className={styles.footerGrid}>
          {/* About Column */}
          <div className={`${styles.footerCol} ${styles.footerAbout}`}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="QUANTA Logo" className={`${styles.logo} w-[80px] h-[80px]`} />
            </div>
            <p className={styles.footerAboutText}>
              Leading humanity into the next era of intelligence with AI-powered
              innovations that transform life on Earth and beyond.
            </p>
            <div className={styles.footerSocial}>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Telegram"><FaTelegram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">Internship Program</a></li>
              <li><a href="#affiliate">Affiliate Program</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Services</h3>
            <ul className={styles.footerLinks}>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">Web Development</a></li>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">App Development</a></li>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">AI Solutions</a></li>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">Online Courses</a></li>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">AGI Research</a></li>
              <li><a href="https://forms.gle/1RqC3A2Ds4F9gqjT6" target="_blank" rel="noopener noreferrer">View All Services</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Resources</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/white-papers">White Papers</a></li>
              <li><a href="#contact">FAQ</a></li>
              <li><a href="#contact">Support Center</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Legal</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/privacy" target="_blank">Privacy Policy</a></li>
              <li><a href="/terms" target="_blank">Terms of Service</a></li>
              <li><a href="/cookie-policy" target="_blank">Cookie Policy</a></li>
              <li><a href="/gdpr" target="_blank">GDPR Compliance</a></li>
              <li><a href="/security" target="_blank">Security</a></li>
              <li><a href="/legal-notice" target="_blank">Legal Notice</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} QUANTA Technologies. All rights reserved.
          </p>
          <p className={styles.footerQuote}>
            "QUANTA TO THE UNIVERSE." — KANAMUGIRE Enock, Founder & CEO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;