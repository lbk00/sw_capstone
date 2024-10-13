import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "./ReadComponent";
import { Typography, Paper, Box, Modal, Button } from '@mui/material';
import axios from 'axios';




const ReadPage = () => {
  const { id } = useParams(); // URL 파라미터에서 주문서의 ID를 가져옵니다.
  const [open, setOpen] = useState(false); // 모달창의 상태를 관리하는 상태를 생성합니다.

    const handleOpen = () => setOpen(true); // 모달창을 열기 위한 함수를 생성합니다.
    const handleClose = () => setOpen(false); // 모달창을 닫기 위한 함수를 생성합니다.
    const order = async (id) => {
        try {
          await axios.post(`http://localhost:8080/api/orders/order/${id}`); // 백엔드 서버의 주소와 경로를 적절히 수정해야 합니다.
          alert('주문이 완료되었습니다.');
        } catch (error) {
          console.error('주문 중 오류가 발생했습니다:', error);
        }
      };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Order Receipt
      </Typography>
      <Paper elevation={3} sx={{ p: 2, width: '80%', mt: 2 }}>
        <ReadComponent id={id} /> {/* 주문서의 ID를 ReadComponent 컴포넌트에 prop으로 전달합니다. */}
      </Paper>
      <Box mt={2}> {/* 주문하기 버튼에 상단 마진을 추가합니다. */}
              <Button variant="contained" color="primary" onClick={() => order(id)}>
                    주문하기
                  </Button>
              </Box>
    </Box>
  );
}

export default ReadPage;