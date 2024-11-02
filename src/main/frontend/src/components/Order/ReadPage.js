import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ReadComponent from "./ReadComponent";
import { Typography, Paper, Box, Modal, Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';


const initState = {
    id: 0,
    orderedProducts: '',
    totalPrice: '',
    orderType: '',
    totalAmount:'',
    manager: '',
}

const ReadPage = ({ id }) => {
  //const { id } = useParams(); // URL 파라미터에서 주문서의 ID를 가져옵니다.
  const [open, setOpen] = useState(false); // 모달창의 상태를 관리하는 상태를 생성합니다.
    const [order, setOrder] = useState(initState);
    const handleOpen = () => setOpen(true); // 모달창을 열기 위한 함수를 생성합니다.
    const handleClose = () => setOpen(false); // 모달창을 닫기 위한 함수를 생성합니다.

    const handleDelete = () => {
        orderDelete(id); // 삭제 함수 호출
        handleClose(); // 모달 닫기
    };
    const orderAssign = async (id) => {
        try {
          await axios.get(`http://localhost:8080/api/orders/order/${id}`); // 백엔드 서버의 주소와 경로를 적절히 수정해야 합니다.
          alert('주문이 완료되었습니다.');
        } catch (error) {
          console.error('주문 중 오류가 발생했습니다:', error);
        }
      };

    const orderComplete = async (id) => {
        try {
            await axios.get(`http://localhost:8080/api/orders/complete/${id}`); // 백엔드 서버의 주소와 경로를 적절히 수정해야 합니다.
            alert('납품이 완료되었습니다.');
        } catch (error) {
            console.error('납품 중 오류가 발생했습니다:', error);
        }
    };


    useEffect(() => {
        // API에서 주문서 정보를 가져오는 함수
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
                setOrder(response.data); // 주문서 데이터를 상태로 저장
            } catch (error) {
                console.error('Error fetching the order details:', error);
            }
        };

        fetchOrderDetails(); // useEffect 호출 시 데이터를 가져옴
    }, [id]);

    const orderDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/orders/${id}`);
            alert('삭제가 완료되었습니다.');
        } catch (error) {
            console.error('삭제 중 오류가 발생했습니다:', error);
        }
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Order Receipt
      </Typography>
      <Paper elevation={3} sx={{ p: 2, width: '500px', mt: 2 }}>
        <ReadComponent id={id} /> {/* 주문서의 ID를 ReadComponent 컴포넌트에 prop으로 전달합니다. */}
      </Paper>
        {order.orderType === 'BEFORE_ORDER' && (
          <Box mt={2}> {/* 주문하기 버튼에 상단 마진을 추가합니다. */}
                  <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2 , ml : 3 , mr : 3}}
                      variant="contained" color="primary" onClick={() => orderAssign(id)}>
                        주문하기
                  </Button>
                  <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2, ml : 3 , mr : 3}}
                          variant="contained" color="primary" component={Link}
                          to="/order/modify">
                      주문 수정
                  </Button>
              <Button
                  sx={{
                      bgcolor: 'gray',
                      color: 'white',
                      '&:hover': { bgcolor: 'gray' },
                      mb: 4,
                      mt: 2,
                      ml: 3,
                      mr: 3
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleOpen} // 모달 열기
              >
                  주문 삭제
              </Button>

              {/* 삭제 확인 모달 */}
              <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>주문 삭제</DialogTitle>
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
            )}
        {order.orderType === 'PROGRESS_ORDER' && (
            <Box mt={2}>
                <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2 , ml : 3 , mr : 3}}
                        variant="contained" color="primary" onClick={() => orderComplete(id)}>
                    납품 처리
                </Button>
                <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2 , ml : 3 , mr : 3}}
                        variant="contained" color="primary">
                    반품 처리
                </Button>
            </Box>
        )}
        {order.orderType === 'RETURNING' && (
            <Box mt={2}>
                <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2 , ml : 3 , mr : 3}}
                        variant="contained" color="primary" onClick={() => orderComplete(id)}>
                    납품 처리
                </Button>
            </Box>
        )}
    </Box>
  );
}

export default ReadPage;