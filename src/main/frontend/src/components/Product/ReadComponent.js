import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getOne } from "../../api/ProductApi";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const initState = {
    id: '',
    name: '',
    itemType: '',
    price: '',
    size: '',
    amount: ''
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
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.itemImage
                  ? require(`../../sample/${product.itemImage}`)
                  : require('../../sample/sample1.png')}
              alt="상품 이미지"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>{product.name}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6"><strong>ID:</strong> {product.id}</Typography>
            <Typography variant="h6"><strong>Item Type:</strong> {product.itemType}</Typography>
            <Typography variant="h6"><strong>Price:</strong> ${product.price}</Typography>
            <Typography variant="h6"><strong>Size:</strong> {product.size}</Typography>
            <Typography variant="h6"><strong>Amount:</strong> {product.amount}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ReadComponent;
