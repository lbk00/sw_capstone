import React from "react";
import {Link, useSearchParams} from "react-router-dom";
import ListComponent from "./ListComponent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";



  const ListPage = () => {

    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ||1
    const size = queryParams.get("size") ||10
    const handleRowClick = (id) => {
        console.log(`Row with id ${id} was clicked`);
        // 여기에 행 클릭 시 수행할 작업을 추가합니다.
      };

    return (
    <div className="p-4 w-full bg-orange-200 ">
     <div className="text-3xl font-extrabold">
       Order List Page Component
     </div>
     <ListComponent onRowClick={handleRowClick} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" component={Link} to="/order/add">주문서 등록</Button>
            <Button variant="contained" component={Link} to="/order/modify">주문서 수정</Button>
            <Button variant="contained">주문서 삭제</Button>
        </Box>
     <div>{page}</div>

    </div>
    );
  }
export default ListPage;

