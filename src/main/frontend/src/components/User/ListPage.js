import React, { useState } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import ListComponent from "./ListComponent";
import {Button} from "@mui/material";


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
    <div className="p-4 w-full bg-orange-200 ">
     <div className="text-3xl font-extrabold">

     </div>
     <ListComponent/>

    </div>
    );
  }
export default ListPage;

