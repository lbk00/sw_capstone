import React, { useState } from "react";
import { postAdd } from "../../api/OrderApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';


const initState = {

    orderType : '',
    orderedProducts : '',
    totalAmount : '',
    totalPrice : '',



}

const AddComponent = () => {


    const [order, setOrder] = useState({
        orderedProducts: '',  // 제품 ID들을 입력받을 필드
        totalAmount: ''       // 수량을 입력받을 필드
    });

    const handleChangeOrder = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleClickAdd = async () => {
        // 여러 제품을 처리하기 위해 orderedProducts와 totalAmount를 분리
        const products = order.orderedProducts.split(',').map((id, index) => ({
            id: Number(id.trim()),         // 제품 ID를 숫자로 변환
            amount: Number(order.totalAmount.split(',')[index].trim())  // 수량을 숫자로 변환
        }));

        try {
            // POST 요청을 통해 서버로 주문 데이터 전송
            const response = await axios.post('http://localhost:8080/api/orders/create', products);
            alert('주문서 생성이 완료되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
            console.log('Order successfully created:', response.data);
        } catch (error) {
            console.error('There was an error creating the order!', error);
        }
    };
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()


    const closeModal = () => {
        setResult(null)
        moveToList()
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFn={closeModal}/>: <></>}
            <TextField
                label="Product"
                variant="outlined"
                name="orderedProducts"
                value={order.orderedProducts}
                onChange={handleChangeOrder}
                placeholder="Enter product IDs (e.g., 33, 34)"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Amount"
                variant="outlined"
                name="totalAmount"
                value={order.totalAmount}
                onChange={handleChangeOrder}
                placeholder="Enter amounts (e.g., 15, 20)"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleClickAdd}>
                등록
            </Button>
        </Box>
    );
};

export default AddComponent;