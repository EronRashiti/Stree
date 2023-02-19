import React, { useState } from 'react';
import Logo from '../assets/stree-logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const { email, password } = JSON.parse(storedData);
        if (formData.email === email && formData.password === password) {
          setFormErrors({});
          console.log('Logged in successfully!');
          navigate('/home');
        } else {
          setFormErrors({ login: 'Invalid email or password' });
        }
      } else {
        setFormErrors({ login: 'No user data found' });
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <img className='stree-logo' src={Logo} alt='Stree' />
        <form className='form' onSubmit={handleFormSubmit}>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
          />
          {formErrors.email && (
            <span className='errormsg'>{formErrors.email}</span>
          )}
          <div className='password-wrapper'>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
            />
            <a href='/'>Forgot Password?</a>
          </div>
          {formErrors.password && (
            <span className='errormsg'>{formErrors.password}</span>
          )}

          <button type='submit'>Login</button>
        </form>
        <p className='register-link'>
          Don't have an account? <a href='/register'>Register Now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
