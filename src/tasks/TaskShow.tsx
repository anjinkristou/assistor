import * as React from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceField,
    ReferenceManyField,
    useShowContext,
    FunctionField,
} from 'react-admin';
import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


import { TaskAside } from './TaskAside';
import { LogoField } from '../companies/LogoField';
import { NotesIterator } from '../notes';
import { Sale, Task } from '../types';

export const TaskShow = (props: ShowProps) => (
    <ShowBase {...props}>
        <TaskShowContent />
    </ShowBase>
);

const TaskShowContent = () => {
    const { record, loaded } = useShowContext<Task>();
    if (!loaded || !record) return null;
    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex">
                            <Avatar >
                                <AssignmentTurnedInIcon />
                            </Avatar>
                            <Box ml={2} flex="1">
                                <Typography variant="h5">
                                    {record.text}
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
