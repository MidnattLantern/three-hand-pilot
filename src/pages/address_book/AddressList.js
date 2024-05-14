import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Address from "./Address";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddressList = () => {
    const { address_id, user_id, } = useParams();
    const [addressList, setAddressList] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        const fetchAddressList = async () => {
            try {
                const { data } = await axiosReq.get(`/address_book/?owner__userauthentication=${user_id}`);
                setAddressList(data);
                setHasLoaded(true);
            } catch(err){
                console.log(err);
            }
        };
        fetchAddressList();
    }, [pathname]);

    return (
        <div>
            <p>user_id: {user_id}</p>
            {hasLoaded ? (<>

                <p>found: {addressList.results.length}</p>
                {addressList.results.length ? (<>
                    <InfiniteScroll
                    children={addressList.results.map((address) => (
                        <div>
                            <Address key={address.address_id} {...address} setAddressList={setAddressList} />
                        </div>
                    ))}
                    dataLength={addressList.results.length}
                    loader={<p>loading...</p>}
                    hasMore={!!addressList.next}
                    next={() => fetchMoreData(addressList, setAddressList)}
                    />
                </>) : (<>
                <p>No results</p>
                </>)}

            </>) : (<>
            <p>Loading</p>
            </>)}
        </div>
    );
};

export default AddressList;
