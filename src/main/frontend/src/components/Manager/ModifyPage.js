import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = ({  onClose }) => {

  const {userId} = useParams()

  return (






          <ModifyComponent userId={userId}/>

  );
}

export default ModifyPage;
