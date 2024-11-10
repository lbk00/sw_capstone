import { useParams } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";

const ModifyPage = ({id}) => {

    return (
        <div
            className="p-4 w-full max-w-lg bg-white rounded-lg shadow-lg"
            style={{
                textAlign: 'center',
                padding: '2rem',         // Optional: add padding for inner spacing
                boxSizing: 'border-box', // Ensure padding doesn’t affect width
            }}
        >
            <div className="text-3xl font-extrabold">
                상품 수정 페이지
            </div>
            <ModifyComponent id={id}/>
        </div>

    );
}

export default ModifyPage;
