import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { Form } from "react-bootstrap";
import styles from "../../styles/EntityBankCRUDForm.module.css";

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
            <h1>Create new address</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <table>
                        <tr>
                        <td>Partnering end</td>
                        <td>
                            <Form.Control
                            className={styles.FormControl}
                            type="text"
                            name="partnering_end"
                            value={partnering_end}
                            onChange={handleChange}
                            placeholder="Partnering End"
                            />
                        </td>
                        </tr>
                    </table>
                </Form.Group>
                {errors?.partnering_end?.map((message, idx) => (
                    <p key={idx}>{message}</p>
                ))}
                <br/>
                <div className={styles.SaveButtonContainer}>
                    <button className={styles.Button} type="submit">Submit</button>
                    <p className={styles.Button} onClick={history.goBack}>Cancel</p>
                </div>
            </Form>
        </div>
    )
};

export default AddressCreateForm;
