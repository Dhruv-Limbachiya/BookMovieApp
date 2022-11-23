import React from "react";
import './Header.css';
import logo from '../../assets/logo.svg'
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    let button;

    if (isLoggedIn) {
        button = <Button variant='contained' className='btn'>Logout</Button>
    } else {
        button = <Button variant='contained' className='btn'>Login</Button>
    }

    return (
        <div className="header">
            <img className="app-logo rotate" src={logo} /> 
            {button} &nbsp; &nbsp;
            <Button className='btn' variant='contained' color='primary'>Book Show</Button>
        </div>
    )
}


export default Header;