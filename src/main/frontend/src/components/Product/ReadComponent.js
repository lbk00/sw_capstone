import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getOne } from "../../api/ProductApi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useCustomMove from "../../hooks/useCustomMove";
import * as ProductApi from '../../api/ProductApi.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const initState = {
    id: '',
        name: '',
        itemType: '',
        price: '',
        size: '',
        amount:''

}

const ReadComponent = ({ id }) => {
  const [product, setProduct] = useState(initState);

  useEffect(() => {
    if (id) {
      getOne(id)
        .then(data => setProduct(data))
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, [id]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
                    <img src={`../../sample/${product.item_image}`} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                  </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">{product.id}</Typography>
        </Grid>
        <Divider sx={{ width: '100%', my: 2 }} />
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Name:</strong> {product.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>ItemType:</strong> {product.itemType}</Typography>
        </Grid>
        <Divider sx={{ width: '100%', my: 1 }} />
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Price:</strong> {product.price}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Size:</strong> {product.size}</Typography>
        </Grid>
        <Divider sx={{ width: '100%', my: 1 }} />
        <Grid item xs={12}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Amount:</strong> {product.amount}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReadComponent;