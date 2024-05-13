import React from "react";
import { Container } from "react-bootstrap";
import styles from "../../styles/SignOutPage.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentAuthentication, useSetCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignOutPage = () => {
    useRedirect('unauthenticated');
    const currentAuthentication = useCurrentAuthentication();
    const setCurrentAuthentication = useSetCurrentAuthentication();

    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentAuthentication(null);
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Container>
                <div className={styles.AuthenticationIsland}>
                    <h1>Sign out</h1>
                    <p>{currentAuthentication?.username}</p>
                    <br/>
                    <button  className={styles.Button} onClick={handleSignOut}>Sign out</button>
                </div>
            </Container>
        </div>
    )
};

export default SignOutPage;
