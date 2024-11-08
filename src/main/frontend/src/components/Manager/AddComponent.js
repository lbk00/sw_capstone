import React, { useState } from "react";
import { postAdd } from "../../api/ManagerApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';

const initState = {
  mname: '',
  mtel: '',
  memail: '',
  uadr: '',
}

const AddComponent = () => {
  const [manager, setManager] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const { moveToList, moveToDashboard } = useCustomMove();

  const handleChangeManager = (e) => {
    manager[e.target.name] = e.target.value;
    setManager({ ...manager });
  }

  const handleClickAdd = () => {
    postAdd(manager)
      .then(result => {
        setResult(result.userId);
        setManager({ ...initState });
      }).catch(e => { console.error(e) });
  }

  const closeModal = () => {
    setResult(null);
    moveToDashboard();
  }

  return (
    <Box sx={{'& > :not(style)': { m: 2 } }}>
      {result ? <ResultModal title={'Add Result'} content={`등록이 완료되었습니다`} callbackFn={closeModal} /> : <></>}
      <TextField
        label="Name"
        variant="outlined"
        name="mname"
        value={manager.mname}
        onChange={handleChangeManager}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        name="mtel"
        value={manager.mtel}
        onChange={handleChangeManager}
        inputProps={{ pattern: "\\d{3}-\\d{3,4}-\\d{4}" }}
        helperText="Format: 123-4567-8901"
      />
      <TextField
        label="Email"
        variant="outlined"
        name="memail"
        value={manager.memail}
        onChange={handleChangeManager}
        inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }}
        helperText="Format: example@example.com"
      />
      <TextField
        label="Address"
        variant="outlined"
        name="uadr"
        value={manager.uadr}
        onChange={handleChangeManager}
        inputProps={{ pattern: "[a-zA-Z0-9\\s,]+" }}
        helperText="Format: Street, City, State, Country"
      />
      <Button variant="contained" onClick={handleClickAdd}>
        등록
      </Button>
    </Box>
  );
};

export default AddComponent;