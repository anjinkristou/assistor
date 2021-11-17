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
import { 
    Box, 
    Typography, 
    Divider, 
    List, 
    ListItem,
    Link,
 } from '@material-ui/core';

import { Sale } from '../types';

export const ProductFamilyAside = ({ record, link = 'edit' }: any) => (
    <Box ml={4} width={250} minWidth={250}>
        <Box textAlign="center" mb={2}>
            {link === 'edit' ? (
                <EditButton
                    basePath="/productfamilies"
                    record={record}
                    label="Edit Family"
                />
            ) : (
                <ShowButton
                    basePath="/productfamilies"
                    record={record}
                    label="Show Product Family"
                />
            )}
        </Box>

        <Typography variant="subtitle2">Family info</Typography>
        <Divider />

        <Box mt={2}>
            Website: <Link href={record.website} target="_blank" rel="noreferrer">{record.website}</Link>
        </Box>
        
    </Box>
);
