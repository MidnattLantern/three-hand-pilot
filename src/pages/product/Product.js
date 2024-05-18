import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Product.module.css"

const Product = (props) => {
    const {
        id,
        owner,
        product_name,
        serial_number_prefix,
        ProductDetail,
    } = props;

    const currentAuthentication = useCurrentAuthentication();
    const is_owner = currentAuthentication?.username === owner;
    const history = useHistory();

    return (
        <div>
            <div>
                <h1>Product: {product_name}</h1>
            </div>

            {is_owner ? (<p>true</p>) : (<p>false</p>)}

            {is_owner && ProductDetail ? (<>
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
                <div>
                    <button>Edit <i className="fa-solid fa-pen-to-square"></i></button>
                    <button>Delete <i className="fa-solid fa-xmark"></i></button>
                </div>
            </>) : (<>
                <Link className={styles.AddressLinkText} to={`/product/${currentAuthentication?.user_authentication_id}/detail/${id}`}>
                    <div>
                        Open <i className="fa-solid fa-folder-open"/>
                    </div>
                </Link>
            </>)}
        </div>
    );
};

export default Product;
