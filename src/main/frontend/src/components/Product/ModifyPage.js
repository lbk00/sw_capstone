import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = () => {

    const {id} = useParams()

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Product Modify Page
            </div>

            <ModifyComponent id={id}/>

        </div>
    );
}

export default ModifyPage;
