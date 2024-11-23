import React from 'react';
import ContactList from '../components/ContactList';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container sx={{ paddingTop: 5 }}>
      <Typography variant="h3" gutterBottom>
        Contact Management System
      </Typography>
      <ContactList />
    </Container>
  );
};

export default Home;
