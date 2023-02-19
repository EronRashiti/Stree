import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('formData');
    navigate('/');
    console.log('Logged out successfully!');
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>You are now home</h1>
        <h5>All u can do here is logout</h5>
        <button onClick={handleLogout} className='logout-btn'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
