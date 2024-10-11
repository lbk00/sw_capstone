import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { getList, getOne } from "../../api/OrderApi";
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
import PageComponent from "../common/PageComponent";


const initState = {
  dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
  totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0
}

const ListComponent = ({ onRowClick }) => {
  console.log(onRowClick);
  const [selectedid, setSelectedid] = useState(null); // setSelectedid 함수 정의
  const {moveToRead, page, size, refresh, moveToList} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const [orders, setorders] = useState([]); // orders state
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getList({page,size}).then(data => {
      console.log(data)
      setServerData(data)
      setorders(data.dtoList) // setorders function
      console.log(data.dtoList)
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      setorders([]); // API 호출 실패 시 orders를 빈 배열로 설정
    });
  }, [page,size, refresh]);
  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">주문 ID</TableCell>
                <TableCell align="right">주문종류</TableCell>
                <TableCell align="right">주문한 상품</TableCell>
                <TableCell align="right">총수량</TableCell>
                <TableCell align="right">총가격</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? orders.map(order =>
                <TableRow key={order.id} onClick={() => {
                      console.log(`Row clicked with id: ${order.id}`); // 로깅하여 확인
                      onRowClick(order.id);
                      }}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">{order.id}</TableCell>
                  <TableCell align="right">{order.orderType}</TableCell>
                  <TableCell align="right">{order.orderedProducts}</TableCell>
                  <TableCell align="right">{order.totalAmount}</TableCell>
                  <TableCell align="right">{order.totalPrice}</TableCell>
                </TableRow>
              ) : <TableRow><TableCell colSpan={9}>No data</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} setorders={setorders}></PageComponent>
    </div>
  );
}

export default ListComponent;