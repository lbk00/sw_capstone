import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = ({id, onClose}) => {

    return (
        <div
            className="p-4 w-full max-w-lg bg-white rounded-lg shadow-lg"
            style={{
                textAlign: 'center',
                padding: '2rem',         // Optional: add padding for inner spacing
                boxSizing: 'border-box', // Ensure padding doesn’t affect width
            }}
        >

            <ModifyComponent id={id}/>
        </div>

    );
}

export default ModifyPage;
