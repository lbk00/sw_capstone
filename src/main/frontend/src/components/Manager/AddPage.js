import React from 'react';
import AddComponent from './AddComponent';
import { Container, Typography } from '@mui/material';

const AddPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        공급업체 등록 페이지
      </Typography>
      <AddComponent />
    </Container>
  );
}
export default AddPage;