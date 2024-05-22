import React, { useEffect, useState } from "react";
import SerialNumber from "./SerialNumber";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
// no CSS

const SerialNumberDetail = () => {
    const { serial_number_id } = useParams();
    const [serialNumberDetail, setSerialNumberDetail] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [
                    { data: serialNumberData },
                ] = await Promise.all([
                    axiosReq.get(`/serial_number/${serial_number_id}`),
                ]);
                setSerialNumberDetail({ results: [serialNumberData] });
            } catch(err) {
                console.log(err)
            };
        };
        handleMount();
    }, [serial_number_id]);

    return (
        <div>
            <SerialNumber
            {...serialNumberDetail.results[0]}
            setSerialNumberDetail={setSerialNumberDetail}
            SerialNumberDetail/>
        </div>
    );
};

export default SerialNumberDetail;
