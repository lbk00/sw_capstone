import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../../api/UserApi";
import useCustomMove from "../../hooks/useCustomMove";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';
import PageComponent from "../common/PageComponent";
import axios from "axios";

const initState = {
  dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
  totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0
}

const ListComponent = () => {
  const [selectedUser_Id, setSelectedUser_Id] = useState(null);
  const [open, setOpen] = useState(false);
  const { moveToRead, page, size, refresh, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList({ page, size }).then(data => {
      setServerData(data);
      setUser(data.dtoList);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      setUser([]);
    });
  }, [page, size, refresh]);


  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>user_Id</TableCell>
                <TableCell align="right">이름</TableCell>
                <TableCell align="right">성별</TableCell>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">전화번호</TableCell>
                <TableCell align="right">이메일</TableCell>
                <TableCell align="right">주소</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.length > 0 ? user.map(user =>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {user.user_Id}
                  </TableCell>
                  <TableCell align="right">{user.cname}</TableCell>
                  <TableCell align="right">{user.cgender}</TableCell>
                    <TableCell align="right">{user.cid}</TableCell>

                  <TableCell align="right">{user.ctel}</TableCell>
                  <TableCell align="right">{user.cemail}</TableCell>
                  <TableCell align="right">{user.cadr}</TableCell>
                </TableRow>
              ) : <TableRow><TableCell colSpan={9}>No data</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} setUser={setUser}></PageComponent>


    </div>
  );
}

export default ListComponent;