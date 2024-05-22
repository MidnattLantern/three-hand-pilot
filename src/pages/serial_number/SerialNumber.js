import React from "react";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";

const SerialNumber = (props) => {
    const {
        id,
        owner,
        link_product_name,
        link_partnering_end,
        serial_number,
        SerialNumberList,
        SerialNumberDetail,
    } = props;

    const currentAuthentication = useCurrentAuthentication();
    const is_owner = currentAuthentication?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/serial_number/${currentAuthentication?.user_authentication_id}/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/serial_number/${id}`);
            history.push(`/serial_number/${currentAuthentication?.user_authentication_id}/_/_`);
        } catch(err) {
            console.log(err);
        };
    };

    return (<>
        {is_owner ? (<div>
            <h1>{serial_number}</h1>
            
        </div>) : (null)}
        </>);
};

export default SerialNumber;
