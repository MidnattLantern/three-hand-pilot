import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/EntityBank.module.css"

const Product = (props) => {
    const {
        id,
        owner,
        product_name,
        serial_number_prefix,
        ProductList,
        ProductDetail,
        ProductOption,
    } = props;

    const currentAuthentication = useCurrentAuthentication();
    const is_owner = currentAuthentication?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/product/${currentAuthentication?.user_authentication_id}/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/product/${id}`);
            history.push(`/product/${currentAuthentication?.user_authentication_id}/_/_`);
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <div>
            {is_owner && ProductDetail ? (<>
                <h1>{product_name}</h1>
                <table>
                    <tr>
                        <td>Product name:</td>
                        <td>{product_name}</td>
                    </tr>
                    <tr>
                        <td>Serial number prefix:</td>
                        <td>{serial_number_prefix}</td>
                    </tr>
                </table>
                <div className={styles.EditDeleteContainer}>
                    <button className={styles.EditButton} onClick={handleEdit}>Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    <button className={styles.DeleteButton} onClick={handleDelete}>Delete <i className="fa-solid fa-xmark"></i></button>
                </div>
            </>) : (<>

            </>)}
            {is_owner && ProductList ? (<>
                <Link to={`/product/${currentAuthentication?.user_authentication_id}/detail/${id}`}>
                    <h1 className={styles.EntityBankLinkText}>{product_name}</h1>
                </Link>
            </>) : (null)}

            {is_owner && ProductOption ? (<>
                    <h1 className={styles.EntityBankLinkText}>{product_name}</h1>
            </>) : (null)}
        </div>
    );
};

export default Product;
