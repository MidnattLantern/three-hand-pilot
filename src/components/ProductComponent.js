import React from "react";
import ProductCreateForm from "../pages/product/ProductCreateForm";
import ProductList from "../pages/product/ProductList";
import ProductDetail from "../pages/product/ProductDetail";
import ProductEditForm from "../pages/product/ProductEditForm";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/ProductComponent.module.css";
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";

const renderAction = (action) => {
    switch (action) {
        case 'create':
            return <ProductCreateForm />;
        case 'detail':
            return <ProductDetail />;
        case 'edit':
            return <ProductEditForm />;
        default:
            return null;
    };
};

const ProductComponent = () => {
    const { action } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div className={styles.ProductComponentView}>
            <div className="col-md-6">
                <div className={styles.Mainland}>
                    <div>
                        <h1>Products</h1>
                        <br/>
                        <Link to={`/product/${currentAuthentication?.user_authentication_id}/create/_`}>
                            <h1 className={styles.CreateButton}>New product <i className="fa-regular fa-square-plus"></i></h1>
                        </Link>
                    </div>
                    <ProductList />
                </div>
            </div>
            <div className="col-md-6">
                <div className={styles.Island}>
                    {renderAction(action)}
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
