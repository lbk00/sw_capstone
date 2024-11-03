import { useCallback, useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/ManagerApi";
import { TextField, Button, Box } from '@mui/material';

import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  userId:0,
  mid:'',
  mname: '',
  mpw: '',
  mbirthDate: '',
  memail: '',
  mtel: '',
  uadr: '',
  complete: false
}

const ModifyComponent = ({userId, moveList, moveRead}) => {

  const [manager, setManager] = useState({...initState})


  //모달 창을 위한 상태
  const [result, setResult] = useState(null)

  //이동을 위한 기능들
  const {moveToList, moveToRead} = useCustomMove()


  const handleClickModify = () => { //버튼 클릭시

    //console.log(manager)

    putOne(manager).then(data => {
      console.log("modify result: " + data)
      setResult('Modified')
    })
  }

  const handleClickDelete = () => { //버튼 클릭시

    deleteOne(userId).then( data => {
      console.log("delete result: " + data)
      setResult('Deleted')
    })

  }

  //모달 창이 close될때
  const closeModal = () => {
    if(result ==='Deleted') {
      moveToList()
    }else {
      moveToRead(userId)
    }
  }



  useEffect(() => {

    getOne(userId).then(data =>  setManager(data))

  },[userId])

  const handleChangeManager = (e) => {

    manager[e.target.name] = e.target.value

    setManager({...manager})
  }

  const handleChangeManagerComplete = (e) => {

    const value = e.target.value

    manager.complete = (value === 'Y')

    setManager({...manager})
  }

  return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal>  :<></>}

        <TextField
                label="userId"
                variant="outlined"
                value={manager.userId}
                disabled
              />

        <TextField
                  label="Name"
                  variant="outlined"
                  name="mname"
                  value={manager.mname}
                  onChange={handleChangeManager}
                />

        <TextField
                  label="ID"
                  variant="outlined"
                  name="mid"
                  value={manager.mid}
                  onChange={handleChangeManager}
                />

        <TextField
          label="Password"
          variant="outlined"
          name="mpw"
          value={manager.mpw}
          onChange={handleChangeManager}
        />

        <TextField
                label="Birth Date"
                variant="outlined"
                name="mbirthDate"
                value={manager.mbirthDate}
                onChange={handleChangeManager}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
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
          label="COMPLETE"
          variant="outlined"
          name="complete"
          value={manager.complete ? 'Y' : 'N'}
          onChange={handleChangeManagerComplete}
          select
          SelectProps={{
            native: true,
          }}
        >
          <option value='Y'>Completed</option>
          <option value='N'>Not Yet</option>
        </TextField>

        <Button variant="contained" color="secondary" onClick={handleClickDelete}>
          Delete
        </Button>

        <Button variant="contained" color="primary" onClick={handleClickModify}>
          Modify
        </Button>
      </Box>
    );
  }

export default ModifyComponent;
