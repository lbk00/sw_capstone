import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = () => {

  const {userId} = useParams()

  return (
  <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      Manager Modify Page
    </div>

    <ModifyComponent userId={userId}/>

  </div>
   );
}

export default ModifyPage;
