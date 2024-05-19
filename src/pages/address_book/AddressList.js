import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Address from "./Address";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams, } from "react-router-dom/cjs/react-router-dom.min";
// no CSS

const AddressList = () => {
    const { user_id, } = useParams();
    const [addressList, setAddressList] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchAddressList = async () => {
            try {
                const { data } = await axiosReq.get(`/address_book/?owner__userauthentication=${user_id}`);
                setAddressList(data);
                setHasLoaded(true);
            } catch(err){
                console.log(err);
            };
        };
        fetchAddressList();
        console.log(user_id);
    }, [user_id]);

    return (
        <div>
            {hasLoaded ? (<>
                {addressList.results.length ? (<>
                    <InfiniteScroll
                    children={addressList.results.map((address) => (
                        <Address key={address.address_id} {...address} setAddressList={setAddressList} />
                    ))}
                    dataLength={addressList.results.length}
                    loader={<h1>loading...</h1>}
                    hasMore={!!addressList.next}
                    next={() => fetchMoreData(addressList, setAddressList)}
                    />
                </>) : (null)}
            </>) : (<h1>loading...</h1>)}
        </div>
    );
};

export default AddressList;
