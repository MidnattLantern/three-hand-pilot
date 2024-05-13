import React from "react";
import AddressCreateForm from "../pages/address_book/AddressCreateForm";
import AddressList from "../pages/address_book/AddressList";
import AddressDetail from "../pages/address_book/AddressDetail";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddressComponent = () => {
    const { action } = useParams();

    return (
        <div>
            <Link to="/address/create/_">Create</Link>

            {action === "create" ? (<>
            <h1>Create address</h1>
            <AddressCreateForm/>
            </>) : (<></>)}

            {action === "list" ? (<>
            <h1>List view</h1>
            <AddressList/>
            </>) : (<></>)}

            {action === "detail" ? (<>
            <h1>Detail view</h1>
            <AddressDetail/>
            </>) : (<></>)}

        </div>
    );
};

export default AddressComponent;
