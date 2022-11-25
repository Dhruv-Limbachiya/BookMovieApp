import React from "react";
import './Header.css';
import AppLogo from '../../assets/logo.svg';
import { Button } from "@material-ui/core";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TextField from '@mui/material/TextField';
import Register from '../modal/register/Register'
import Login from "../modal/Login";



const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1.5px solid #d3d3d3',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};

const Header = () => {

    const isLoggedIn = sessionStorage.getItem('access_token')

    // state to manage modal
    const [open, setOpen] = React.useState(false);
    // functions to manage open/close of modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [tabValue, setTabValue] = React.useState('1'); // state to handle tab values
    const onTabChange = (event, newValue) => { // event handler for tab selection
        setTabValue(newValue);
    };

    let headerButton;

    if (isLoggedIn) {
        headerButton = <Button variant='contained'>Logout</Button>
    } else {
        headerButton = <Button variant='contained'>Login</Button>
    }

    function LoginRegisterModal(){
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalBoxStyle}>
                    <TabContext value={tabValue}>
                        <div className='tab-list-container'>
                            <TabList onChange={onTabChange} aria-label="lab API tabs example">
                                <Tab label="Login" value="1" />
                                <Tab label="Register" value="2" />
                            </TabList>
                        </div>
                        <TabPanel value="1"><Login/></TabPanel>
                        <TabPanel value="2"><Register baseUrl={props.baseUrl}/></TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        )
    }

    return (
        <div className="header">
            <div>
                <img src={AppLogo} className='app-logo rotate-anim' />
            </div>d
            <div>
                <Button variant='contained' color='primary' onClick={handleOpen} style={{ marginRight: "10px" }}>Book Show</Button>
                {headerButton}
            </div>
            <LoginRegisterModal/>
        </div >
    )
}

export default Header;