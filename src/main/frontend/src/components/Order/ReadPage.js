import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ReadComponent from "./ReadComponent";
import { Typography, Paper, Box, Modal, Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import AddPage from "./AddPage";
import ModifyPage from "./ModifyPage";


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
    // 주문 확인 모달 상태 관리
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleConfirmOpen = () => setConfirmOpen(true);
    const handleConfirmClose = () => setConfirmOpen(false);

    const [completeOpen, setCompleteOpen] = useState(false);

    const handleCompleteOpen = () => setCompleteOpen(true);
    const handleCompleteClose = () => setCompleteOpen(false);

    const [returnOpen, setReturnOpen] = useState(false);

    const handleReturnOpen = () => setReturnOpen(true);
    const handleReturnClose = () => setReturnOpen(false);

    // 주문하기 확인 후 처리
    const handleConfirmOrder = () => {
        orderAssign(id); // 주문 처리 함수 실행
        setConfirmOpen(false); // 모달 닫기
    };

    // 납품하기 확인 후 처리
    const handleCompleteOrder = () => {
        orderComplete(id); // 주문 처리 함수 실행
        setCompleteOpen(false); // 모달 닫기
    };

    // 반품하기 확인 후 처리
    const handleReturnOrder = () => {
        orderReturn(id); // 주문 처리 함수 실행
        setReturnOpen(false); // 모달 닫기
    };

    const [modifyOpen, setModifyOpen] = useState(false);
    const handleModifyOpen = () => setModifyOpen(true);
    const handleModifyClose = () => setModifyOpen(false);

    // 삭제 모달 상태 관리
    const [deleteOpen, setDeleteOpen] = useState(false);

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
        orderDelete(id); // 삭제 함수 호출
        handleClose(); // 모달 닫기
    };
    const orderAssign = async (id) => {
        try {
          await axios.get(`http://localhost:8080/api/orders/order/${id}`); // 백엔드 서버의 주소와 경로를 적절히 수정해야 합니다.
          alert('주문이 완료되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
        } catch (error) {
          console.error('주문 중 오류가 발생했습니다:', error);
        }
      };


    const orderComplete = async (id) => {
        try {
            await axios.get(`http://localhost:8080/api/orders/complete/${id}`); // 백엔드 서버의 주소와 경로를 적절히 수정해야 합니다.
            alert('납품이 완료되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
        } catch (error) {
            console.error('납품 중 오류가 발생했습니다:', error);
        }
    };

    const orderReturn = async (id) => {
        try {
            await axios.get(`http://localhost:8080/api/orders/return/${id}`); // 백엔드 서버의 주소와 경로를 적절히 수정해야 합니다.
            alert('반품이 완료되었습니다.');
            window.location.href = 'http://localhost:3000/dashboard';
        } catch (error) {
            console.error('반품 중 오류가 발생했습니다:', error);
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
            window.location.href = 'http://localhost:3000/dashboard';
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
              {/* 주문하기 버튼 */}
              <Button
                  sx={{ bgcolor: 'gray', color: 'white', '&:hover': { bgcolor: 'gray' }, mb: 4, mt: 2, ml: 3, mr: 3 }}
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmOpen} // 모달 열기
              >
                  주문하기
              </Button>

              {/* 주문 확인 모달 */}
              <Dialog
                  open={confirmOpen}
                  onClose={handleConfirmClose}
                  aria-labelledby="confirm-dialog-title"
                  aria-describedby="confirm-dialog-description"
              >
                  <DialogTitle id="confirm-dialog-title">주문 확인</DialogTitle>
                  <DialogContent>
                      <DialogContentText id="confirm-dialog-description">
                          정말 주문하시겠습니까?
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleConfirmOrder} color="primary" autoFocus>
                          예
                      </Button>
                      <Button onClick={handleConfirmClose} color="primary">
                          아니오
                      </Button>
                  </DialogActions>
              </Dialog>
                  <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2, ml : 3 , mr : 3}}
                          variant="contained" color="primary"
                          onClick={handleModifyOpen}
                          type="button">
                      주문 수정
                  </Button>
                  <Modal
                      open={modifyOpen}
                      onClose={handleModifyClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                  >
                      <Box sx={modalStyle}>
                          <h2 id="modal-modal-title">주문서 수정</h2>
                          <p id="modal-modal-description">
                              <ModifyPage id={id}/>
                          </p>
                          {/* 주문서 등록 폼이나 기타 내용 */}
                      </Box>
                  </Modal>
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
                        variant="contained" color="primary" onClick={handleCompleteOpen}>
                    납품 처리
                </Button>
                <Dialog
                    open={completeOpen}
                    onClose={handleCompleteClose}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title">납품 확인</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description">
                            납품하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCompleteOrder} color="primary" autoFocus>
                            예
                        </Button>
                        <Button onClick={handleCompleteClose} color="primary">
                            아니오
                        </Button>
                    </DialogActions>
                </Dialog>

                <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2 , ml : 3 , mr : 3}}
                        variant="contained" color="primary" onClick={handleReturnOpen}>
                    반품 처리
                </Button>
                <Dialog
                    open={returnOpen}
                    onClose={handleReturnClose}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title">반품 확인</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description">
                            반품하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleReturnOrder} color="primary" autoFocus>
                            예
                        </Button>
                        <Button onClick={handleReturnClose} color="primary">
                            아니오
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        )}
        {order.orderType === 'RETURNING' && (
            <Box mt={2}>
                <Button sx={{ bgcolor: 'gray', color: 'white','&:hover': { bgcolor: 'gray' },mb : 4, mt : 2 , ml : 3 , mr : 3}}
                        variant="contained" color="primary" onClick={handleCompleteOpen}>
                    납품 처리
                </Button>
                <Dialog
                    open={completeOpen}
                    onClose={handleCompleteClose}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title">납품 확인</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description">
                            납품하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCompleteOrder} color="primary" autoFocus>
                            예
                        </Button>
                        <Button onClick={handleCompleteClose} color="primary">
                            아니오
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        )}
        {order.orderType === 'COMPLETE_ORDER' && (
            <Box mt={2}>
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
    </Box>
  );
}

export default ReadPage;