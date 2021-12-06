import * as React from 'react';
import { useState, FormEvent } from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceField,
    ReferenceManyField,
    Identifier,
    useShowContext,
    FunctionField, 
    Button, 
    useUpdate,
    useRefresh,
    useNotify
} from 'react-admin';
import { 
    Avatar, 
    Box, 
    Card, 
    CardContent, 
    Chip, 
    Typography,
} from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DoneIcon from '@material-ui/icons/Done';

import { TaskAside } from './TaskAside';
import { LogoField } from '../companies/LogoField';
import { NotesIterator } from '../notes';
import { Sale, Task } from '../types';
import { TaskChip } from './TaskChip';

const doneStatus = 'done';

export const TaskShow = (props: ShowProps) => (
    <ShowBase {...props}>
        <TaskShowContent />
    </ShowBase>
);

const TaskShowContent = () => {
    const { record, loaded } = useShowContext<Task>();
    const [update] = useUpdate();
    const refresh = useRefresh();
    const notify = useNotify();

    if (!loaded || !record) return null;

    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="flex-start">
                            <Avatar >
                                <AssignmentTurnedInIcon />
                            </Avatar>
                            <Box ml={2} flex="1">
                                <Typography variant="h5">
                                    {record.text} {' '}
                                    <TaskChip record={record} />
                                </Typography>
                                <Typography variant="body2">
                                <Typography component="span" variant="body2" color="textSecondary">
                                        Assigned to
                                    </Typography>{' '}
                                    <ReferenceField
                                        record={record}
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
                                </Typography>
                            </Box>
                            {
                                record.status != doneStatus && 
                                <DoneButton record={record} />
                            }
                            <Box>
                                <ReferenceField
                                    source="company_id"
                                    reference="companies"
                                    link="show"
                                >
                                    <LogoField />
                                </ReferenceField>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <TaskAside record={record} />
        </Box>
    );
};


const DoneButton = ({
    record,
}: {
    record: Task;
}) =>{
    const [update] = useUpdate();
    const refresh = useRefresh();
    const notify = useNotify();

    const handleDone = (event: any) => {
        event.preventDefault();
        update(
            'tasks',
            ((record && record.id) as unknown) as Identifier,
            {
                status: doneStatus,
            },
            record, {
                onSuccess: () => {
                    notify('Task is marked done', 'info');
                    refresh();
                },
            },
        );
        return false;
    };
    return (
        <Button
            label="Done"
            variant="outlined"
            onClick={handleDone}
        >
            <DoneIcon />
        </Button>
    );
}