import React, { useState } from "react";
import './Login.css'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

const Login = () => {

    const onLoginButtonClick = () => {
        username === '' ? setReqUsername('dispBlock') : setReqUsername("dispNone");
        password === '' ? setReqPassword('dispBlock') : setReqPassword("dispNone");
        return;
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [reqUsername, setReqUsername] = useState('dispNone')
    const [reqPassword, setReqPassword] = useState('dispNone')


    const onUsernameChanged = (e) => {
        setUsername(e.target.value.split(","));
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value.split(","));
    }

    return (
        <div className="container">
            <div>
                <FormControl required className="formControl">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" value={username} onChange={onUsernameChanged} />
                    <FormHelperText className={reqUsername}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>


                <br /> <br />
                <FormControl required className="formControl">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" value={password} onChange={onPasswordChange} />
                    <FormHelperText className={reqPassword}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>
            </div>

            <br /> <br />

            <div className="btn-holder">
                <Button variant="contained" color='primary' onClick={onLoginButtonClick}>Login</Button>
            </div>
        </div>
    )
}

export default Login;