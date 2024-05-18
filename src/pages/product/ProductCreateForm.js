import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import { Form } from "react-bootstrap";
import styles from "../../styles/ProductCreateForm.module.css";

const ProductCreateForm = () => {
    const [errors, setErrors] = useState({});
    const [productData, setProductData] = useState({
        product_name: "",
    });
    const { product_name, } = productData;
    const history = useHistory();
    const currentAuthentication = useCurrentAuthentication();

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
        try {
            await axiosReq.post("/product/", formData);
            history.push(`/product/${currentAuthentication?.user_authentication_id}/_/_`);
        } catch(err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };

    return(
        <div>
            <h1>Create new product</h1>
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
                                placeholder="Type here"
                                />
                            </td>
                        </tr>
                    </table>
                </Form.Group>
                {errors?.product_name?.map((message, idx) => (
                    <p key={idx}>{message}</p>
                ))}
                <br/>
                <button className={styles.Button} type="submit">Submit</button>
            </Form>
        </div>
    );
};

export default ProductCreateForm;
