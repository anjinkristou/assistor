import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardContent, 
    Theme, 
    makeStyles,
    Avatar,
    Grid,
    Link,
} from '@material-ui/core';
import {
    Notification,
} from 'react-admin';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MuiThemeProvider } from '@material-ui/core/styles';
import classnames from 'classnames';

import RegisterForm from './RegisterForm';

const useStyles = makeStyles(
    (theme) => ({
        main: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            height: '1px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
                'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
        },
        card: {
            minWidth: 300,
            marginTop: '6em',
        },
        avatar: {
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
        },
        icon: {
            backgroundColor: theme.palette.secondary[500],
        },
    }),
    { name: 'Register' }
);

const RegisterPage = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Card className={classes.card}>
                <div className={classes.avatar}>
                    <Avatar className={classes.icon}>
                        <ExitToAppIcon />
                    </Avatar>
                </div>
                {children}
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link href="/" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Card>
            <Notification />
        </div>
    );
}

RegisterPage.propTypes = {
    children: PropTypes.node,
};

RegisterPage.defaultProps = {
    children: <RegisterForm />,
};

export default RegisterPage;