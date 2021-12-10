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
import { Icon, IconButton, InputAdornment, TextField , Button, Paper} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Identifier, useGetIdentity, useGetOne, useNotify, useUpdate } from 'react-admin';
import SendIcon from '@material-ui/icons/Send';

import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const UserSettings = () => {
    const classes = useStyles();  
    const { identity, loaded } = useGetIdentity();
    // const { data, loading: userLoading, error } = useGetOne('sales', identity ? identity.id : 0, { enabled: loaded });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
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
    const notify = useNotify();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { data, loaded, error } = useGetOne(
        'sales', 
        userId, 
        { onSuccess: () => setUsername(data?.linkedin_username)}
    );
    const [update, { loading }] = useUpdate();

    if(!loaded) return <LinearProgress />

    // setUsername(data?.linkedin_username);

    const handleUpdate = () => {
        update(
            'sales',
            userId,
            { 
                linkedin_username: username,
                linkedin_password: password,
            },
            data,
            { onSuccess: () => notify('Linkedin account updated', 'info') },
        );
    }

    return (
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
            <ListItem>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    style={{ width: '100%'}}
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    Send
                </Button>
            </ListItem>
        </List>
    );
};

export default UserSettings;