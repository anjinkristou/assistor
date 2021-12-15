import React, { useState } from 'react';
import { forwardRef, memo } from 'react';
import { useDataProvider, useLocale, useNotify, useSetLocale } from 'react-admin';
import { MenuItem, ListItemIcon, MenuItemProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Language from '@material-ui/icons/Language';
import PinVerificationDialog from '../linkedin/PinVerificationDialog';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles(theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    icon: { minWidth: theme.spacing(5) },
}));

const LinkedinLogin = forwardRef(({onClick, ...props}: MenuItemProps, ref: any) => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    const notify = useNotify();
    const classes = useStyles();
    const dataProvider = useDataProvider();
    const [open, setOpen] = React.useState(false);

    const login = async () => {
        try {
            await dataProvider.loginLinkedin();
            notify('Linkedin login successfull', { type: 'info' });
        } catch (error: any) {
            const message = error.message;
            notify('Linkedin login failed', { type: 'warning' });
            setOpen(true);
        }
    }

    return (
        <>
        <MenuItem
            ref={ref}
            className={classes.menuItem}
            onClick={e => {
                login();
                if(onClick) onClick(e);
            }}
        >
            <ListItemIcon className={classes.icon}>
                <LinkedInIcon />
            </ListItemIcon>
            LinkedIn Login
        </MenuItem>
        <PinVerificationDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
});

export default LinkedinLogin;