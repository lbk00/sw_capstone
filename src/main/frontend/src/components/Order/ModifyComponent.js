import React, { useState, useEffect } from "react";
import { postAdd } from "../../api/OrderApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";

const ModifyComponent = ({ id }) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        orderedProducts: []  // 제품 정보 배열로 초기화
    });
    const [suppliers, setSuppliers] = useState([]); // 공급업체 목록 상태
    const [selectedSupplier, setSelectedSupplier] = useState(''); // 선택한 공급업체
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();

    // 주문 데이터 및 공급업체 목록 가져오기
    useEffect(() => {
        const fetchOrderAndSuppliers = async () => {
            try {
                // 주문 데이터 가져오기
                const orderResponse = await axios.get(`http://localhost:8080/api/orders/${id}`);
                const products = orderResponse.data.orderedProducts.map(product => ({
                    id: product.id,
                    name: product.name,
                    amount: product.amount // 초기 수량 값 설정
                }));
                setOrder({ orderedProducts: products });

                // 공급업체 목록 가져오기
                const supplierResponse = await axios.get("http://localhost:8080/api/manager/list");
                setSuppliers(supplierResponse.data.dtoList); // 공급업체 목록 설정

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchOrderAndSuppliers();
    }, [id]);

    // 수량 입력 변경 핸들러
    const handleAmountChange = (index, value) => {
        const updatedProducts = [...order.orderedProducts];
        updatedProducts[index].amount = Number(value);
        setOrder({ orderedProducts: updatedProducts });
    };

    // 공급업체 선택 핸들러
    const handleSupplierChange = (event) => {
        setSelectedSupplier(event.target.value);
    };

    // 수정 버튼 클릭 시
    const handleClickUpdate = async () => {
        const payload = {
            supplier: selectedSupplier, // 선택한 공급업체 ID 추가
            id: order.orderedProducts.map(product => product.id),
            amount: order.orderedProducts.map(product => product.amount)
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/orders/${id}`, payload);
            alert('주문서가 성공적으로 수정되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
            console.log('Order successfully updated:', response.data);
        } catch (error) {
            console.error('There was an error updating the order!', error);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setResult(null);
        moveToList();
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? (
                <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFn={closeModal} />
            ) : null}

            {/* 공급업체 선택 셀렉트 박스 */}
            <FormControl fullWidth>
                <InputLabel>공급업체</InputLabel>
                <Select
                    value={selectedSupplier}
                    onChange={handleSupplierChange}
                    label="공급업체"
                >
                    {suppliers.map((supplier) => (
                        <MenuItem key={supplier.userId} value={supplier.userId}>
                            {supplier.mname}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {order.orderedProducts.map((product, index) => (
                <Box key={product.id} display="flex" alignItems="center" marginY={1}>
                    <Typography variant="body1" sx={{ width: '70%' }}>
                        {product.name}
                    </Typography>
                    <TextField
                        label="주문 수량"
                        variant="outlined"
                        value={product.amount}
                        onChange={(e) => handleAmountChange(index, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Box>
            ))}

            <Button variant="contained" onClick={handleClickUpdate}>
                수정
            </Button>
        </Box>
    );
};

export default ModifyComponent;
