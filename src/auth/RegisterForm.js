import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import {
    Button,
    CardActions,
    CircularProgress,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    CardContent,
    Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, useNotify, useLogin, useSafeSetState, useRedirect } from 'ra-core';
import axios from 'axios';


const baseURL = "/auth";


const useStyles = makeStyles(
    (theme) => ({
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginTop: '1em',
        },
        button: {
            width: '100%',
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
    { name: 'RegisterForm' }
);

const Input = ({
    meta: { touched, error }, // eslint-disable-line react/prop-types
    input: inputProps, // eslint-disable-line react/prop-types
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

const RegisterForm = ({ redirectTo }) => {
    const [loading, setLoading] = useSafeSetState(false);
    const translate = useTranslate();
    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles();

    const validate = ({ 
        firstname,
        lastname,
        email,
        username, 
        password, 
        confirm 
    }) => {
        const errors = { 
            firstname: !firstname ? translate('ra.validation.required') : undefined, 
            lastname: !lastname ? translate('ra.validation.required') : undefined, 
            email: !email ? translate('ra.validation.required') : undefined, 
            username: !username ? translate('ra.validation.required') : undefined, 
            password: !password ? translate('ra.validation.required') : undefined, 
            confirm: password !== confirm ? 'Confirmation should match password': undefined
        };
        return errors;
    };

    const submit = ({ 
        firstname,
        lastname,
        email,
        username, 
        password, 
        confirm 
    }) => {
        setLoading(true);
        axios.post(`${baseURL}/register`, { 
                firstname,
                lastname,
                email,
                username, 
                password
            })
            .then(response => {
                setLoading(false);
                const { message } = response.data;
                
                login({ username, password }, redirectTo)
            })
            .catch(error => {
                setLoading(false);
                const response = error.response;
                if (response.status == 401) {
                    const { message } = response.data;
                    notify('Changes saved`', 'warning');
                }
                throw new Error(error);
            });
    };

    return (
        <Form
            onSubmit={submit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <CardContent>
                        <Container maxWidth="xs">
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        id="firstname"
                                        name="firstname"
                                        component={Input}
                                        label="Firstname"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        id="lastname"
                                        name="lastname"
                                        component={Input}
                                        label="Lastname"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        id="email"
                                        name="email"
                                        component={Input}
                                        label="Email Address"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        id="username"
                                        name="username"
                                        component={Input}
                                        label={translate('ra.auth.username')}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.input}>
                                    <Field
                                        id="password"
                                        name="password"
                                        component={Input}
                                        label={translate('ra.auth.password')}
                                        type="password"
                                        disabled={loading}
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.input}>
                                    <Field
                                        id="confirm"
                                        name="confirm"
                                        component={Input}
                                        label="Confirm Password"
                                        type="password"
                                        disabled={loading}
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            className={classes.button}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress
                                    className={classes.icon}
                                    size={18}
                                    thickness={2}
                                />
                            )}
                            Register
                        </Button>
                    </CardActions>
                </form>
            )}
        />
    );
};

RegisterForm.propTypes = {
    redirectTo: PropTypes.string,
};

export default RegisterForm;