import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from '../css/Header.module.css'

import logo from '../assets/quanta.png'

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

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

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Our Services', path: '#services' },
    { name: 'Products', path: '#products' },
    { name: 'Internship', path: 'https://forms.gle/1RqC3A2Ds4F9gqjT6', external: true },
    { name: 'Affiliate Program', path: '#internship' },
    { name: 'Contact Us', path: '#contact' },
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

          <nav className={`${styles.nav} ${isActive ? styles.active : ''}`}>
            <ul className={styles.navList}>
              {navItems.map((item, index) => (
                <li key={index} className={styles.navItem}>
                  {item.external ? (
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.path}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.hamburger} onClick={toggleMenu}>
              {isActive ? <FaTimes /> : <FaBars />}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;