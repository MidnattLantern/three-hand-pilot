import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

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
            <h1>SerialNumberList view</h1>
        </div>
    );
};

export default SerialNumberList;
