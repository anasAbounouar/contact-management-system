import React from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';

const ContactItem = ({ contact, fetchContacts, setCurrentContact }) => {
  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`/api/contacts/${contact.id}`);
        fetchContacts();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const onEdit = () => {
    setCurrentContact(contact);
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{contact.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Email:</strong> {contact.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Phone:</strong> {contact.phone}
        </Typography>
        {contact.address && (
          <Typography variant="body2" color="textSecondary">
            <strong>Address:</strong> {contact.address}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
          <Button onClick={onEdit} variant="contained" color="success" size="small">
            Edit
          </Button>
          <Button onClick={onDelete} variant="contained" color="error" size="small">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactItem;
