import React from "react";
import AddressCreateForm from "../pages/address_book/AddressCreateForm";
import AddressList from "../pages/address_book/AddressList";
import AddressDetail from "../pages/address_book/AddressDetail";
import AddressEditForm from "../pages/address_book/AddressEditForm";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/AddressComponent.module.css"
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
        <div className={styles.AddressComponentView}>
            <div className="col-md-6">
                <div className={styles.Mainland}>
                    <div className={styles.AddressCreateBox}>
                        <h1>Address list</h1>
                        <Link className={styles.CreateButton} to={`/address/${currentAuthentication?.user_authentication_id}/create/_`}>
                            Create <i className="fa-regular fa-square-plus"></i>
                        </Link>
                    </div>
                    <AddressList/>
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

export default AddressComponent;
