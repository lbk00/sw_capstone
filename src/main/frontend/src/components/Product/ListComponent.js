import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getList } from "../../api/ProductApi";
import useCustomMove from "../../hooks/useCustomMove";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ReadPage from './ReadPage';
import PageComponent from '../common/PageComponent';

const initState = {
  dtoList: [], pageNumList: [], pageRequestDTO: null, prev: false, next: false,
  totalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0
};

const ListComponent = ({ onRowClick, itemType, setItemType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { moveToRead, page, size, refresh, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [product, setProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleRowClick = (product) => {
    setSelectedId(product.id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getList({ page, size }).then(data => {
      console.log(data);
      setServerData(data);
      setProduct(data.dtoList || []); // Ensure dtoList is not undefined
      console.log(data.dtoList);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      setProduct([]); // API call failure sets product to an empty array
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">이름</TableCell>
                <TableCell align="right">상품 종류</TableCell>
                <TableCell align="right">사이즈</TableCell>
                <TableCell align="right">가격</TableCell>
                <TableCell align="right">수량</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.length > 0 ? product.map(product =>
                <TableRow
                  key={product.id}
                  onClick={() => {
                    handleRowClick(product);
                    console.log(`Row clicked with id: ${product.id}`);
                    onRowClick(product.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="right">{product.id}</TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.item_type}</TableCell>
                  <TableCell align="right">{product.size}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.amount}</TableCell>
                </TableRow>
              ) : <TableRow><TableCell colSpan={9}>No data</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} itemType={0} setProduct={setProduct}></PageComponent>
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
          {selectedId && <ReadPage id={selectedId} />}
        </Box>
      </Modal>
    </div>
  );
}

export default ListComponent;