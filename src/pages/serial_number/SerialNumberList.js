import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SerialNumber from "./SerialNumber";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";

const SerialNumberList = () => {
    const { user_id } = useParams();
    const [serialNumberList, setSerialNumberList] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchSerialNumberList = async () => {
            try {
                const {data} = await axiosReq.get(`/serial_number/?owner__userauthentication=${user_id}`);
                setSerialNumberList(data);
                setHasLoaded(true);
            } catch(err) {
                console.log(err)
            };
        };
        fetchSerialNumberList();
    }, [user_id]);

    return (
        <div>
            {hasLoaded ? (<>
            {serialNumberList.results.length ? (<>
               <InfiniteScroll
            children={serialNumberList.results.map((serialNumber) => (
                <SerialNumber key={serialNumber.serial_number_id} {...serialNumber} setSerialNumberList={setSerialNumberList} serialNumberList/>
            ))}
            dataLength={serialNumberList.results.length}
            loader={<h1>loading...</h1>}
            hasMore={!!serialNumberList.next}
            next={() => fetchMoreData(serialNumberList, setSerialNumberList)}
            />
            </>) : (null)}
            </>) : (<h1>loading...</h1>)}
        </div>
    );
};

export default SerialNumberList;
