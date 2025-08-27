import { useState } from 'react';
import styles from '../css/Admin.module.css'
import logo from '../assets/quanta.png'

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'root') {
      setIsLoggedIn(true);
      setError('');
      setContacts([
        { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Test message', date: '2025-08-27' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Another test message', date: '2025-08-27' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', message: 'Product inquiry', date: '2025-08-26' },
      ]);
    } else {
      setError('Invalid username or password');
      setErrorText('Invalid username or password. Please check your credentials and try again.');
      setShowErrorModal(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setContacts([]);
    setSelectedContacts([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectContact = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setContacts((prev) => prev.filter((contact) => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
    setShowDeleteSelectedModal(false);
  };

  const handleClearAll = () => {
    setContacts([]);
    setSelectedContacts([]);
    setShowClearModal(false);
  };

  const handleExportContacts = () => {
    const csv = contacts.map((contact) => `${contact.id},${contact.name},${contact.email},${contact.message},${contact.date}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return (
      <div className={styles['admin-container']}>
        <div className={styles['login-box']}>
          <div className={styles['login-header']}>
            <h1>
              <i className="fas fa-shield-alt"></i> Admin Login
            </h1>
            <p>Access the admin dashboard</p>
          </div>
          <form className={styles['login-form']} onSubmit={handleLogin}>
            <div className={styles['form-group']}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="password">Password</label>
              <div className={styles['password-container']}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fas fa-eye ${styles['password-toggle']}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <button type="submit" className={styles['login-btn']}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
            {error && <div className={styles['error-message']}>{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalContacts = contacts.length;
  const today = new Date().toISOString().split('T')[0];
  const todayContacts = contacts.filter((contact) => contact.date === today).length;
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekContacts = contacts.filter((contact) => new Date(contact.date) >= weekStart).length;

  return (
    <>
      <div className={styles['dashboard-container']} id="dashboardContainer">
        <div className={styles['dashboard-header']}>
          <div className={styles['logo-container']}>
            <img
              src={logo}
              alt="Quanta Logo"
              className={styles.logo}
            />
            <h1>
              <i className="fas fa-tachometer-alt"></i> Admin Dashboard
            </h1>
          </div>
          <button className={styles['logout-btn']} id="logoutBtn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>

        <div className={styles['stats-container']}>
          <div className={styles['stat-card']}>
            <h3 id="totalContacts">{totalContacts}</h3>
            <p>Total Contacts</p>
          </div>
          <div className={styles['stat-card']}>
            <h3 id="todayContacts">{todayContacts}</h3>
            <p>Today's Contacts</p>
          </div>
          <div className={styles['stat-card']}>
            <h3 id="weekContacts">{weekContacts}</h3>
            <p>This Week</p>
          </div>
        </div>

        <div className={styles['contacts-table']}>
          <div className={styles['table-header']}>
            <h2>
              <i className="fas fa-envelope"></i> Contact Submissions
            </h2>
            <div className={styles['header-controls']}>
              <input
                type="text"
                className={styles['search-box']}
                id="searchBox"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button
                className={styles['delete-selected-btn']}
                id="deleteSelectedBtn"
                onClick={() => setShowDeleteSelectedModal(true)}
                disabled={selectedContacts.length === 0}
              >
                <i className="fas fa-trash-alt"></i> Delete Selected (
                <span id="selectedCount">{selectedContacts.length}</span>)
              </button>
              <button className={styles['export-btn']} onClick={handleExportContacts}>
                <i className="fas fa-download"></i> Export CSV
              </button>
              <button className={styles['clear-btn']} onClick={() => setShowClearModal(true)}>
                <i className="fas fa-trash-alt"></i> Clear All
              </button>
            </div>
          </div>
          <div className={styles['contacts-list']} id="contactsList">
            {contacts.length === 0 ? (
              <div className={styles.loading}>No contacts available</div>
            ) : (
              <table className={styles['contacts-data-table']}>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className={styles['contact-item']}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleSelectContact(contact.id)}
                        />
                      </td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                      <td>{contact.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className={styles['error-overlay']} id="errorOverlay">
          <div className={styles['error-modal']}>
            <div className={styles['error-icon']}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className={styles['error-title']}>Access Denied</h3>
            <p className={styles['error-text']} id="errorText">
              {errorText}
            </p>
            <button
              className={styles['error-close-btn']}
              onClick={() => setShowErrorModal(false)}
            >
              <i className="fas fa-times"></i> Close
            </button>
          </div>
        </div>
      )}

      {showClearModal && (
        <div className={styles['clear-overlay']} id="clearOverlay">
          <div className={styles['clear-modal']}>
            <div className={styles['clear-icon']}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className={styles['clear-title']}>Confirm Deletion</h3>
            <p className={styles['clear-text']}>
              Are you sure you want to delete ALL contacts from the database? This action cannot be
              undone!
            </p>
            <div className={styles['clear-actions']}>
              <button
                className={styles['clear-cancel-btn']}
                onClick={() => setShowClearModal(false)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className={styles['clear-confirm-btn']} onClick={handleClearAll}>
                <i className="fas fa-trash-alt"></i> Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSelectedModal && (
        <div className={styles['delete-selected-overlay']} id="deleteSelectedOverlay">
          <div className={styles['delete-selected-modal']}>
            <div className={styles['delete-selected-icon']}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className={styles['delete-selected-title']}>Confirm Deletion</h3>
            <p className={styles['delete-selected-text']}>
              Are you sure you want to delete{' '}
              <span id="deleteSelectedCount">{selectedContacts.length}</span> selected contact(s)?
              This action cannot be undone!
            </p>
            <div className={styles['delete-selected-actions']}>
              <button
                className={styles['delete-selected-cancel-btn']}
                onClick={() => setShowDeleteSelectedModal(false)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                className={styles['delete-selected-confirm-btn']}
                onClick={handleDeleteSelected}
              >
                <i className="fas fa-trash-alt"></i> Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;