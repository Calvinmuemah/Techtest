import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../Contexts/ThemeContext'; 
const AdminSettings = () => {
  const { theme, toggleTheme } = useTheme(); // use global theme
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password updated!');
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
              onChange={toggleTheme}
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminSettings;
