import React, { useState } from "react";
import { postAdd } from "../../api/OrderApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initState = {

    orderType : '',
    orderedProducts : '',
    totalAmount : '',
    totalPrice : '',



}

const ModifyComponent = ({id}) => {

    const navigate = useNavigate();

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

    const handleClickUpdate = async () => {
        // 제품 ID와 수량을 배열로 변환
        const productIds = order.orderedProducts.split(',').map(id => Number(id.trim()));
        const amounts = order.totalAmount.split(',').map(amount => Number(amount.trim()));

        const payload = {
            id: productIds,      // 제품 ID 배열
            amount: amounts      // 수량 배열
        };

        try {
            // PUT 요청을 통해 서버로 수정된 주문 데이터 전송
            const response = await axios.put(`http://localhost:8080/api/orders/${id}`, payload);
            alert('주문서가 성공적으로 수정되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
            console.log('Order successfully updated:', response.data);
        } catch (error) {
            console.error('There was an error updating the order!', error);
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
                label="Amount"
                variant="outlined"
                name="totalAmount"
                value={order.totalAmount}
                onChange={handleChangeOrder}
                placeholder="Enter amounts (e.g., 1, 5)"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleClickUpdate}>
                수정
            </Button>
        </Box>
    );
};

export default ModifyComponent;