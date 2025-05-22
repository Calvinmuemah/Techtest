import { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Load theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('adminTheme') || 'light';
  });

  // Apply theme class to body and store in localStorage whenever theme changes
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    // Connect this to your backend.
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password updated!');
    // Connect to your backend.
  };

  return (
    <div className={`container py-4 ${theme === 'dark' ? 'text-white bg-dark' : ''}`}>
      <h3 className="mb-4">Settings</h3>

      {/* Profile Settings */}
      <Card className={theme === 'dark' ? 'bg-secondary text-white mb-4' : 'mb-4'}>
        <Card.Header>Profile Information</Card.Header>
        <Card.Body>
          <Form onSubmit={handleProfileSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
                className={theme === 'dark' ? 'bg-dark text-white border-light' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
                className={theme === 'dark' ? 'bg-dark text-white border-light' : ''}
              />
            </Form.Group>

            <Button type="submit" variant={theme === 'dark' ? 'light' : 'primary'}>
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Password Change */}
      <Card className={theme === 'dark' ? 'bg-secondary text-white mb-4' : 'mb-4'}>
        <Card.Header>Change Password</Card.Header>
        <Card.Body>
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                required
                className={theme === 'dark' ? 'bg-dark text-white border-light' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                required
                className={theme === 'dark' ? 'bg-dark text-white border-light' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                required
                className={theme === 'dark' ? 'bg-dark text-white border-light' : ''}
              />
            </Form.Group>

            <Button type="submit" variant="warning">
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Preferences */}
      <Card className={theme === 'dark' ? 'bg-secondary text-white' : ''}>
        <Card.Header>Preferences</Card.Header>
        <Card.Body>
          <Form.Group className="form-switch">
            <Form.Check
              type="switch"
              id="theme-switch"
              label={`Enable ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              checked={theme === 'dark'}
              onChange={handleThemeToggle}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Add some basic styles for dark mode */}
      <style>{`
        body.dark-theme {
          background-color: #121212;
          color: #f0f0f0;
        }
        body.light-theme {
          background-color: #fff;
          color: #212529;
        }
        .bg-dark {
          background-color: #212529 !important;
        }
        .bg-secondary {
          background-color: #343a40 !important;
        }
        .form-control.bg-dark {
          background-color: #343a40 !important;
          color: #f0f0f0 !important;
          border-color: #495057 !important;
        }
        .btn-light {
          color: #212529;
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;
