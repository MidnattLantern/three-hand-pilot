import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import styles from "../../styles/PilotPost.module.css"
import { Card } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";

const PilotPost = (props) => {
    const {
        id,
        title,
        image,
        owner,
        PilotPostDetail,
    } = props;

    const currentAuthentication = useCurrentAuthentication();
    const is_owner = currentAuthentication?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/pilot_post/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/pilot_post/${id}`);
            history.push('/pilot_post/list');
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className={styles.PilotPostMainLand}>
                <p className={styles.Name}>{title}</p>
                <Card.Img src={image} className={styles.Image}/>
            </div>

            {is_owner && PilotPostDetail ? (<>
                <div className={styles.EditDeleteDiv}>
                    <button className={styles.EditButton} onClick={handleEdit}>Edit</button>
                    <button className={styles.DeleteButton} onClick={handleDelete}>Delete</button>
                </div>
            </>) : (<>
                <Link className={styles.PilotPostLinkText} to={`/pilot_post/detail/${id}`}>
                    Details <i className="fa-solid fa-arrow-right"/>
                </Link>
            </>)}
        </div>
    )
};

export default PilotPost;
