// Admin.jsx
import { useState } from 'react';
import styles from '../css/Admin.module.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e:any) => {
    e.preventDefault();
    // Simple validation - in a real app, this would connect to an authentication API
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <h1><i className="fas fa-shield-alt"></i> Admin Login</h1>
            <p>Access the admin dashboard</p>
          </div>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordContainer}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <i 
                  className={`fas fa-eye ${styles.passwordToggle}`} 
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <button type="submit" className={styles.loginBtn}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1><i className="fas fa-tachometer-alt"></i> Admin Dashboard</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Total Contacts</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Today's Contacts</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>This Week</p>
        </div>
      </div>

      <div className={styles.contactsTable}>
        <div className={styles.tableHeader}>
          <h2><i className="fas fa-envelope"></i> Contact Submissions</h2>
          <div className={styles.headerControls}>
            <input 
              type="text" 
              className={styles.searchBox} 
              placeholder="Search contacts..." 
            />
            <button className={styles.deleteSelectedBtn} disabled>
              <i className="fas fa-trash-alt"></i> Delete Selected (0)
            </button>
            <button className={styles.exportBtn}>
              <i className="fas fa-download"></i> Export CSV
            </button>
            <button className={styles.clearBtn}>
              <i className="fas fa-trash-alt"></i> Clear All
            </button>
          </div>
        </div>
        <div className={styles.contactsList}>
          <div className={styles.loading}>Loading contacts...</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;