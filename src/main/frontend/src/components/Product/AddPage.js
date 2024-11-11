import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, Typography } from '@mui/material';
import AddComponent from './AddComponent';

const AddPage = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Typography variant="h5" component="h1" gutterBottom>
                상품 등록 페이지
            </Typography>
            <AddComponent />
        </Dialog>
    );
};

export default AddPage;
