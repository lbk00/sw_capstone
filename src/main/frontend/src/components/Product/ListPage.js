import React, { useState } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import ListComponent from "./ListComponent";
import { Button, Box } from "@mui/material";
import AddPage from "./AddPage";


  const ListPage = () => {
      const [openModal, setOpenModal] = useState(false);

      const handleOpen = () => {
          setOpenModal(true);
      };

      const handleClose = () => {
          setOpenModal(false);
      };

    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ||1
    const size = queryParams.get("size") ||10


    return (
        <div className="p-4 w-full bg-orange-200">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="text-3xl font-extrabold">
              공급업체 목록
            </div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              새로운 상품 등록
            </Button>
          </Box>
          <ListComponent />
          <AddPage open={openModal} onClose={handleClose} />
        </div>
      );
  }
export default ListPage;

