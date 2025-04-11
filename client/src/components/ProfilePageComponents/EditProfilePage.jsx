import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    college: '',
    githubId: '',
    twitterId: '',
    linkedinId: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/getstudentdetail", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

        const user = res.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          location: user.location || "",
          college: user.college || "",
          githubId: user.githubId || "",
          twitterId: user.twitterId || "",
          linkedinId: user.linkedinId || "",
        });
        setPreviewPhoto(user.profilephoto?.url || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (profilePhoto) {
        data.append('profilePhoto', profilePhoto);
      }

      const res = await axios.put('http://localhost:5000/api/courses/update-profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      alert('Profile updated successfully!');
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert('Error updating profile');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Your Profile</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.photoContainer}>
          <img
            src={previewPhoto || 'https://via.placeholder.com/150'}
            alt="Profile Preview"
            style={styles.profileImage}
          />
          <label htmlFor="profilePhoto" style={styles.fileUploadLabel}>
            Choose Photo
          </label>
          <input
            id="profilePhoto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
        </div>

        {['name', 'email', 'location', 'college', 'githubId', 'twitterId', 'linkedinId'].map((field) => (
          <div style={styles.inputGroup} key={field}>
            <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        ))}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #1976d2',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '10px',
  },
  fileUploadLabel: {
    padding: '8px 16px',
    backgroundColor: '#1976d2',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  fileInput: {
    display: 'none',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    transition: '0.3s border',
    outline: 'none',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

// Add hover state (optional)
styles.button[':hover']
