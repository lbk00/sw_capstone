import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getOne } from "../../api/OrderApi"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  useCustomMove  from "../../hooks/useCustomMove";
import * as OrderApi from '../../api/OrderApi.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

const initState = {
    id: 0,
    orderedProducts: '',
    totalPrice: '',
    orderType: '',
    totalAmount:'',
    manager: '',
}

function ReadComponent({ id  }) {

    const [order, setOrder] = useState(initState);
    const [supplier, setSupplier] = useState(initState);
    const [openModal, setOpenModal] = useState(false);
    const {moveToList, moveToModify} = useCustomMove();


    const handleOpenModal = () => {
        setOpenModal(true);
      };

      const handleCloseModal = () => {
        setOpenModal(false);
      };

    useEffect(() => {
        // API에서 주문서 정보를 가져오는 함수
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
                setOrder(response.data); // 주문서 데이터를 상태로 저장
                const supplierResponse = await axios.get(`http://localhost:8080/api/manager/${response.data.manager}`);
                setSupplier(supplierResponse.data); // 공급업체 데이터를 상태로 저장

            } catch (error) {
                console.error('Error fetching the order details:', error);
            }
        };

        fetchOrderDetails(); // useEffect 호출 시 데이터를 가져옴
    }, [id]);


    let totalPrice = 0;
    // Check if order exists and orderedProducts is an array
    if (!order || !Array.isArray(order.orderedProducts)) {
        return <div>Loading...</div>; // Handle loading or error state
    }

    return(
        <>
            <div>
                <h1>납품 요청 내역</h1>
                <p>주문번호 : <b>{order.id}</b></p>
                <p>주문일자 : <b>{new Date().toLocaleString()}</b></p> {/* Display current date and time */}
                <h3>주문정보</h3>
                <hr style={{border: '1px solid black', width: '450px', marginLeft: 0}}/>
                <p>수신인 : {supplier.mname}</p>
                <p>연락처 : {supplier.mtel}</p>
                <h3>주문상품</h3>

                {order.orderedProducts.map((product) => {
                    // Update total price
                    totalPrice += product.price * product.amount;

                    return (
                        <div key={product.id}>
                            <hr style={{border: '0.1px groove gray', width: '450px', marginLeft: 0}}/>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                <img
                                    src={product.itemImage
                                        ? require(`../../sample/${product.itemImage}`)// 템플릿 리터럴을 사용하여 이미지 경로 설정
                                        : require('../../sample/리버서블 쉐르파 재킷.jpg')// 기본 이미지 경로
                                    }
                                    alt="상품 이미지"
                                    style={{width: '100px', height: 'auto', marginRight: '10px'}}
                                />
                                <div style={{marginLeft: '10px'}}>
                                    <p style={{margin: 0}}>상품명 : {product.name}</p>
                                    <p style={{margin: 0}}>상품유형 : {product.itemType}</p>
                                    <p style={{margin: 0}}>사이즈 : {product.size}</p>
                                    <p style={{margin: 0}}>주문수량 : {product.amount}</p>
                                    <p style={{margin: 0}}>상품금액 : {product.price} 원</p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <hr style={{border: '1px solid black', width: '450px', marginLeft: 0}}/>
                <h2>총 주문금액 : {totalPrice} 원</h2>
            </div>
        </>

    );
}

export default ReadComponent;