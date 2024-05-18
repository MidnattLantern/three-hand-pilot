import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { Form } from "react-bootstrap";
import styles from "../../styles/AddressCreateForm.module.css";

const AddressCreateForm = () => {
    const [errors, setErrors] = useState({});
    const [addressData, setAddressData] = useState({
        partnering_end: "",
    });
    const { partnering_end, } = addressData;
    const history = useHistory();
    const currentAuthentication = useCurrentAuthentication();

    const handleChange = (event) => {
        setAddressData({
            ...addressData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("partnering_end", partnering_end);

        try {
            await axiosReq.post("/address_book/", formData);
            history.push(`/address/${currentAuthentication?.user_authentication_id}/_/_`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };

    return(
        <div className={styles.AddressCreateMainland}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.AddressCreateDiv}>
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="partnering_end"
                    value={partnering_end}
                    onChange={handleChange}
                    placeholder="Partnering End"
                    />
                </Form.Group>
                {errors?.partnering_end?.map((message, idx) => (
                    <p key={idx}>{message}</p>
                ))}
                <br/>
                <button className={styles.Button} type="submit">Submit</button>
            </Form>
        </div>
    )
};

export default AddressCreateForm;
