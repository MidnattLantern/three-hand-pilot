import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, uesParams, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { Form } from "react-bootstrap";
import axios from "axios";
import styles from "../../styles/EntityBankCRUDForm.module.css";

const ProductEditForm = () => {
    const [productData, setProductData] = useState({
        product_name: "",
        serial_number_prefix: "",
    });
    const {
        product_name,
        serial_number_prefix,
    } = productData;
    const history = useHistory();
    const { product_id } = useParams();
    const currentAuthentication = useCurrentAuthentication();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axios.get(`/product/${product_id}`);
                const {
                    is_owner,
                    product_name,
                    serial_number_prefix
                } = data
                is_owner ? setProductData({
                    product_name,
                    serial_number_prefix,
                }) : history.push("/");
            } catch(err) {
                console.log(err)
            };
        };
        handleMount();
    }, [history, product_id]);

    const handleChange = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("product_name", product_name);
        formData.append("serial_number_prefix", serial_number_prefix);

        try {
            await axiosReq.put(`/product/${product_id}`, formData);
            history.push(`/product/${currentAuthentication?.user_authentication_id}/detail/${product_id}`);
        } catch(err) {
            console.log(err);
            if (err.response?.status !== 401) {
                console.log(err.response?.data);
            };
        };
    };

    return(
        <div>
            <h1>Edit {product_name}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <table>
                        <tr>
                            <td>Product name</td>
                            <td>
                                <Form.Control
                                className={styles.FormControl}
                                type="text"
                                name="product_name"
                                value={product_name}
                                onChange={handleChange}
                                placeholder="Product name may not be blank"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Serial number prefix</td>
                            <td>
                                <Form.Control
                                className={styles.FormControl}
                                type="text"
                                name="serial_number_prefix"
                                value={serial_number_prefix}
                                onChange={handleChange}
                                placeholder="Enter serial number prefix"
                                />
                            </td>
                        </tr>
                    </table>
                </Form.Group>
                <br/>
                <div className={styles.SaveButtonContainer}>
                    <button className={styles.Button} type="submit">Save</button>
                    <p className={styles.Button} onClick={() => {history.goBack()}}>Cancel</p>
                </div>
            </Form>
        </div>
    );
};

export default ProductEditForm;
