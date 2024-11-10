import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getList } from "../../api/OrderApi";
import useCustomMove from "../../hooks/useCustomMove";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReadComponent from './ReadComponent';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ReadPage from './ReadPage';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const initState = {
  dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
  totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0
}

const ListComponent = ({ onRowClick , orderType, setOrderType}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const {moveToRead, page, size, refresh, moveToList} = useCustomMove();
  const [serverData, setServerData] = useState(initState)
  const [order, setOrder] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleRowClick = (order) => {
    setSelectedId(order.id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getList({ page, size }).then(data => {
      const filteredData = data.dtoList.filter(order => order.orderType === 'COMPLETE_ORDER');
      setServerData({ ...data, dtoList: filteredData });
      setOrder(filteredData);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      setOrder([]);
    });
  }, [page, size, refresh]);

  const movePage = (page) => {
    getList({ page, size }).then(data => {
      const filteredData = data.dtoList.filter(order => order.orderType === 'COMPLETE_ORDER');
      setServerData({ ...data, dtoList: filteredData });
      setOrder(filteredData);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      setOrder([]);
    });
  };

  return (
      <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
        <div className="text-3xl font-extrabold">
          납품 상품 목록
        </div>
        <div className="flex flex-wrap mx-auto justify-center p-6">
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">주문 ID</TableCell>
                  <TableCell align="right">상품 ID</TableCell>
                  <TableCell align="right">주문종류</TableCell>
                  <TableCell align="right">주문한 상품</TableCell>
                  <TableCell align="right">수량</TableCell>
                  <TableCell align="right">단가</TableCell>
                  <TableCell align="right">총 가격</TableCell>
                  <TableCell align="right">총 주문금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.length > 0 ? order.map(order =>
                    <TableRow
                        key={order.id}
                        onClick={() => {
                          //handleRowClick(order);
                          console.log(`Row clicked with id: ${order.id}`); // 로깅하여 확인
                          //onRowClick(order.id);
                        }}
                        //style={{ cursor: 'pointer' }}
                    >
                      <TableCell align="left">{order.id}</TableCell>
                      <TableCell align="right">
                        {order.orderedProducts.map((product, index) => (
                            <p key={index}>{product.id}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">납품 완료</TableCell>
                      <TableCell align="right">
                        {order.orderedProducts.map((product, index) => (
                            <p key={index}>{product.name}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {order.orderedProducts.map((product, index) => (
                            <p key={index}>{product.amount}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {order.orderedProducts.map((product, index) => (
                            <p key={index}>{product.price}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {order.orderedProducts.map((product, index) => (
                            <p key={index}>{product.price * product.amount}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">{order.totalPrice}</TableCell>
                    </TableRow>
                ) : <TableRow><TableCell colSpan={9}>No data</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1, p: 1}}>
          <Box sx={{display: 'flex', justifyContent: 'center', m: 1, p: 1}}>
            {serverData.prev ?
                <Button variant="contained" color="primary" onClick={() => movePage(serverData.prevPage)}
                        sx={{mx: 1, bgcolor: 'gray', '&:hover': {bgcolor: 'darkgray'}}}>
                  Prev
                </Button> : null}
            {serverData.pageNumList.map(pageNum =>
                <Button key={pageNum} variant="contained"
                        color={serverData.current === pageNum ? 'secondary' : 'primary'}
                        onClick={() => movePage(pageNum)}
                        sx={{mx: 1, bgcolor: 'gray', '&:hover': {bgcolor: 'darkgray'}}}>
                  {pageNum}
                </Button>
            )}
            {serverData.next ?
                <Button variant="contained" color="primary" onClick={() => movePage(serverData.nextPage)}
                        sx={{mx: 1, bgcolor: 'gray', '&:hover': {bgcolor: 'darkgray'}}}>
                  Next
                </Button> : null}
          </Box>
          <List>
            {serverData.dtoList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name}
                                secondary={item.description}/> {/* Adjust according to your data structure */}
                </ListItem>
            ))}
          </List>
        </Box>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '35vw',
            height: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
          }}>
            {selectedId && <ReadPage id={selectedId}/>}
          </Box>
        </Modal>
      </div>
  );
}

export default ListComponent;