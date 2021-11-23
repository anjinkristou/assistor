import * as React from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceField,
    ReferenceManyField,
    useShowContext,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import { TaskAside } from './TaskAside';
import { LogoField } from '../companies/LogoField';
import { NotesIterator } from '../notes';
import { Task } from '../types';

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
                            <Box ml={2} flex="1">
                                <Typography variant="h5">
                                    {record.first_name} {record.last_name}
                                </Typography>
                                <Typography variant="body2">
                                    {record.title} at{' '}
                                    <ReferenceField
                                        source="company_id"
                                        reference="companies"
                                        link="show"
                                    >
                                        <TextField source="name" />
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
