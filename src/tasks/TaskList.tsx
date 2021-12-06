/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Fragment } from 'react';
import {
    List as RaList,
    ListProps,
    SimpleListLoading,
    ReferenceField,
    TextField,
    useListContext,
    ExportButton,
    SortButton,
    TopToolbar,
    CreateButton,
    Pagination,
    BulkDeleteButton,
    useGetIdentity,
    BulkActionProps,
    ListActionsProps,
    FunctionField,
} from 'react-admin';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Typography,
    Avatar,
    Chip,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { ImportButton } from "react-admin-import-csv";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import { Status } from '../misc/Status';
import { TagsList } from '../tags/TagsList';
import { TaskListFilter } from './TaskListFilter';
import { Sale, Task } from '../types';
import MarkDoneButton from './MarkDoneButton';
import { TaskStatus } from './TaskStatus';

const TaskListContent = () => {
    const { data, ids, loaded, onToggleItem, selectedIds } = useListContext<
        Task
    >();
    const now = Date.now();
    if (loaded === false) {
        return <SimpleListLoading hasLeftAvatarOrIcon hasSecondaryText />;
    }

    return (
        <List>
            {ids.map(id => {
                const task = data[id];
                const taskOverdue = (task.status !== 'done') &&  (task.due_date < (new Date()).toISOString());
                return (
                    <ListItem
                        button
                        key={id}
                        component={Link}
                        to={`/Tasks/${id}/show`}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedIds.includes(id)}
                                tabIndex={-1}
                                disableRipple
                                onClick={e => {
                                    e.stopPropagation();
                                    onToggleItem(id);
                                }}
                            />
                        </ListItemIcon>
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
                                {task.text} {' '}
                                {(task.status !== 'done') && 
                                    (task.due_date < (new Date()).toISOString()) &&
                                    <NotificationsActiveIcon
                                        fontSize="small"
                                        style={{ color: red[500] }}
                                    />
                                }
                                </>
                            }
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        Assigned to
                                    </Typography>{' '}
                                    <ReferenceField
                                        record={task}
                                        source="sales_id"
                                        reference="sales"
                                    >
                                        <FunctionField<Sale>
                                            source="last_name"
                                            render={record =>
                                                record ? `${record.first_name} ${record.last_name}` : ''
                                            }
                                        />
                                    </ReferenceField>
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="body2" color="textSecondary">
                                due in{' '}
                                {formatDistance(
                                    new Date(task.due_date),
                                    now
                                )}
                                {' '}<TaskStatus status={task.status} />
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

const useActionStyles = makeStyles(theme => ({
    createButton: {
        marginLeft: theme.spacing(2),
    },
}));
const TaskListActions = (props: ListActionsProps) => {
    const classes = useActionStyles();
    return (
        <TopToolbar>
            <SortButton fields={['due_date', 'status']} />
            <ExportButton />
            <ImportButton {...props} />
            <CreateButton
                basePath="/Tasks"
                variant="contained"
                label="New Task"
                className={classes.createButton}
            />
        </TopToolbar>
    );
};

const TaskBulkActionButtons = (props: BulkActionProps) => (
    <Fragment>
        <MarkDoneButton {...props} />
        {/* default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
);

export const TaskList = (props: ListProps) => {
    const { identity } = useGetIdentity();
    return identity ? (
        <RaList
            {...props}
            actions={<TaskListActions />}
            aside={<TaskListFilter />}
            bulkActionButtons={<TaskBulkActionButtons />}
            perPage={25}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
            filterDefaultValues={{ sales_id: identity?.id, status: 'pending' }}
            sort={{ field: 'due_date', order: 'ASC' }}
        >
            <TaskListContent />
        </RaList>
    ) : null;
};
