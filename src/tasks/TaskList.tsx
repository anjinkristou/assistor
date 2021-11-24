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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { ImportButton } from "react-admin-import-csv";

import { Status } from '../misc/Status';
import { TagsList } from '../tags/TagsList';
import { TaskListFilter } from './TaskListFilter';
import { Task } from '../types';
import MarkDoneButton from './MarkDoneButton';

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
                const Task = data[id];
                return (
                    <ListItem
                        button
                        key={id}
                        component={Link}
                        to={`/Tasks/${id}`}
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
                            <Avatar>
                                <AssignmentTurnedInIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={Task.text}
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="body2" color="textSecondary">
                                due in{' '}
                                {formatDistance(
                                    new Date(Task.due_date),
                                    now
                                )}
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
            <SortButton fields={['due_date']} />
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
            filterDefaultValues={{ sales_id: identity?.id }}
            sort={{ field: 'due_date', order: 'DESC' }}
        >
            <TaskListContent />
        </RaList>
    ) : null;
};
