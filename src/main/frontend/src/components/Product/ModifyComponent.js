import React, { useState, useEffect } from "react";
import { putOne, deleteOne, getOne } from "../../api/ProductApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";

const initState = {
    id: '',
    name: '',
    itemType: '',
    price: '',
    size: '',
    amount: '',
}

const ModifyComponent = ({ id }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ ...initState });
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();

    // 제품 데이터 가져오기
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getOne(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProduct();
    }, [id]);

    // 입력 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 수정 버튼 클릭 시
    const handleClickUpdate = async () => {
        const payload = {
            id: product.id,
            name: product.name,
            itemType: product.itemType,
            price: product.price,
            size: product.size,
            amount: product.amount
        };

        try {
            const response = await putOne(payload);
            alert('제품이 성공적으로 수정되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
            console.log('Product successfully updated:', response);
        } catch (error) {
            console.error('There was an error updating the product!', error);
        }
    };

    // 삭제 버튼 클릭 시
    const handleClickDelete = async () => {
        try {
            await deleteOne(id);
            alert('제품이 성공적으로 삭제되었습니다.');
            setResult('Deleted');
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        if (result === 'Deleted') {
            moveToList();
        } else {
            navigate(`/product/read/${id}`);
        }
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? (
                <ResultModal title={'Operation Result'} content={`Product ${result}`} callbackFn={closeModal} />
            ) : null}
            <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={product.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Item Type"
                name="itemType"
                variant="outlined"
                value={product.itemType}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name="price"
                variant="outlined"
                value={product.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Size"
                name="size"
                variant="outlined"
                value={product.size}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                value={product.amount}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleClickUpdate}>
                수정
            </Button>
            <Button variant="contained" color="error" onClick={handleClickDelete}>
                삭제
            </Button>
        </Box>
    );
};

export default ModifyComponent;