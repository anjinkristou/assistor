import * as React from 'react';
import { forwardRef, memo } from 'react';
import { useLocale, useSetLocale } from 'react-admin';
import { MenuItem, ListItemIcon, MenuItemProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Language from '@material-ui/icons/Language';

const useStyles = makeStyles(theme => ({
    menuItem: {
        color: theme.palette.text.secondary,
    },
    icon: { minWidth: theme.spacing(5) },
}));

const SwitchLanguage = forwardRef(({onClick, ...props}: MenuItemProps, ref: any) => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    return (
        <MenuItem
            ref={ref}
            className={classes.menuItem}
            onClick={e => {
                setLocale(locale === 'en' ? 'ja' : 'en');
                if(onClick) onClick(e);
            }}
        >
            <ListItemIcon className={classes.icon}>
                <Language />
            </ListItemIcon>
            Switch Language
        </MenuItem>
    );
});

export default SwitchLanguage;