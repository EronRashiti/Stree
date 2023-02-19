import React, { useState } from 'react';
import Logo from '../assets/stree-logo.png';
import PasswordStrengthBar from 'react-password-strength-bar';

const Register = () => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.fullname) {
      errors.fullname = 'Full Name is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.mobilenumber) {
      errors.mobilenumber = 'Mobile number is required';
    } else if (data.mobilenumber.length < 9) {
      errors.mobilenumber = 'Mobile number must be at least 9 characters long';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 9) {
      errors.password = 'Password must be at least 9 characters long';
    }

    if (!data.confirmpassword) {
      errors.confirmpassword = 'Confirm Password please';
    } else if (data.confirmpassword !== data.password) {
      errors.confirmpassword = 'Check your password again';
    }

    return errors;
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <img className='stree-logo' src={Logo} alt='Stree' />
        <form className='form' onSubmit={handleFormSubmit}>
          <input
            type='text'
            id='fullname'
            name='fullname'
            value={formData.fullname || ''}
            onChange={handleInputChange}
            placeholder='Full Name'
          />
          {formErrors.fullname && (
            <span className='errormsg'>{formErrors.fullname}</span>
          )}
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email || ''}
            onChange={handleInputChange}
            placeholder='Email'
          />
          {formErrors.email && (
            <span className='errormsg'>{formErrors.email}</span>
          )}
          <input
            type='number'
            id='mobilenumber'
            name='mobilenumber'
            value={formData.mobilenumber || ''}
            onChange={handleInputChange}
            placeholder='Mobile Number'
          />
          {formErrors.mobilenumber && (
            <span className='errormsg'>{formErrors.mobilenumber}</span>
          )}
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password || ''}
            onChange={handleInputChange}
            placeholder='Password'
          />
          <PasswordStrengthBar
            password={formData.password}
            className='pass-strength'
          />
          {formErrors.password && (
            <span className='errormsg'>{formErrors.password}</span>
          )}
          <input
            type='password'
            id='confirmpassword'
            name='confirmpassword'
            value={formData.confirmpassword || ''}
            onChange={handleInputChange}
            placeholder='Confirm Password'
          />
          {formErrors.confirmpassword && (
            <span className='errormsg'>{formErrors.confirmpassword}</span>
          )}
          <button type='submit'>Login</button>
        </form>
        <p className='register-text'>
          By registering you agree to <span>Terms & Conditions</span> and
          <br />
          <span>Privacy Policy</span> of Stree
        </p>
      </div>
    </div>
  );
};

export default Register;
