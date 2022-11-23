import React from "react";
import './Header.css';
import AppLogo from '../../assets/logo.svg';
import { Button } from "@material-ui/core";

const Header = () => {

    const isLoggedIn = sessionStorage.getItem('access_token')

    let headerButton;

    if (isLoggedIn) {
        headerButton = <Button variant='contained'>Logout</Button>
    } else {
        headerButton = <Button variant='contained'>Login</Button>
    }

    return (
        <div className="header">
            <div>
                <img src={AppLogo} className='app-logo rotate-anim' />
            </div>
            <div>
                {headerButton}
            </div>
        </div >
    )
}

export default Header;