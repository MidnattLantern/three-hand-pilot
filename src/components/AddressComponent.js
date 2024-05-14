import React from "react";
import AddressCreateForm from "../pages/address_book/AddressCreateForm";
import AddressList from "../pages/address_book/AddressList";
import AddressDetail from "../pages/address_book/AddressDetail";
import AddressEditForm from "../pages/address_book/AddressEditForm";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/AddressComponent.module.css"
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";

const AddressComponent = () => {
    const { action } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div className={styles.AddressComponentView}>
            <div className="col-md-6">
                <div className={styles.Mainland}>
                    <Link to={`/address/${currentAuthentication?.user_authentication_id}/create/_`}>Create</Link>
                    <AddressList/>
                </div>
            </div>

            <div className="col-md-6">
                <div className={styles.Island}>
                    {action === "create" ? (<>
                    <h1>Create new address</h1>
                    <AddressCreateForm/>
                    </>) : (<></>)}

                    {action === "_" ? (<>

                    </>) : (<></>)}

                    {action === "detail" ? (<>
                    <AddressDetail/>
                    </>) : (<></>)}

                    {action === "edit" ? (<>
                    <AddressEditForm/>
                    </>) : (<></>)}
                </div>
            </div>
        </div>
    );
};

export default AddressComponent;
