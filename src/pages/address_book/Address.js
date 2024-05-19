import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/EntityBank.module.css"

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
        <div>
            {is_owner && AddressDetail ? (<>
                <h1>{partnering_end}</h1>
                <table>
                    <tr>
                        <td>Partnering end</td>
                        <td>{partnering_end}</td>
                    </tr>
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
                <div className={styles.EditDeleteContainer}>
                    <button className={styles.EditButton} onClick={handleEdit}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    <button className={styles.DeleteButton} onClick={handleDelete}>Delete <i className="fa-solid fa-xmark"></i></button>
                </div>
            </>) : (<>
                <Link to={`/address/${currentAuthentication?.user_authentication_id}/detail/${id}`}>
                    <h1 className={styles.EntityBankLinkText}>{partnering_end}</h1>
                </Link>
            </>)}
        </div>
    );
};

export default Address;
