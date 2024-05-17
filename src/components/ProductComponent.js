import React from "react";

import styles from "../styles/ProductComponent.module.css";
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProductComponent = () => {
    const { action } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div>
            <h1>Product component page</h1>
            <p>Authentication: {currentAuthentication?.username}</p>
        </div>
    );
};

export default ProductComponent;
