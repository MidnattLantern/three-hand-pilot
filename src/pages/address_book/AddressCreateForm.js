import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form } from "react-bootstrap";

const AddressCreateForm = () => {
    const [errors, setErrors] = useState({});
    const [addressData, setAddressData] = useState({
        partnering_end: "",
    });
    const { partnering_end, } = addressData;

    const history = useHistory();

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

        try {
            const { data } = await axiosReq.post("/address_book/ ", formData);
            history.push(`/address_book/detail/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return(
        <div>
            <h1>Pilot post create form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
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
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
};

export default AddressCreateForm;
