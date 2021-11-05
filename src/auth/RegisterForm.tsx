import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import {
    Button,
    CardActions,
    CircularProgress,
    TextField,
    Grid,
    CardContent,
    Container,
} from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
    useTranslate, 
    useNotify, 
    useLogin, 
    useSafeSetState, 
    useRedirect,
} from 'ra-core';
import axios from 'axios';


const baseURL = "/auth";


const useStyles = makeStyles((theme: Theme) => ({
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
}: {
    meta: any;
    input: any;
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

const RegisterForm = ({ redirectTo }:
    {redirectTo?: string | undefined;}) => {
    const [loading, setLoading] = useSafeSetState(false);
    const translate = useTranslate();
    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles();

    const validate = ({ 
        first_name,
        last_name,
        email,
        username, 
        password, 
        confirm 
    }: {
        first_name: string;
        last_name: string;
        email: string;
        username: string;
        password: string;
        confirm: string;

    }) => {
        const errors = { 
            first_name: !first_name ? translate('ra.validation.required') : undefined, 
            last_name: !last_name ? translate('ra.validation.required') : undefined, 
            email: !email ? translate('ra.validation.required') : undefined, 
            username: !username ? translate('ra.validation.required') : undefined, 
            password: !password ? translate('ra.validation.required') : undefined, 
            confirm: password !== confirm ? 'Confirmation should match password': undefined
        };
        return errors;
    };

    interface ResponseType {
        message: string;
    }

    const submit = async ({ 
        first_name,
        last_name,
        email,
        username, 
        password, 
        confirm 
    }: { 
        first_name: string;
        last_name: string;
        email: string;
        username: string;
        password: string;
        confirm?: string;
    }) => {
        setLoading(true);
        try{
        const response = await axios.post<ResponseType>(`${baseURL}/register`, { 
                first_name,
                last_name,
                email,
                username, 
                password
            })
        
        setLoading(false)
        login({ username, password }, redirectTo)
        } catch (error: any) {
            setLoading(false);
            const response = error.response;
            if (response.status == 401) {
                const { message } = error.response.data;
                notify(`Error:${message}`, 'warning');
                return Promise.reject(message);
            }
            return Promise.reject(error);
        }
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
                                        id="first_name"
                                        name="first_name"
                                        component={Input}
                                        label="First Name"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        id="last_name"
                                        name="last_name"
                                        component={Input}
                                        label="Last Name"
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