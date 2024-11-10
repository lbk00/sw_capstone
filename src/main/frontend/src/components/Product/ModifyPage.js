import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = ({id, onClose}) => {

    return (


            <ModifyComponent id={id}/>
        </div>

    );
}

export default ModifyPage;
