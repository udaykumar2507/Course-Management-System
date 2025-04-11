import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FaMapMarkerAlt, FaUniversity, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Profile = () => {
  const [userDetail, setUserDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses/getstudentdetail`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserDetail(response.data.user);
      } catch (error) {
        console.log('Error while fetching user details', error);
      }
    };
    fetchUserDetail();
  }, []);

  if (!userDetail) {
    return <p>Loading...</p>;
  }
  console.log(userDetail);
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };
  return (
    <div style={styles.container}>
     
      <div style={styles.profileSection}>
        <img
          src={userDetail.profilephoto?.url || 'https://via.placeholder.com/150'} 
          alt="Profile"
          style={styles.profileImage}
        />

        <h2 style={styles.name}>{userDetail.name || 'Student Name'}</h2>
        <p style={styles.email}>{userDetail.email || 'student@example.com'}</p>

        <button style={styles.editButton} onClick={handleEditProfile}>
          Edit Profile
        </button>
        <div style={styles.info}>
  <p style={styles.infoItem}>
    <FaMapMarkerAlt style={styles.icon} /> {userDetail.location || 'Your Location'}
  </p>
  <p style={styles.infoItem}>
    <FaUniversity style={styles.icon} /> {userDetail.college || 'Your College'}
  </p>
  <p style={styles.infoItem}>
    <FaGithub style={styles.icon} />
    <a href={userDetail.githubId || '#'} target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
  </p>
  <p style={styles.infoItem}>
    <FaTwitter style={styles.icon} />
    <a href={userDetail.twitterId || '#'} target="_blank" rel="noopener noreferrer">
      Twitter
    </a>
  </p>
  <p style={styles.infoItem}>
    <FaLinkedin style={styles.icon} />
    <a href={userDetail.linkedinId || '#'} target="_blank" rel="noopener noreferrer">
      LinkedIn
    </a>
  </p>
</div>

      </div>

      <div style={styles.coursesSection}>

        <h1>Courses Area</h1>

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  profileSection: {
    width: '30%', 
    backgroundColor: '#f8f9fa',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '20%',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  name: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  email: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '30px',
  },
   info: {
    width: '100%',
    textAlign: 'center', // Optional, since flex is being used inside
    fontSize: '1rem',
    color: '#333',
    lineHeight: '2',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px', // space between icon and text
    marginBottom: '8px',
  },
  icon: {
    fontSize: '1.2rem', 
    color: '#555',
  },
  coursesSection: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#fff',
  },
};

export default Profile;
