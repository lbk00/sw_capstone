// src/main/frontend/src/components/Manager/ReadComponent.js
import { useEffect, useState } from "react";
import { getOne } from "../../api/ManagerApi";
import { Grid, Typography, Box, Divider } from '@mui/material';

const initState = {
  userId: 0,
  mName: '',
  mtel: '',
  mEmail: '',
  mProfileImage: '',
  uAdr: '',
}

const ReadComponent = ({ userId }) => {
  const [manager, setManager] = useState(initState);

  useEffect(() => {
    if (userId) {
      getOne(userId)
        .then(data => setManager(data))
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, [userId]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">{manager.mname}</Typography>
        </Grid>
        <Divider sx={{ width: '100%', my: 2 }} />
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>ID:</strong> {manager.userId}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Name:</strong> {manager.mname}</Typography>
        </Grid>
        <Divider sx={{ width: '100%', my: 1 }} />
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Phone:</strong> {manager.mtel}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Email:</strong> {manager.memail}</Typography>
        </Grid>
        <Divider sx={{ width: '100%', my: 1 }} />
        <Grid item xs={12}>
          <Typography variant="body1" fontSize="1.1rem"><strong>Address:</strong> {manager.uadr}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReadComponent;