import React from "react";
import SerialNumberCreateForm from "../pages/serial_number/SerialNumberCreateForm";
import SerialNumberList from "../pages/serial_number/SerialNumberList";
import SerialNumberDetail from "../pages/serial_number/SerialNumberDetail";
import SerialNumberEditForm from "../pages/serial_number/SerialNumberEditForm";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../styles/EntityBankComponent.module.css";
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";

const renderAction = (action) => {
    switch (action) {
        case 'create':
            return <SerialNumberCreateForm />;
        case 'detail':
            return <SerialNumberDetail />;
        case 'edit':
            return <SerialNumberEditForm />;
        default:
            return null;
    };
};

const SerialNumberComponent = () => {
    const { action } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div className={styles.EntityBankComponentView}>
            <div className="col-md-6">
                <div className={styles.MainContainer}>
                    <h1>Serial number list</h1>
                    <br/>
                    <div className={styles.ScrollableList}>
                        <Link to={`/serial_number/${currentAuthentication?.user_authentication_id}/create/_`}>
                            <h1 className={styles.CreateButton}>New serial number <i className="fa-regular fa-square-plus"></i></h1>
                        </Link>
                        <SerialNumberList />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className={styles.SubContainer}>
                    {renderAction(action)}
                </div>
            </div>
        </div>
    )
}

export default SerialNumberComponent;
