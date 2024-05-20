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
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to={`/address/${currentAuthentication?.user_authentication_id}/_/_`}>Address</NavLink>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to={`/product/${currentAuthentication?.user_authentication_id}/_/_`}>Product</NavLink>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to={`/serial_number/${currentAuthentication?.user_authentication_id}/_/_`}>S.N.</NavLink>
        <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/signout">Sign out</NavLink>
    </>

    return ( <>
        <Nav>
            <NavLink className={styles.NavBarButton} exact activeClassName={styles.Active} to="/"><i className="fas fa-home" /> Home</NavLink>
            {currentAuthentication ? authenticatedOptions : nonAuthenticatedOptions}
        </Nav>
        </> )
};

export default NavBar;
