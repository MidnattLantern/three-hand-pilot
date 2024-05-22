import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import styles from "../../styles/EntityBankCRUDForm.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Dropdown, Form } from "react-bootstrap";
//import Product from "../product/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const SerialNumberEditForm = () => {
    const ProductDropdownButton = React.forwardRef(({ onClick }, ref) => (
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

      const PartneringEndDropdownButton = React.forwardRef(({ onClick }, ref) => (
        <div
            className={styles.FormControl}
            ref={ref}
            onClick={(event) => {
                event.preventDefault();
                onClick(event);
            }}
        >
            <button className={styles.DropDownButton}>
                <i class="fa-solid fa-caret-down"></i> {displayHoldPartneringEndOption}
            </button>
        </div>
      ));

    const { user_id } = useParams();
    const [productOptionList, setProductOptionList] = useState({ results: [] });
    const [holdProductOptionID, setHoldProductOptionID] = useState(null);
    const [displayHoldProductOption, setDisplayHoldProductOption] = useState("----------");
    const [partneringEndOptionList, setPartneringEndOptionList] = useState({ results: [] });
    const [holdPartneringEndOptionID, setholdPartneringEndOptionID] = useState("");
    const [displayHoldPartneringEndOption, setDisplayHoldPartneringEndOption] = useState("----------");
    const [serialNumber, setSerialNumber] = useState("");

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const [{data: productData}, {data: partneringEndData}] = await Promise.all([
                    axiosReq.get(`/product/?owner__userauthentication=${user_id}`),
                    axiosReq.get(`/address_book/?owner__userauthentication=${user_id}`),
                ]);
                setProductOptionList(productData)
                setPartneringEndOptionList(partneringEndData)

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
        formData.append("link_partnering_end", holdPartneringEndOptionID)
        formData.append("serial_number", serialNumber);
        try {
            await axiosReq.put(`/serial_number/${user_id}`, formData);
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
            <h1>Edit {serialNumber}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <table>
                        <tr>
                            <td>Product:</td>
                            <td>
                                <Dropdown className="ml-auto" drop="down">
                                    <Dropdown.Toggle as={ProductDropdownButton} />
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
                            <td>Renting partner:</td>
                            <td>
                                <Dropdown className="ml-auto" drop="down">
                                    <Dropdown.Toggle as={PartneringEndDropdownButton} />
                                    <Dropdown.Menu
                                        className={styles.DropDownContainer}
                                        popperConfig={{ strategy: "fixed" }}
                                    >
                                    <InfiniteScroll
                                    children={partneringEndOptionList.results.map((partneringEnd) => (
                                        <div
                                            onClick={() => {
                                                setholdPartneringEndOptionID(partneringEnd.id);
                                                setDisplayHoldPartneringEndOption(partneringEnd.partnering_end);
                                            }}>
                                                <Dropdown.Item className={styles.DrowndownItem}>
                                                    {partneringEnd.partnering_end}
                                                </Dropdown.Item>
                                        </div>
                                    ))}
                                    dataLength={partneringEndOptionList.results.length}
                                    loader={<p>loading...</p>}
                                    hasMore={!!partneringEndOptionList.next}
                                    next={() => fetchMoreData(partneringEndOptionList, setPartneringEndOptionList)}
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
                        <button className={styles.Button} type="submit">Save</button>
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

export default SerialNumberEditForm;
