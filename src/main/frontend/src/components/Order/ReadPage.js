import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "./ReadComponent";

const ReadPage = () => {

      const {id} = useParams()

      return (
       <div className="font-extrabold w-full bg-white mt-6">
       <div className="text-2xl "> Order Read Page Component {id} </div>
        <ReadComponent id={id}></ReadComponent>
       </div>
      );
}
export default ReadPage;