import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, UserMenu, MenuItemLink, useTranslate } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

import Logo from './Logo';
import NotificationButton from '../notifications/NotificationButton';
import GlobalSearch from './GlobalSearch';
import SwitchLanguage from './SwitchLanguage';
import LinkedinLogin from './LinkedinLogin';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText="Configuration"
            leftIcon={<SettingsIcon />}
            onClick={props.onClick}
            sidebarIsOpen
        />
    );
});

const CustomUserMenu = (props: any) => (
    <UserMenu {...props}>
        <ConfigurationMenu />
        <LinkedinLogin />
        <SwitchLanguage />
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    const classes = useStyles();
    return (
        <AppBar 
            {...props} 
            elevation={1} 
            userMenu={<CustomUserMenu />
        }>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Logo />
            <span className={classes.spacer} />
            <GlobalSearch />
            <NotificationButton />
        </AppBar>
    );
};

export default CustomAppBar;
