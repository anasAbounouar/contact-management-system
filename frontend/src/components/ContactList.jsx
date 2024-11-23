import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactItem from './ContactItem';
import ContactForm from './ContactForm';
import { Container, Typography, Box } from '@mui/material';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container sx={{ padding: 3 }}>
      <ContactForm
        fetchContacts={fetchContacts}
        currentContact={currentContact}
        setCurrentContact={setCurrentContact}
      />
      <Typography variant="h4" gutterBottom>
        Contact List
      </Typography>
      {contacts.length === 0 ? (
        <Typography>No contacts available.</Typography>
      ) : (
        contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            fetchContacts={fetchContacts}
            setCurrentContact={setCurrentContact}
          />
        ))
      )}
    </Container>
  );
};

export default ContactList;
