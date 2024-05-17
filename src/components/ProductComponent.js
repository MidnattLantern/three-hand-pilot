import React from "react";
import ProductCreateForm from "../pages/product/ProductCreateForm";
import ProductList from "../pages/product/ProductList";
import ProductDetail from "../pages/product/ProductDetail";
import ProductEditForm from "../pages/product/ProductEditForm";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/ProductComponent.module.css";
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";

const ProductComponent = () => {
    const { action } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div>
            <h1>Product component page</h1>
            <p>Authentication: {currentAuthentication?.username}</p>
            <ProductList />

            {action === "create" ? (<>
            <ProductCreateForm />
            </>) : (<></>)}
            {action === "_" ? (<>
            
            </>) : (<></>)}
            {action === "detail" ? (<>
            <ProductDetail />
            </>) : (<></>)}
            {action === "edit" ? (<>
            <ProductEditForm />
            </>) : (<></>)}
        </div>
    );
};

export default ProductComponent;
