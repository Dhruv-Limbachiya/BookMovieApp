import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Modal(){

     // state to manage modal
     const [open, setOpen] = React.useState(false);

     // functions to manage open/close of modal
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Login" value="1" />
                            <Tab label="Register" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Login</TabPanel>
                    <TabPanel value="2">Register</TabPanel>
                </TabContext>
            </Box>
        </Modal>
    )
}
