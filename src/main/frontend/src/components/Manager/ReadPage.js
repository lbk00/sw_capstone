import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "./ReadComponent";

const ReadPage = () => {

      const {userId} = useParams()

      return (
       <div className="font-extrabold w-full bg-white mt-6">
       <div className="text-2xl "> Manager Read Page Component {userId} </div>
        <ReadComponent userId={userId}></ReadComponent>
       </div>
      );
}
export default ReadPage;