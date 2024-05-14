import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { Form } from "react-bootstrap";
import axios from "axios";
import styles from "../../styles/AddressEditForm.module.css";

const AddressEditForm = () => {
//    const [errors, setErrors] = useState({});
    const [addressData, setAddressData] = useState({
        partnering_end: "",
        address_line1: "",
        address_line2: "",
        city: "",
        postal_code: "",
        contact_person_name: "",
        contact_phone_number: "",
        contact_email: "",
    });
    const {
        partnering_end,
        address_line1,
        address_line2,
        city,
        postal_code,
        contact_person_name,
        contact_phone_number,
        contact_email,
    } = addressData;
    const history = useHistory();
    const { address_id } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axios.get(`/address_book/${address_id}`);
                const {
                    is_owner,
                    partnering_end,
                    address_line1,
                    address_line2,
                    city,
                    postal_code,
                    contact_person_name,
                    contact_phone_number,
                    contact_email,
                } = data
                is_owner ? setAddressData({
                    partnering_end,
                    address_line1,
                    address_line2,
                    city,
                    postal_code,
                    contact_person_name,
                    contact_phone_number,
                    contact_email,
                }) : history.push("/");
            } catch(err) {
                console.log(err)
            }
        }
        handleMount();
    }, [history, address_id]);

    const handleChange = (event) => {
        setAddressData({
            ...addressData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        console.log("click button")
        event.preventDefault();
        const formData = new FormData();

        formData.append("partnering_end", partnering_end);
        formData.append("address_line1", address_line1);
        formData.append("address_line2", address_line2);
        formData.append("city", city);
        formData.append("postal_code", postal_code);
        formData.append("contact_person_name", contact_person_name);
        formData.append("contact_phone_number", contact_phone_number);
        formData.append("contact_email", contact_email);

        try {
//            const { data } = await axiosReq.put(`/address_book/${address_id}`, formData);
            await axiosReq.put(`/address_book/${address_id}`, formData);
            history.push(`/address/${currentAuthentication?.user_authentication_id}/detail/${address_id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
//                setErrors(err.response?.data);
                console.log(err.response?.data);
            }
        }
    };

    return(
        <div className={styles.AddressEditMainland}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.AddressEditDiv}>
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="partnering_end"
                    value={partnering_end}
                    onChange={handleChange}
                    placeholder="Partnering end may not be blank!"
                    />
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="address_line1"
                    value={address_line1}
                    onChange={handleChange}
                    placeholder="Address"
                    />
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="address_line2"
                    value={address_line2}
                    onChange={handleChange}
                    placeholder="Additional address"
                    />
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    placeholder="City"
                    />
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="postal_code"
                    value={postal_code}
                    onChange={handleChange}
                    placeholder="Postal code"
                    />

                </Form.Group>
                <br/>
                <button className={styles.Button} type="submit">Save</button>
            </Form>
        </div>
    )
};

export default AddressEditForm;
