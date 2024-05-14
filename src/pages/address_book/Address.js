import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Address.module.css"

const Address = (props) => {
    const {
        id,
        owner,
        partnering_end,
        AddressDetail,
    } = props;

    const currentAuthentication = useCurrentAuthentication();
    const is_owner = currentAuthentication?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/address/${currentAuthentication?.user_authentication_id}/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/address_book/${id}`);
            history.push(`/address/${currentAuthentication?.user_authentication_id}/_/_`);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.AddressMainland}>
            <div className={styles.PartneringEnd}>
                <p>{partnering_end}</p>
            </div>

            {is_owner && AddressDetail ? (<>
                <div className={styles.EditDeleteDiv}>
                    <button className={styles.EditButton} onClick={handleEdit}>Edit</button>
                    <button className={styles.DeleteButton} onClick={handleDelete}>Delete</button>
                </div>
            </>) : (<>
                <Link className={styles.AddressLinkText} to={`/address/${currentAuthentication?.user_authentication_id}/detail/${id}`}>
                    Details <i className="fa-solid fa-arrow-right"/>
                </Link>
            </>)}

        </div>
    );
};

export default Address;
