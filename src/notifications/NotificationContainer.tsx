import * as React from 'react';


import { 
    Notification, 
    NotificationProps,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

const NotificationContainer = (props: any) => {
    const classes = useStyles();
    return (
        <Notification {...props} autoHideDuration={5000} />
    )
}

export default NotificationContainer;