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
  const [selecteduserId, setSelecteduserId] = useState(null);
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

  const movePage = (page) => {
        getList({ page, size }).then(data => {
          setServerData(data);
          setUser(data.dtoList);
        }).catch(error => {
          console.error('Error fetching data: ', error);
          setUser([]);
        });
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
                    {user.userId}
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1, p: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', m: 1, p: 1 }}>
                        {serverData.prev ?
                          <Button variant="contained" color="primary" onClick={() => movePage(serverData.prevPage)} sx={{ mx: 1 }}>
                            Prev
                          </Button> : null}
                        {serverData.pageNumList.map(pageNum =>
                          <Button key={pageNum} variant="contained" color={serverData.current === pageNum ? 'secondary' : 'primary'} onClick={() => movePage(pageNum)} sx={{ mx: 1 }}>
                            {pageNum}
                          </Button>
                        )}
                        {serverData.next ?
                          <Button variant="contained" color="primary" onClick={() => movePage(serverData.nextPage)} sx={{ mx: 1 }}>
                            Next
                          </Button> : null}
                      </Box>

                      </Box>


    </div>
  );
}

export default ListComponent;