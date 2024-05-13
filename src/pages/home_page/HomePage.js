import React from "react";
import { useCurrentAuthentication } from "../../contexts/CurrentAuthenticationContext";


const HomePage = () => {
    const currentAuthentication = useCurrentAuthentication();

    return (
        <div>
            <h1>Home page</h1>
            <p>Authenticated as: {currentAuthentication?.username}</p>
        </div>
    )
};

export default HomePage;
