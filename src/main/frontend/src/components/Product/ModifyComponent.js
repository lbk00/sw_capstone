import React, { useCallback, useState, useEffect } from "react";
import { putOne, deleteOne, getOne } from "../../api/ProductApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initState = {
    id: '',
    name: '',
    itemType: '',
    price: '',
    size: '',
    amount: '',
}

const ModifyComponent = ({ id, onClose }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({...initState});
    const [result, setResult] = useState(null);
    const { moveToList, productiveToRead } = useCustomMove();
    const [openDialog, setOpenDialog] = useState(true);

    useEffect(() => {
        getOne(id).then(data => setProduct(data));
    }, [id]);

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({...product});
    };

    const handleChangeProductComplete = (e) => {
        const value = e.target.value;
        product.complete = (value === 'Y');
        setProduct({...product});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClickModify = () => {
        putOne(product).then(data => {
            console.log("modify result: " + data);
            setResult('수정이 완료되었습니다');
        });
    };

    const handleClickDelete = async () => {
        try {
            await deleteOne(id);
            alert('제품이 성공적으로 삭제되었습니다.');
            setResult('Deleted');
            setOpenDialog(false);
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    const closeModal = () => {
        if (result === 'Deleted') {
            moveToList();
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        onClose();
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}

            <TextField
                label="id"
                variant="outlined"
                value={product.id}
                disabled
            />
            <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={product.name}
                onChange={handleChangeProduct}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Item Type"
                name="itemType"
                variant="outlined"
                value={product.itemType}
                onChange={handleChangeProduct}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name="price"
                variant="outlined"
                value={product.price}
                onChange={handleChangeProduct}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Size"
                name="size"
                variant="outlined"
                value={product.size}
                onChange={handleChangeProduct}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                value={product.amount}
                onChange={handleChangeProduct}
                fullWidth
                margin="normal"
            />
            <TextField
                label="COMPLETE"
                variant="outlined"
                name="complete"
                value={product.complete ? 'Y' : 'N'}
                onChange={handleChangeProductComplete}
                select
                SelectProps={{
                    native: true,
                }}
            >
                <option value='Y'>Completed</option>
                <option value='N'>Not Yet</option>
            </TextField>

            <Button variant="contained" onClick={handleClickModify}>
                수정
            </Button>

            <Button onClick={handleCloseDialog} color="primary">
                닫기
            </Button>
        </Box>
    );
};

export default ModifyComponent;