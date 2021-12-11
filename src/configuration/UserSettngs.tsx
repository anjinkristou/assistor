import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import { Icon, IconButton, InputAdornment, TextField , Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Identifier, useDataProvider, useGetIdentity, useGetOne, useNotify, useUpdate } from 'react-admin';
import Frame from 'react-frame-component';
import SendIcon from '@material-ui/icons/Send';

import LinearProgress from '@material-ui/core/LinearProgress';
import { ControlCameraOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    iframe: {
        width: '100%',
        minHeight: '1200px',
    },
    actionItem: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1em',
    },
    dialog: {
        minWidth: '20em',
    }
  }),
);

const UserSettings = () => {
    const classes = useStyles();  
    const { identity, loaded } = useGetIdentity();
    // const { data, loading: userLoading, error } = useGetOne('sales', identity ? identity.id : 0, { enabled: loaded });
    
    if (!loaded) return null;

    // setUsername(data?.linkedin_username);

    
    return (
    <div 
        className={classes.root}
    >
        {identity && <LinkedinSettings userId={identity.id}/>}
    </div>
    );
};

const LinkedinSettings = ({userId}: {userId: Identifier}) => {
    const classes = useStyles();  
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const [open, setOpen] = React.useState(false);
    const [htmlData, setHtmlData] = useState('');
    const [pin, setPin] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { data, loaded, error } = useGetOne(
        'sales', 
        userId, 
        { onSuccess: () => setUsername(data?.linkedin_username)}
    );
    const [update, { loading }] = useUpdate();

    const handleClose = () => setOpen(false);

    if(!loaded) return <LinearProgress />

    // setUsername(data?.linkedin_username);

    const handleUpdate = async () => {
        try {
            await update(
                'sales',
                userId,
                { 
                    linkedin_username: username,
                    linkedin_password: password,
                },
                data,
            );

            notify('Linkedin account updated', 'info');
        } catch (error: any) {
            const message = error.message;
            notify('Linkedin account failed', 'warning');
            console.log(error);
        }
        
    }

    const handleLogin = async () => {
        try {
            await dataProvider.loginLinkedin();
            notify('Linkedin login successfull', 'info');
        } catch (error: any) {
            const message = error.message;
            notify('Linkedin login failed', 'warning');
            console.log(error);
            setOpen(true);
        }
    }

    const handleSubmitPin = async () => {
        try {
            await dataProvider.verifyLoginLinkedin(pin);
            notify('Linkedin login successfull', 'info');
        } catch (error: any) {
            const message = error.message;
            notify('Linkedin login failed', 'warning');
        }
    }

    return (
        <>
        <List subheader={<ListSubheader>LinkedIn Account</ListSubheader>}>
            <ListItem>
                <TextField 
                    label="Username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" disablePointerEvents>
                                <AccountBoxIcon />
                            </InputAdornment>
                        ),
                    }}
                    style={{ width: '100%'}}
                />
            </ListItem>
            <ListItem>
                <TextField 
                    label="Password" 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" disablePointerEvents>
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    style={{ width: '100%'}}
                />
            </ListItem>
            <ListItem
                className={classes.actionItem}
            >
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    Send
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Login
                </Button>
            </ListItem>
        </List>
        <Dialog onClose={handleClose} open={open} className={classes.dialog}>
            <DialogTitle>Pin verification</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Check your email and insert the pin
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="pin"
                label="Pin"
                type="string"
                fullWidth
                value={pin}
                onChange={e => setPin(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    onClick={handleSubmitPin} 
                    color="primary" 
                    autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default UserSettings;