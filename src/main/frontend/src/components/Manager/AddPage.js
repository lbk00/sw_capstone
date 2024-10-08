import React from 'react';
import AddComponent from './AddComponent';
import { Container, Typography } from '@mui/material';

const AddPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Manager Add Page
      </Typography>
      <AddComponent />
    </Container>
  );
}
export default AddPage;