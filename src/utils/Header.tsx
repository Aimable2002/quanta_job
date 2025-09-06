import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from '../css/Header.module.css'
import logo from '../assets/quanta.png'

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (): void => {
    setIsActive(!isActive);
  };

  const handleNavClick = (path: string): void => {
    setIsActive(false);
    
    // If we're not on the home page and it's a hash link, navigate home first
    if (path.startsWith('#') && location.pathname !== '/') {
      // Navigate to home page first, then scroll to section
      window.location.href = `/${path}`;
    } else if (path.startsWith('#')) {
      // We're already on home page, just scroll to section
      const sectionId = path.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Our Services', path: '#services' },
    { name: 'Products', path: '#products' },
    { name: 'Opportunity', path: '/oppo'},
    { name: 'Support us', path: '#affiliate' },
    { name: 'Contact Us', path: '#contact' },
    { name: 'Leadership', path: '/leader' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="QUANTA Logo" className={styles.logo} />
            <span className={styles.quantaText}>QUANTA</span>
          </div>

          {/* Hamburger button - placed outside the nav */}
          <div className={styles.hamburger} onClick={toggleMenu}>
            {isActive ? <FaTimes /> : <FaBars />}
          </div>

          <nav className={`${styles.nav} ${isActive ? styles.active : ''}`}>
            <ul className={styles.navList}>

              {navItems.map((item, index) => (
                <li key={index} className={styles.navItem}>
                  {item.path.startsWith('#') ? (
                    <a 
                      href={item.path} 
                      className={styles.navLink}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.path)
                      }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={styles.navLink}
                      onClick={() => setIsActive(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;