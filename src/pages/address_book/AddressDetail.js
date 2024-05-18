import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Address from "./Address";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddressDetail = () => {
    const { address_id } = useParams();
    const [addressDetail, setAddressDetail] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: address }] = await Promise.all([
                    axiosReq.get(`/address_book/${address_id}`)
                ]);
                setAddressDetail({ results: [address] });
            } catch(err) {
                console.log(err)
            };
        };
        handleMount();
    }, [address_id]);

    return(
        <div>
            <p>address_id: {address_id}</p>
            <Address {...addressDetail.results[0]} setAddressDetail={setAddressDetail} AddressDetail/>
        </div>
    );
};

export default AddressDetail;
