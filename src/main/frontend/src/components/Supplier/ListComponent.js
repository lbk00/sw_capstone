import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { getList, getOne } from "../../api/ManagerApi";
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
  const [selectedUserId, setSelectedUserId] = useState(null); // setSelectedUserId 함수 정의
  const {moveToRead, page, size, refresh, moveToList} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const [managers, setManagers] = useState([]); // managers state
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getList({page,size}).then(data => {
      console.log(data)
      setServerData(data)
      setManagers(data.dtoList) // setManagers function
      console.log(data.dtoList)
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      setManagers([]); // API 호출 실패 시 managers를 빈 배열로 설정
    });
  }, [page,size, refresh]);
  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>userId</TableCell>
                <TableCell align="right">이름</TableCell>
                <TableCell align="right">성별</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">PW</TableCell>
                <TableCell align="right">생년월일</TableCell>
                <TableCell align="right">전화번호</TableCell>
                <TableCell align="right">이메일</TableCell>
                <TableCell align="right">주소</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {managers.length > 0 ? managers.map(manager =>
                <TableRow key={manager.userId} onClick={() => {
                      console.log(`Row clicked with userId: ${manager.userId}`); // 로깅하여 확인
                      onRowClick(manager.userId);
                      }}>
                  <TableCell component="th" scope="row">
                    {manager.userId}
                  </TableCell>
                  <TableCell align="right">{manager.mname}</TableCell>
                  <TableCell align="right">{manager.mgender}</TableCell>
                  <TableCell align="right">{manager.mid}</TableCell>
                  <TableCell align="right">{manager.mpw}</TableCell>
                  <TableCell align="right">{manager.mbirthDate}</TableCell>
                  <TableCell align="right">{manager.mtel}</TableCell>
                  <TableCell align="right">{manager.memail}</TableCell>
                  <TableCell align="right">{manager.uadr}</TableCell>
                </TableRow>
              ) : <TableRow><TableCell colSpan={9}>No data</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} setManagers={setManagers}></PageComponent>
    </div>
  );
}

export default ListComponent;