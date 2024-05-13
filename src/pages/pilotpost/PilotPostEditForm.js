import React, { useEffect, useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Image } from "react-bootstrap";
import styles from "../../styles/PilotPostEditForm.module.css";

const PilotPostEditForm = () => {
    const [errors, setErrors] = useState({});
    const [pilotPostData, setPilotPostData] = useState({
        title: "",
        image: "",
    });
    const { title, image, } = pilotPostData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/pilot_post/${id}`);
                const {title, image, is_owner} = data

                is_owner ? setPilotPostData({ title, image }) : history.push("/pilot_post/list");
            } catch(err) {
                console.log(err)
            }
        }

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setPilotPostData({
            ...pilotPostData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPilotPostData({
                ...pilotPostData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        console.log("click button")
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/pilot_post/${id}`, formData);
            history.push(`/pilot_post/detail/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return(
        <div className={styles.PilotPostCreateMainland}>
            <h1>Pilot post edit form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Title"
                    />

                <br/>
                <Form.File
                className={styles.FileUpload}
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                />
                <p>Less than 1MB, 1000px wide and tall</p>
                <Image className={styles.Image} src={image}/>

                </Form.Group>
                {errors?.title?.map((message, idx) => (
                    <p key={idx}>{message}</p>
                ))}
                <button className={styles.Button} type="submit">Save</button>
            </Form>
        </div>
    )
};

export default PilotPostEditForm;
