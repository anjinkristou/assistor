import React, { ReactNode, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardContent, 
    Theme, 
    Avatar,
    Grid,
    Link,
} from '@material-ui/core';
import {
    Notification,
} from 'react-admin';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { lightTheme } from '../layout/themes';

import RegisterForm from './RegisterForm';

const useStyles = makeStyles((theme: Theme) => ({
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
            backgroundColor: theme.palette.secondary.main,
        },
    }),
    { name: 'Register' }
);

const Register = () => {
    const classes = useStyles();
    return (
            <div className={classes.main}>
                <Card className={classes.card}>
                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <ExitToAppIcon />
                        </Avatar>
                    </div>
                    <RegisterForm />
                </Card>
                <Notification />
            </div>
    );
}

const RegisterWithTheme = (props: any) => (
    <ThemeProvider theme={createTheme(lightTheme)}>
        <Register {...props} />
    </ThemeProvider>
);

export default RegisterWithTheme;