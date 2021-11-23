import * as React from 'react';
import {
    TextField,
    EmailField,
    DateField,
    ReferenceManyField,
    EditButton,
    ShowButton,
    useListContext,
    ReferenceField,
    FunctionField,
} from 'react-admin';
import { Box, Typography, Divider, List, ListItem } from '@material-ui/core';
import { TagsListEdit } from '../tags/TagsListEdit';

import { Sale } from '../types';

export const TaskAside = ({ record, link = 'edit' }: any) => (
    <Box ml={4} width={250} minWidth={250}>
        <Box textAlign="center" mb={2}>
            {link === 'edit' ? (
                <EditButton
                    basePath="/Tasks"
                    record={record}
                    label="Edit Task"
                />
            ) : (
                <ShowButton
                    basePath="/Tasks"
                    record={record}
                    label="Show Task"
                />
            )}
        </Box>
    </Box>
);
