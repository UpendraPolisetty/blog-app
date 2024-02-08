import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userVerifyUrl } from './utils/Constant';

const Settings = ({ user }) => {
  const [userData, updateUserData] = useState(user);
  const [settings, setSettings] = useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    errors: {
      img: '',
      username: '',
      bio: '',
      email: '',
    },
  });

  useEffect(() => {
    updateUserData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('TokenKey');
    fetch(userVerifyUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        user: userData,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Can not update settings');
        }
        return res.json();
      })
      .then(({ user }) => {
        updateUserData(user);
        setSettings({
          image: '',
          username: '',
          bio: '',
          email: '',
        });
        navigate('/profile');
      })
      .catch(err => console.error(err));
  };

  const { image, username, bio, email, password } = userData;

  return (
    <div className='settings'>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>Your Settings</h1>
      <form>
        <fieldset className='wrapper'>
          <fieldset className='form-group'>
            <input type="text" name='image' className='form-control' value={image} placeholder='URL or profile picture' onChange={handleChange} />
          </fieldset>
          <fieldset>
            <input type="text" name='username' className='form-control' value={username} placeholder='Your Name' onChange={handleChange} />
          </fieldset>
          <fieldset>
            <textarea cols="30" rows="10" name='bio' className='form-control' value={bio} placeholder='Start bio about you' onChange={handleChange}></textarea>
          </fieldset>
          <fieldset>
            <input type="text" name='email' className='form-control' value={email} placeholder='Email' onChange={handleChange} />
          </fieldset>
          <fieldset>
            <input type="password" name='password' className='form-control' value={password} placeholder='Password' onChange={handleChange} />
          </fieldset>
          <button className='btn' onClick={handleSubmit}>Update Settings</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Settings;
