import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const ContactForm = ({ fetchContacts, currentContact, setCurrentContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (currentContact) {
      setFormData({
        name: currentContact.name,
        email: currentContact.email,
        phone: currentContact.phone,
        address: currentContact.address || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  }, [currentContact]);

  const { name, email, phone, address } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (currentContact) {
        // Update contact
        await axios.put(`/api/contacts/${currentContact.id}`, formData);
        setCurrentContact(null);
      } else {
        // Create contact
        await axios.post('/api/contacts', formData);
      }
      fetchContacts();
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  const onCancel = () => {
    setCurrentContact(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  return (
    <Box sx={{ padding: 3, border: '1px solid #ddd', borderRadius: '8px', width: '400px' }}>
      <Typography variant="h5" gutterBottom>
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={onChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              value={phone}
              onChange={onChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={address}
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {currentContact ? 'Update' : 'Add'}
              </Button>
              {currentContact && (
                <Button onClick={onCancel} variant="outlined" color="secondary" fullWidth>
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactForm;
