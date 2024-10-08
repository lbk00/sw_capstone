import React from "react";
import { useSearchParams } from "react-router-dom";
import ListComponent from "./ListComponent";



  const ListPage = () => {

    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ||1
    const size = queryParams.get("size") ||10

    return (
    <div className="p-4 w-full bg-orange-200 ">
     <div className="text-3xl font-extrabold">
       Manager List Page Component
     </div>
     <ListComponent/>

     <div>{page}</div>

    </div>
    );
  }
export default ListPage;

