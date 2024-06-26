import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import styles from "../../styles/EntityBankCRUDForm.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Dropdown, Form } from "react-bootstrap";
//import Product from "../product/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const SerialNumberCreateForm = () => {
    const DropdownButton = React.forwardRef(({ onClick }, ref) => (
        <div
            className={styles.FormControl}
            ref={ref}
            onClick={(event) => {
                event.preventDefault();
                onClick(event);
            }}
        >
            <button className={styles.DropDownButton}>
                <i class="fa-solid fa-caret-down"></i> {displayHoldProductOption}
            </button>
        </div>
      ));

    const { user_id } = useParams();
    const [productOptionList, setProductOptionList] = useState({ results: [] });
    const [holdProductOptionID, setHoldProductOptionID] = useState(null);
    const [displayHoldProductOption, setDisplayHoldProductOption] = useState("----------");
    const [serialNumber, setSerialNumber] = useState("");

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

    const [errors, setErrors] = useState({});
    const history = useHistory();
    const currentAuthentication = useCurrentAuthentication();

    const handleSetSerialNumber = (event) => {
        setSerialNumber(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("link_product_name", holdProductOptionID);
        formData.append("serial_number", serialNumber);
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
                                <Dropdown className="ml-auto" drop="down">
                                    <Dropdown.Toggle as={DropdownButton} />
                                    <Dropdown.Menu
                                        className={styles.DropDownContainer}
                                        popperConfig={{ strategy: "fixed" }}
                                    >
                                    <InfiniteScroll
                                    children={productOptionList.results.map((product) => (
                                        <div onClick={() => {
                                            setHoldProductOptionID(product.id);
                                            setDisplayHoldProductOption(product.product_name);
                                            setSerialNumber(product.serial_number_prefix);
                                            }}>
                                                <Dropdown.Item className={styles.DrowndownItem}>
                                                    {product.product_name}
                                                </Dropdown.Item>
                                        </div>
                                    ))}
                                    dataLength={productOptionList.results.length}
                                    loader={<p>loading...</p>}
                                    hasMore={!!productOptionList.next}
                                    next={() => fetchMoreData(productOptionList, setProductOptionList)}
                                    />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>

                            <tr>
                                <td>Serial number:</td>
                                <td>
                                    <Form.Control
                                    className={styles.FormControl}
                                    name="serialNumber"
                                    value={serialNumber}
                                    placeholder="(No prefix)"
                                    onChange={handleSetSerialNumber}
                                    />
                                </td>
                            </tr>

                    </table>

                </Form.Group>
                {errors?.product_name?.map((message, idx) => (
                    <p key={idx}>{message}</p>
                ))}
                <div className={styles.SaveButtonContainer}>
                    {serialNumber !== "" && holdProductOptionID  ? (<>
                        <button className={styles.Button} type="submit">Create</button>
                        <p className={styles.Button} onClick={history.goBack}>Cancel</p>
                    </>) : (<>
                        <div className={styles.ButtonDisabled}></div>
                        <p className={styles.Button} onClick={history.goBack}>Cancel</p>
                    </>)}
                </div>
                <br/>
            </Form>
        </div>
    );
};

export default SerialNumberCreateForm;
