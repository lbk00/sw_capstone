import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "./ReadComponent";
import { Typography, Paper, Box, Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import ModifyPage from "./ModifyPage";

const initState = {
    id: 0,
    name: '',
    itemType: '',
    price: '',
    size: '',
    amount: '',
}

const ReadPage = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState(initState);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [modifyOpen, setModifyOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirmOpen = () => setConfirmOpen(true);
    const handleConfirmClose = () => setConfirmOpen(false);
    const handleModifyOpen = () => setModifyOpen(true);
    const handleModifyClose = () => setModifyOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleDelete = () => {
        productDelete(id);
        handleClose();
    };

    const productDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            alert('삭제가 완료되었습니다.');
        } catch (error) {
            console.error('삭제 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching the product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
            <Typography variant="h4" component="div" gutterBottom>
                Product Details
            </Typography>
            <Paper elevation={3} sx={{ p: 2, width: '500px', mt: 2 }}>
                <ReadComponent id={id} />
            </Paper>
            <Box mt={2}>
                <Button
                    sx={{ bgcolor: 'gray', color: 'white', '&:hover': { bgcolor: 'gray' }, mb: 4, mt: 2, ml: 3, mr: 3 }}
                    variant="contained"
                    color="primary"
                    onClick={handleModifyOpen}
                >
                    수정
                </Button>
                <Modal
                    open={modifyOpen}
                    onClose={handleModifyClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <h2 id="modal-modal-title">제품 수정</h2>
                        <p id="modal-modal-description">
                            <ModifyPage id={id} />
                        </p>
                    </Box>
                </Modal>
                <Button
                    sx={{ bgcolor: 'gray', color: 'white', '&:hover': { bgcolor: 'gray' }, mb: 4, mt: 2, ml: 3, mr: 3 }}
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                >
                    삭제
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>제품 삭제</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            정말 삭제하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete} color="primary" autoFocus>
                            예
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            아니오
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default ReadPage;