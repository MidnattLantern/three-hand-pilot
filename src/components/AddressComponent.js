import React from "react";
import AddressCreateForm from "../pages/address_book/AddressCreateForm";
import AddressList from "../pages/address_book/AddressList";
import AddressDetail from "../pages/address_book/AddressDetail";
import AddressEditForm from "../pages/address_book/AddressEditForm";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/EntityBankComponent.module.css";
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";

const renderAction = (action) => {
    switch (action) {
        case 'create':
            return <AddressCreateForm />;
        case 'detail':
            return <AddressDetail />;
        case 'edit':
            return <AddressEditForm />;
        default:
            return null;
    };
};

const AddressComponent = () => {
    const { action } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div className={styles.EntityBankComponentView}>
            <div className="col-md-6">
                <div className={styles.MainContainer}>
                    <h1>Address book</h1>
                    <br/>
                    <div className={styles.ScrollableList}>
                        <Link to={`/address/${currentAuthentication?.user_authentication_id}/create/_`}>
                            <h1 className={styles.CreateButton}>New product <i className="fa-regular fa-square-plus"></i></h1>
                        </Link>
                        <AddressList/>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className={styles.SubContainer}>
                    {renderAction(action)}
                </div>
            </div>
        </div>
    );
};

export default AddressComponent;
