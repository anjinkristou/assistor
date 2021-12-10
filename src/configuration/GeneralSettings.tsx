import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { changeTheme } from './actions';
import { AppState } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const GeneralSettings = () => {
    const classes = useStyles();  
    const theme = useSelector((state: AppState) => state.theme);
    const dispatch = useDispatch();

    const handleDarkModeToggle = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch(changeTheme(checked ? 'dark': 'light'));
    };

    return (
    <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText primary="Dark mode" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleDarkModeToggle}
            checked={theme === 'dark'}
            inputProps={{ 'aria-labelledby': 'switch-list-label-dark-mode' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    );
};

export default GeneralSettings;