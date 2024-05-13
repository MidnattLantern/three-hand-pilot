import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import PilotPost from "./PilotPost";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../../styles/PilotPostDetail.module.css";

const PilotPostDetail = () => {
    const { id } = useParams();
    const [pilotPostDetail, setPilotPostDetail] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: pilotPost}] = await Promise.all([
                    axiosReq.get(`/pilot_post/${id}`)
                ]);
                setPilotPostDetail({ results: [pilotPost]})
            } catch(err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    return (
        <div className={styles.PilotPostDetailDiv}>
            <h1>Pilot Post Detail</h1>
            <Link className={styles.CreatePilotPostButton} to="/pilot_post/list"><i className="fa-solid fa-arrow-left"/> Go back</Link>

            <div className={styles.PilotPostDetailCard}>
                <PilotPost {...pilotPostDetail.results[0]} setPilotPostDetail={setPilotPostDetail} PilotPostDetail/>
            </div>

            {id === "abc" ? (<>
                <p>id is ABC</p>
            </>) : (<>
                <p>id is not "abc"</p>
            </>)}
        </div>
    )
};

export default PilotPostDetail;
