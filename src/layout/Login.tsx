import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';
import { useLocation, Link as RouterLink  } from 'react-router-dom';

import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
    Link,
    Typography,
} from '@material-ui/core';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { Notification, useTranslate, useLogin, useNotify } from 'react-admin';

import { lightTheme } from './themes';

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #313264 0%, #00023b 50%, #00023b 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        // marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
        display: 'flex',
        flexDirection: 'column',
    },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

interface FormValues {
    username?: string;
    password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();

    const handleSubmit = async (auth: FormValues) => {
        setLoading(true);
        try{
            const response = await login(auth, location.state ? location.state.nextPathname : '/');
        } catch (error: any) {
            setLoading(false);
            notify(error.message, { type: 'warning' });
        }
    };

    const validate = ({
        username,
        password,
    }: FormValues) => {
        const errors = { 
            username: !username ? translate('ra.validation.required') : undefined, 
            password: !password ? translate('ra.validation.required') : undefined,
        };
        return errors;
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar>
                            </div>
                            <div className={classes.hint}>
                                Wecome to Assistor.
                            </div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="username"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate('ra.auth.username')}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate('ra.auth.password')}
                                        type="password"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <CardActions className={classes.actions}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={25}
                                            thickness={2}
                                        />
                                    )}
                                    {translate('ra.auth.sign_in')}
                                </Button>
                                <Typography variant="body2">Or</Typography>
                                <Link
                                    color="textSecondary"
                                    component={RouterLink}
                                    to="/register"
                                    variant="body1"
                                >
                                    Register
                                </Link>
                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props: any) => (
    <ThemeProvider theme={createTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
