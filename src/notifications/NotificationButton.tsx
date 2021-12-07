import * as React from 'react';
import { useState } from 'react';

import {
    Avatar,
    Badge, 
    IconButton, 
    ListItem, 
    ListItemAvatar, 
    ListItemSecondaryAction, 
    ListItemText, 
    Menu,
    MenuItem,
    PopoverOrigin,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { 
    useGetList, 
    useRedirect, 
    ReferenceField,
    FunctionField,
    useGetIdentity,
} from 'react-admin';
import { red } from '@material-ui/core/colors';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import { Sale, Task } from '../types';
import { formatDistance } from 'date-fns';
import { TaskStatus } from '../tasks/TaskStatus';

const useStyles = makeStyles(theme => ({

}));


const AnchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
};

const TransformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const NotificationButton = (props: any) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const { identity } = useGetIdentity();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const now = Date.now();

    const { data, ids, loaded } = useGetList<Task>(
        'tasks',
        { page: 1, perPage: 1000 },
        { field: 'due_date', order: 'ASC' },
        { status_dif: 'done', sales_id: identity && identity?.id,},
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleNotificationClick = (id: any) => {
        setAnchorEl(null);

        redirect(`/tasks/${id}/show`);
    }

    const open = Boolean(anchorEl);

    const hasNotification = ids.length > 0;
      
    return (
        <div {...props}>
            <IconButton 
                aria-owns={open ? 'notification-menu' : ''}
                aria-haspopup={true}
                color="inherit"
                onClick={handleClick}
            >
                <Badge 
                    badgeContent={ids.length} 
                    color="error"
                > 
                    { hasNotification
                        ? <NotificationsIcon />
                        : <NotificationsNoneIcon />
                    }
                </Badge>
            </IconButton>
            { hasNotification &&
                <Menu 
                id="notification-menu"
                disableScrollLock
                anchorEl={anchorEl}
                anchorOrigin={AnchorOrigin}
                transformOrigin={TransformOrigin}
                getContentAnchorEl={null}
                open={open}
                onClose={handleClose}
                >
                    {ids.map(id => {
                        const task = data[id];
                        const taskOverdue = task.due_date < (new Date()).toISOString();
                        return (
                            <MenuItem onClick={() => handleNotificationClick(id)}>
                                <ListItemAvatar>
                                <Avatar
                                    style={taskOverdue ? { backgroundColor: red[400] } : undefined}
                                >
                                    {taskOverdue
                                    ? <NotificationsActiveIcon />
                                    : <AssignmentTurnedInIcon />
                                    }
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <>
                                        {task.text}
                                        </>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="textSecondary">
                                                due in{' '}
                                                {formatDistance(
                                                    new Date(task.due_date),
                                                    now
                                                    )}
                                            </Typography>
                                        </>
                                    }
                                    />
                            </MenuItem>
                        );
                    })}
                </Menu>
             }
        </div>
    )
}

export default NotificationButton;