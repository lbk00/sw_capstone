import React from "react";
import { useSearchParams } from "react-router-dom";
import ListComponent from "./ListComponent";



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

     <div>{page}</div>

    </div>
    );
  }
export default ListPage;

