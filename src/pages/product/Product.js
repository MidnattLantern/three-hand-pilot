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
            <h1>Product.js</h1>
            <p>id: {id}</p>
            <p>owner: {owner}</p>
            <p>product name: {product_name}</p>
            <p>serial number prefix: {serial_number_prefix}</p>
            {ProductDetail ? (<>
            <p>Product detail</p>
            </>) : (<>
            <p>NOT product detail</p>
            </>)}
        </div>
    );
};

export default Product;
