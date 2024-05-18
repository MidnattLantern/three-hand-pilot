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
        address_line1,
        address_line2,
        city,
        postal_code,
//        contact_person_name,
//        contact_phone_number,
//        contact_email,
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
                <h1>{partnering_end}</h1>
            </div>

            {is_owner ? (<p>true</p>) : (<p>false</p>)}

            {is_owner && AddressDetail ? (<>
                <table>
                    <tr>
                        <td>Address</td>
                        <td>{address_line1}</td>
                    </tr>
                    <tr>
                        <td>Additional address</td>
                        <td>{address_line2}</td>
                    </tr>
                    <tr>
                        <td>Postal code/ City</td>
                        <td className={styles.PostalCodeCity}>{postal_code} {city}</td>
                    </tr>
                </table>
                <div className={styles.EditDeleteDiv}>
                    <button className={styles.EditButton} onClick={handleEdit}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    <button className={styles.DeleteButton} onClick={handleDelete}>Delete <i className="fa-solid fa-xmark"></i></button>
                </div>
            </>) : (<>
                <div className={styles.AddressLinkLocation}>
                    <Link className={styles.AddressLinkText} to={`/address/${currentAuthentication?.user_authentication_id}/detail/${id}`}>
                        Open <i className="fa-solid fa-folder-open"/>
                    </Link>
                </div>
            </>)}
        </div>
    );
};

export default Address;
