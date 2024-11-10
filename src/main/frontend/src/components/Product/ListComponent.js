import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../../api/ProductApi";
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
import axios from "axios";
import ModifyComponent from './ModifyComponent';
import Modal from "@mui/material/Modal";

const initState = {
  dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
  totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0
}

const ListComponent = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const { moveToRead, page, size, refresh, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getList({ page, size }).then(data => {
      setServerData(data);
      setProducts(data.dtoList);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      setProducts([]);
    });
  }, [page, size, refresh]);

  const handleRowClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModifyPage = (id) => {
    navigate(`/product/modify/${id}`);
  };

  if (!products || products.length === 0) {
    return <div>No data available</div>;
  }

  const productDelete = async (id) => {
    try {
      console.log(`Deleting user with ID: ${id}`);
      await axios.delete(`http://localhost:8080/products/${id}`);
      alert('삭제가 완료되었습니다.');
    } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error);
    }
  };

  const movePage = (page) => {
    getList({ page, size }).then(data => {
      setServerData(data);
      setProducts(data.dtoList);
    }).catch(error => {
      console.error('Error fetching data: ', error);
      setProducts([]);
    });
  };

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>상품 ID</TableCell>
                <TableCell align="right">이름</TableCell>
                <TableCell align="right">상품종류</TableCell>
                <TableCell align="right">사이즈</TableCell>
                <TableCell align="right">가격</TableCell>
                <TableCell align="right">수량</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? products.map(product =>
                <TableRow key={product.id} onClick={() => handleRowClick(product.id)}
                sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.itemType}</TableCell>
                  <TableCell align="right">{product.size}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.amount}</TableCell>
                </TableRow>
              ) : <TableRow><TableCell colSpan={9}>No data</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 1, p: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1, p: 1 }}>
          {serverData.prev ?
            <Button variant="contained" color="primary" onClick={() => movePage(serverData.prevPage)} sx={{ mx: 1, bgcolor: 'gray', '&:hover': { bgcolor: 'darkgray' } }}>
                Prev
              </Button> : null}
            {serverData.pageNumList.map(pageNum =>
              <Button key={pageNum} variant="contained" color={serverData.current === pageNum ? 'secondary' : 'primary'} onClick={() => movePage(pageNum)} sx={{ mx: 1, bgcolor: 'gray', '&:hover': { bgcolor: 'darkgray' } }}>
                {pageNum}
              </Button>
            )}
            {serverData.next ?
              <Button variant="contained" color="primary" onClick={() => movePage(serverData.nextPage)} sx={{ mx: 1, bgcolor: 'gray', '&:hover': { bgcolor: 'darkgray' } }}>
                Next
              </Button> : null}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth PaperProps={{ style: { height: '80vh' } }}>
        <DialogTitle>상품 </DialogTitle>
        <DialogContent>
          {selectedId && <ReadComponent id={selectedId} />}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: 16, right: 16 }}>
            {/* 수정 버튼 */}
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1, width: '150px', height: '50px' }}
              onClick={() => handleOpen(selectedId)}
            >
              상품 수정
            </Button>
            {/* 모달 컴포넌트 */}
            <Modal open={openModal} onClose={handleModalClose}>
              <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    backgroundColor: '#f0f0f0',
                    marginTop: 300,
                  }}
              >
                <ModifyComponent id={selectedId} onClose={handleModalClose} />
              </div>
            </Modal>
            <Button variant="contained" color="error" sx={{ ml: 1, width: '150px', height: '50px' }} onClick={() => productDelete(selectedId)}>상품 삭제</Button>
          </Box>

        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListComponent;