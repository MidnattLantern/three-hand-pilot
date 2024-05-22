import React from "react";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/EntityBank.module.css"

const SerialNumber = (props) => {
    const {
        id,
        owner,
//        link_product_name,
//        link_partnering_end,
        serial_number,
        SerialNumberList,
        SerialNumberDetail,
        display_link_product_name,
        display_link_partnering_end,
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
            {SerialNumberDetail ? (<>
                <h1>{serial_number}</h1>
                <table>
                    <tr>
                        <td>Serial number:</td>
                        <td>{serial_number}</td>
                    </tr>
                    <tr>
                        <td>Product:</td>
                        <td>{display_link_product_name}</td>
                    </tr>
                    <tr>
                        <td>Renting partner:</td>
                        <td>{display_link_partnering_end}</td>
                    </tr>
                </table>
                <div className={styles.EditDeleteContainer}>
                    <button className={styles.EditButton} onClick={handleEdit}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    <button className={styles.DeleteButton} onClick={handleDelete}>Delete <i className="fa-solid fa-xmark"></i></button>
                </div>
            </>) : (null)}
            {SerialNumberList ? (<>
                <Link to={`/serial_number/${currentAuthentication?.user_authentication_id}/detail/${id}`}>
                    <h1 className={styles.EntityBankLinkText}>{serial_number}</h1>
                </Link>
            </>) : (null)}
            
        </div>) : (null)}
        </>);
};

export default SerialNumber;
