import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
        alignItems:"center",
        gap: theme.spacing(1)
    },
    logoIcon: {
        color: theme.palette.secondary.light,
    },
    logoText: {
        color: theme.palette.primary.light,
    }
}));

const Logo = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AccountBalanceWalletIcon className={classes.logoIcon} />
            <Typography variant="h6" className={classes.logoText} >
                Assistor
            </Typography>
        </div>
    );
};

export default Logo;
