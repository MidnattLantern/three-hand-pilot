import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import styles from "../../styles/EntityBankCRUDForm.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Form } from "react-bootstrap";
import Product from "../product/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const SerialNumberCreateForm = () => {
    // Gather option data for select fields, holdOption will be a string:
    const { user_id } = useParams();
    const [productOptionList, setProductOptionList] = useState({ results: [] });
    const [holdProductOptionID, setHoldProductOptionID] = useState(null);
    const [displayHoldProductOption, setDisplayHoldProductOption] = useState("");
    const [collapsedProductList, setCollapsedProductList] = useState(false);

//    const [partneringEndOptionList, setPartneringEndOptionList] = useState({ results: [] });
//    const [holdPartneringEndOptionID, setHoldPartneringEndOptionID] = useState(null);
//    const [displayHoldPartneringEndOption, setDisplayHoldPartneringEndOption] = useState("");
//    const [collapsedPartneringEndList, setCollapsedPartneringEndList] = useState(false);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const {data} = await axiosReq.get(`/product/?owner__userauthentication=${user_id}`);
                setProductOptionList(data)
            } catch(err) {
                console.log(err)
            };
        };
        fetchProductList();
    }, [user_id]);

    // Familiar code follows:
    const [errors, setErrors] = useState({});
    const [serialNumberData, setSerialNumberData] = useState({
        serial_number: "",
    });
    const {
        serial_number,
    } = serialNumberData;
    const history = useHistory();
    const currentAuthentication = useCurrentAuthentication();

    const handleChange = (event) => {
        setSerialNumberData({
            ...serialNumberData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("link_product_name", holdProductOptionID);
//        formData.append("link_partnering_end", link_partnering_end);
        formData.append("serial_number", serial_number);
        try {
            await axiosReq.post("/serial_number/", formData);
            history.push(`/serial_number/${currentAuthentication?.user_authentication_id}/_/_`);
        } catch(err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };

    return (
        <div>
            <h1>Create new serial number</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <table>
                        <tr>
                            <td>Product:</td>
                            <td>
                                <Form.Control
                                className={styles.FormControl}
                                value={displayHoldProductOption}
                                placeholder="Select product"
                                onClick={() => {setCollapsedProductList(true)}}
                                readOnly
                                />
                            </td>
                        </tr>
                        {holdProductOptionID !== null ? (<>
                            <tr>
                                <td>Serial number:</td>
                                <td>
                                    <Form.Control
                                    className={styles.FormControl}
                                    name="serial_number"
                                    value={serial_number}
                                    placeholder="(No prefix)"
                                    onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </>) : (null)}
                    </table>

                        {collapsedProductList ? (<>
                            <p>found {productOptionList.results.length} items</p>
                                {productOptionList.results.length ? (<div onClick={() => {setCollapsedProductList(false)}}>
                                    <InfiniteScroll
                                    children={productOptionList.results.map((product) => (
                                        <div onClick={() => {
                                            setHoldProductOptionID(product.id);
                                            setDisplayHoldProductOption(product.product_name);
                                            }}>
                                            <Product key={product.product_id} {...product} setProductOptionList={setProductOptionList} ProductOption/>
                                        </div>
                                    ))}
                                    dataLength={productOptionList.results.length}
                                    loader={<p>loading...</p>}
                                    hasMore={!!productOptionList.next}
                                    next={() => fetchMoreData(productOptionList, setProductOptionList)}
                                    />
                                </div>) : (null)}
                        </>) :(null)}
                </Form.Group>
                {errors?.product_name?.map((message, idx) => (
                    <p key={idx}>{message}</p>
                ))}
                <div className={styles.SaveButtonContainer}>
                    <button className={styles.Button} type="submit">Submit</button>
                    <p className={styles.Button} onClick={history.goBack}>Cancel</p>
                </div>
                <br/>
            </Form>

        </div>
    );
};

export default SerialNumberCreateForm;
