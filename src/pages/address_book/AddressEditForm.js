import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Form } from "react-bootstrap";
import axios from "axios";

const AddressEditForm = () => {
    const [errors, setErrors] = useState({});
    const [addressData, setAddressData] = useState({
        partnering_end: "",
    });
    const { partnering_end, } = addressData;
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axios.get(`/address_book/${id}`);
                const { partnering_end, is_owner, } = data
                is_owner ? setAddressData({ partnering_end }) : history.push("/");
            } catch(err) {
                console.log(err)
            }
        }
        handleMount();
    }, [history, id]);

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
            const { data } = await axiosReq.put(`/address_book/${id}`, formData);
            history.push(`/address/detail/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return(
        <div>
            <h1>Address edit form</h1>
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
                <button type="submit">Save</button>
            </Form>
        </div>
    )
};

export default AddressEditForm;
