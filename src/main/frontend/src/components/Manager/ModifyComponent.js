import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/ManagerApi";
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  userId: 0,
  mname: '',
  memail: '',
  mtel: '',
  uadr: '',
  complete: false
};

const ModifyComponent = ({ userId }) => {
  const [manager, setManager] = useState(initState);
  const [result, setResult] = useState(null);
  const { moveToList, moveToRead } = useCustomMove();

  const handleClickModify = () => {
    putOne(manager).then(data => {
      console.log("modify result: " + data);
      setResult('수정이 완료되었습니다');
    }).catch(error => {
      console.error('Error modifying data: ', error);
      setResult('Error: ' + error.message);
    });
  };

  const handleClickDelete = () => {
    deleteOne(userId).then(data => {
      console.log("delete result: " + data);
      setResult('Deleted');
    }).catch(error => {
      console.error('Error deleting data: ', error);
      setResult('Error: ' + error.message);
    });
  };

  const closeModal = () => {
    if (result === 'Deleted') {
      moveToList();
    } else {
      moveToRead(userId);
    }
  };

  useEffect(() => {
    if (userId) {
      getOne(userId).then(data => setManager(data)).catch(error => {
        console.error('Error fetching data: ', error);
      });
    }
  }, [userId]);

  const handleChangeManager = (e) => {
    const { name, value } = e.target;
    setManager(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeManagerComplete = (e) => {
    const value = e.target.value;
    setManager(prevState => ({
      ...prevState,
      complete: (value === 'Y')
    }));
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal} /> : <></>}
      <Typography variant="h5" component="h1" gutterBottom>
        공급업체 수정 페이지
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            label="userId"
            variant="outlined"
            value={manager.userId}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Name"
            variant="outlined"
            name="mname"
            value={manager.mname}
            onChange={handleChangeManager}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Email"
            variant="outlined"
            name="memail"
            value={manager.memail}
            onChange={handleChangeManager}
            inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }}
            helperText="Format: example@example.com"
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Address"
            variant="outlined"
            name="uadr"
            value={manager.uadr}
            onChange={handleChangeManager}
            inputProps={{ pattern: "[a-zA-Z0-9\\s,]+" }}
            helperText="Format: Street, City, State, Country"
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Phone Number"
            variant="outlined"
            name="mtel"
            value={manager.mtel}
            onChange={handleChangeManager}
            inputProps={{ pattern: "\\d{3}-\\d{3,4}-\\d{4}" }}
            helperText="Format: 123-4567-8901"
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="COMPLETE"
            variant="outlined"
            name="complete"
            value={manager.complete ? 'Y' : 'N'}
            onChange={handleChangeManagerComplete}
            select
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            <option value='Y'>Completed</option>
            <option value='N'>Not Yet</option>
          </TextField>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleClickModify}>
          수정
        </Button>
      </Box>
    </Box>
  );
};

export default ModifyComponent;