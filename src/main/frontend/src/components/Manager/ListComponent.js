// src/main/frontend/src/components/Manager/ListComponent.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../../api/ManagerApi";
import useCustomMove from "../../hooks/useCustomMove";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReadComponent from './ReadComponent';
import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
  totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0
}

const ListComponent = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const { moveToRead, page, size, refresh, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getList({ page, size }).then(data => {
      setServerData(data);
      setManagers(data.dtoList);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      setManagers([]);
    });
  }, [page, size, refresh]);

  const handleRowClick = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleAddPage = () => {
    navigate('/manager/add');
  };

  const handleModifyPage = (userId) => {
    navigate(`/manager/modify/${userId}`);
  };

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>userId</TableCell>
                <TableCell align="right">이름</TableCell>
                <TableCell align="right">전화번호</TableCell>
                <TableCell align="right">이메일</TableCell>
                <TableCell align="right">주소</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {managers.length > 0 ? managers.map(manager =>
                <TableRow key={manager.userId} onClick={() => handleRowClick(manager.userId)}>
                  <TableCell component="th" scope="row">
                    {manager.userId}
                  </TableCell>
                  <TableCell align="right">{manager.mname}</TableCell>
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

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth PaperProps={{ style: { height: '80vh' } }}>
        <DialogTitle>공급업체 </DialogTitle>
        <DialogContent>
          {selectedUserId && <ReadComponent userId={selectedUserId} />}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="primary" onClick={handleAddPage}>새로운 공급업체 등록</Button>
            <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={() => handleModifyPage(selectedUserId)}>공급업체 수정</Button>
            <Button variant="contained" color="error" sx={{ ml: 1 }}>공급업체 삭제</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListComponent;