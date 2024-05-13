import React from "react";
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrentAuthentication } from "../contexts/CurrentAuthenticationContext";

const NavBar = () => {
    const currentAuthentication = useCurrentAuthentication();

    const nonAuthenticatedOptions = <>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signin">Sign in</NavLink>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signup">Sign up</NavLink>
    </>

    const authenticatedOptions = <>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signout">Sign out</NavLink>
    </>

    return ( <>
        <Nav>
            <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/"><i className="fas fa-home" /> Home</NavLink>
            <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/pilot_post/list">P-Post list</NavLink>
            <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/address/list/_">Address</NavLink>
            {currentAuthentication ? authenticatedOptions : nonAuthenticatedOptions}
        </Nav>
        </> )
};

export default NavBar;
