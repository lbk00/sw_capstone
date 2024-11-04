import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = ({id}) => {

    //const {id} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <ModifyComponent id={id}/>
        </div>
    );
}

export default ModifyPage;
