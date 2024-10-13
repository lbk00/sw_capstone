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

const initState = {
    id: 0,
    orderedProducts: '',
    totalPrice: '',
    orderType: '',
    supplier: '',
}

function ReadComponent({ id }) {

    const [order, setOrder] = useState(initState);
    const [openModal, setOpenModal] = useState(false);
    const {moveToList, moveToModify} = useCustomMove();


    const handleOpenModal = () => {
        setOpenModal(true);
      };

      const handleCloseModal = () => {
        setOpenModal(false);
      };

    useEffect(() => {
      if (id !== undefined) { // Add this line
              getOne(id)
                .then(data => {
                  console.log(data); // API로부터 받아온 데이터를 콘솔에 출력
                  setOrder(data);
                })
                .catch(error => {
                  console.error('Error fetching data: ', error); // API 호출에 실패했을 때 에러 메시지를 출력
                });
            } // Add this line
          }, [id]);

    return(
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">주문종류</TableCell>
                            <TableCell align="right">주문한 상품</TableCell>
                            <TableCell align="right">총수량</TableCell>
                            <TableCell align="right">총가격</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            {order.id} {/* 주문 ID */}
                          </TableCell>
                          <TableCell align="right">
                            {order.orderType} {/* 주문 종류 */}
                          </TableCell>
                          <TableCell align="right">
                            {Array.isArray(order.orderedProducts) ? order.orderedProducts.map((product, index) => (
                              <p key={index}>{product.name}</p>
                            )) : 'No products'}
                          </TableCell>
                          <TableCell align="right">
                            {order.totalAmount} {/* 총 수량 */}
                          </TableCell>
                          <TableCell align="right">
                            {order.totalPrice} {/* 총 가격 */}
                          </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


        </>

    );
}

export default ReadComponent;