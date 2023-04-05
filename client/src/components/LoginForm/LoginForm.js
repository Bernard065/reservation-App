import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Error, FormField, Input, Label } from '../../styles';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      setIsLoading(false);
      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        if (user.admin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        const error = await response.json();
        setErrors([error.errors]);
      }
    } catch (error) {
      setIsLoading(false);
      setErrors(['An error occurred while logging in. Please try again later.']);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </FormField>
      <FormField>
        {errors.map((error) => (
          <Error key={error}>{error}</Error>
        ))}
      </FormField>
    </form>
  );
};

export default LoginForm;
