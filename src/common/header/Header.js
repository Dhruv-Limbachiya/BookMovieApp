import React from "react";
import './Header.css';
import AppLogo from '../../assets/logo.svg';

const Header = () => {

    return (
        <div className="header">
            <div>
                <img src={AppLogo} className='app-logo' />
            </div>
            <div>
                <button>Login</button>
                <button>Logout</button>
            </div>
        </div >
    )
}

export default Header;