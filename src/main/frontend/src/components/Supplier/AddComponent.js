import React, { useState } from "react";
import { postAdd } from "../../api/SupplierApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';

const initState = {
  sid: '',
  sname: '',
  sgender: '',
  stel: '',
  spw: '',
  semail: '',
  sadr: '',
  sprofileimage: '',


}

const AddComponent = () => {

  const [supplier, setSupplier] = useState({...initState})
  const [result, setResult] = useState(null)
  const {moveToList} = useCustomMove()

  const handleChangeSupplier = (e) => {
    supplier[e.target.name] = e.target.value
    setSupplier({...supplier})
  }

  const handleClickAdd = () => {
    postAdd(supplier)
      .then(result => {
        
   
        setResult(result.supplierId)
        setSupplier({...initState})
      }).catch(e => { console.error(e) })
  }

  const closeModal = () => {
    setResult(null)
    moveToList()
  }

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      {result ? <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFn={closeModal}/>: <></>}
      <TextField
              label="ID"
              variant="outlined"
              name="sid"
              value={supplier.sid}
              onChange={handleChangeSupplier}
            />

      <TextField
        label="Name"
        variant="outlined"
        name="sname"
        value={manager.sname}
        onChange={handleChangeSupplier}
      />

      <TextField
                    label="Gender"
                    variant="outlined"
                    name="sgender"
                    value={supplier.sgender}
                    onChange={handleChangeSupplier}
                  />

      <TextField
                    label="Phone Number"
                    variant="outlined"
                    name="stel"
                    value={supplier.stel}
                    onChange={handleChangeSupplier}
                    inputProps={{ pattern: "\\d{3}-\\d{3,4}-\\d{4}" }}
                    helperText="Format: 123-4567-8901"
                   />

      <TextField
              label="Password"
              variant="outlined"
              name="spw"
              value={supplier.spw}
              onChange={handleChangeSupplier}
            />

      <TextField
              label="Email"
              variant="outlined"
              name="semail"
              value={supplier.semail}
              onChange={handleChangeSupplier}
              inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }}
              helperText="Format: example@example.com"
            />
      <TextField
              label="Address"
              variant="outlined"
              name="sadr"
              value={supplier.sadr}
              onChange={handleChangeSupplier}
              inputProps={{ pattern: "[a-zA-Z0-9\\s,]+" }}
              helperText="Format: Street, City, State, Country"
            />
      <Button variant="contained" onClick={handleClickAdd}>
        ADD
      </Button>
    </Box>
  );
};

export default AddComponent;
