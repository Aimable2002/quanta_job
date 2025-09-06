import { useState, useEffect } from 'react';
import styles from '../css/Admin.module.css';
import logo from '../assets/quanta.png';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
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
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = 'https://quanta-job.onrender.com';

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      console.log('Verifying token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch(`${API_BASE}/api/auth/verify`, {
        headers: {
          'x-auth-token': token || '',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Token verification response:', response.status);
      
      if (response.ok) {
        console.log('Token verified successfully');
        setIsLoggedIn(true);
        await fetchContacts();
      } else {
        console.log('Token verification failed, clearing token');
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      localStorage.removeItem('token');
      setToken(null);
      setIsLoggedIn(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching contacts with token:', token ? 'Token exists' : 'No token');
      
      if (!token) {
        console.log('No token available, cannot fetch contacts');
        setError('Authentication required');
        return;
      }
      
      const response = await fetch(`${API_BASE}/api/contact`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Contacts fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Contacts fetched successfully:', data);
        setContacts(data);
        setError(''); // Clear any previous errors
      } else if (response.status === 401) {
        console.log('Unauthorized, clearing token');
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        setError('Session expired. Please login again.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch contacts:', response.status, errorData);
        setError(`Failed to fetch contacts: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Network error while fetching contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const endpoint = '/api/auth/login';
      
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
             if (response.ok) {
         console.log('Login/Register successful, setting token');
         setIsLoggedIn(true);
         setError('');
         setToken(data.token);
         localStorage.setItem('token', data.token);
         await fetchContacts(); // Wait for contacts to load
       } else {
         const errorMessage = data.message || ('Invalid username or password');
         setError(errorMessage);
         setErrorText(errorMessage);
         setShowErrorModal(true);
       }
    } catch (err) {
      setError('Login failed');
      setErrorText('Login failed. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setContacts([]);
    setSelectedContacts([]);
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };

    const handleDeleteSelected = async () => {
    try {
      setIsLoading(true);
      console.log('Deleting selected contacts:', selectedContacts);
      
      // Delete each selected contact
      const deletePromises = selectedContacts.map(async (id) => {
        const response = await fetch(`${API_BASE}/api/contact/${id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token || '',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`Failed to delete contact ${id}: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }
        
        const result = await response.json();
        console.log(`Contact ${id} deleted successfully:`, result);
        return result;
      });
      
      await Promise.all(deletePromises);
      console.log('All selected contacts deleted successfully');
      
      // Refresh contacts
      await fetchContacts();
      setSelectedContacts([]);
      setShowDeleteSelectedModal(false);
      
      // Show success message
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error deleting contacts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to delete some contacts: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    try {
      setIsLoading(true);
      console.log('Clearing all contacts');
      
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token || '',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to clear contacts: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      console.log('Clear all result:', result);
      
      // Refresh contacts
      await fetchContacts();
      setSelectedContacts([]);
      setShowClearModal(false);
      
      // Show success message
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error clearing contacts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to clear all contacts: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportContacts = () => {
    try {
      if (contacts.length === 0) {
        setError('No contacts to export');
        return;
      }
      
      // Create CSV header
      const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Date'];
      
      // Create CSV content with proper escaping
      const csvContent = [
        headers.join(','),
        ...contacts.map((contact) => [
          contact._id,
          `"${contact.name.replace(/"/g, '""')}"`,
          `"${contact.email.replace(/"/g, '""')}"`,
          `"${(contact.subject || '').replace(/"/g, '""')}"`,
          `"${contact.message.replace(/"/g, '""')}"`,
          new Date(contact.date).toLocaleString()
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Contacts exported successfully');
    } catch (err) {
      console.error('Error exporting contacts:', err);
      setError('Failed to export contacts');
    }
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className={styles['admin-container']}>
        <div className={styles['login-box']}>
          <div className={styles['login-header']}>
            <h1>
              <i className="fas fa-shield-alt"></i> {'Admin Login'}
            </h1>
            <p>{'Access the admin dashboard'}</p>
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
            <button type="submit" className={styles['login-btn']} disabled={isLoading}>
              <i className="fas fa-sign-in-alt"></i> {isLoading ? ('Logging in...') : ('Login')}
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
  const todayContacts = contacts.filter((contact) => {
    try {
      return contact.date.split('T')[0] === today;
    } catch (err) {
      console.error('Error parsing date for contact:', contact._id, contact.date);
      return false;
    }
  }).length;
  
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekContacts = contacts.filter((contact) => {
    try {
      return new Date(contact.date) >= weekStart;
    } catch (err) {
      console.error('Error parsing date for contact:', contact._id, contact.date);
      return false;
    }
  }).length;

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

        {error && (
          <div className={styles['error-banner']}>
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
            <button onClick={() => setError('')} className={styles['error-close']}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        
        {!isLoggedIn && (
          <div className={styles['info-banner']}>
            <i className="fas fa-info-circle"></i>
            <span>Please login to access the admin dashboard</span>
          </div>
        )}
        
        <div className={styles['stats-container']}>
          <div className={styles['stat-card']}>
            <h3 id="totalContacts">{totalContacts}</h3>
            <p>Total Contacts</p>
            {totalContacts === 0 && <small className={styles['stat-hint']}>No submissions yet</small>}
          </div>
          <div className={styles['stat-card']}>
            <h3 id="todayContacts">{todayContacts}</h3>
            <p>Today's Contacts</p>
            {todayContacts === 0 && <small className={styles['stat-hint']}>No submissions today</small>}
          </div>
          <div className={styles['stat-card']}>
            <h3 id="weekContacts">{weekContacts}</h3>
            <p>This Week</p>
            {weekContacts === 0 && <small className={styles['stat-hint']}>No submissions this week</small>}
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
                disabled={selectedContacts.length === 0 || isLoading}
              >
                <i className="fas fa-trash-alt"></i> Delete Selected (
                <span id="selectedCount">{selectedContacts.length}</span>)
              </button>
              <button className={styles['export-btn']} onClick={handleExportContacts} disabled={isLoading}>
                <i className="fas fa-download"></i> Export CSV
              </button>
              <button className={styles['clear-btn']} onClick={() => setShowClearModal(true)} disabled={isLoading}>
                <i className="fas fa-trash-alt"></i> Clear All
              </button>
            </div>
          </div>
          <div className={styles['contacts-list']} id="contactsList">
            {isLoading ? (
              <div className={styles.loading}>
                <i className="fas fa-spinner fa-spin"></i>
                Loading contacts...
              </div>
                         ) : filteredContacts.length === 0 ? (
               <div className={styles['no-contacts']}>
                 <i className="fas fa-inbox"></i>
                 <p>No contacts available</p>
                 {contacts.length === 0 ? (
                   <small>No contact submissions yet. Try submitting a contact form to see data here.</small>
                 ) : (
                   <small>No contacts match your search criteria.</small>
                 )}
               </div>
            ) : (
              <div className={styles['table-container']}>
                <table className={styles['contacts-data-table']}>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact._id} className={styles['contact-item']}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact._id)}
                            onChange={() => handleSelectContact(contact._id)}
                          />
                        </td>
                        <td className={styles['contact-name']}>{contact.name}</td>
                        <td className={styles['contact-email']}>{contact.email}</td>
                        <td className={styles['contact-subject']}>{contact.subject || '-'}</td>
                        <td className={styles['contact-message']}>
                          <div className={styles['message-preview']}>
                            {contact.message.length > 50 
                              ? `${contact.message.substring(0, 50)}...` 
                              : contact.message
                            }
                          </div>
                        </td>
                        <td className={styles['contact-date']}>
                          {new Date(contact.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                disabled={isLoading}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className={styles['clear-confirm-btn']} onClick={handleClearAll} disabled={isLoading}>
                <i className="fas fa-trash-alt"></i> {isLoading ? 'Deleting...' : 'Delete All'}
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
                disabled={isLoading}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                className={styles['delete-selected-confirm-btn']}
                onClick={handleDeleteSelected}
                disabled={isLoading}
              >
                <i className="fas fa-trash-alt"></i> {isLoading ? 'Deleting...' : 'Delete Selected'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;