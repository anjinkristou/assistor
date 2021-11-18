import * as React from 'react';
import {
    TextField,
    DateField,
    FunctionField,
    ReferenceField,
    EditButton,
    DeleteButton,
    ShowButton,
} from 'react-admin';
import { Box, Typography, Divider, Link } from '@material-ui/core';

import { Product, Sale } from '../types';

export const ProductAside = ({
    record,
    link = 'edit',
}: {
    record?: Product;
    link?: string;
}) =>
    record ? (
        <Box ml={4} width={250} minWidth={250}>
            <Box textAlign="center" mb={2}>
                {link === 'edit' ? (
                    <Box display="flex" justifyContent="space-evenly">
                        <EditButton
                            basePath="/companies"
                            record={record}
                            label="Edit"
                        />
                        <DeleteButton
                            basePath="/companies"
                            record={record}
                            label="Delete"
                        />
                    </Box>
                ) : (
                    <ShowButton
                        basePath="/companies"
                        record={record}
                        label="Show Product"
                    />
                )}
            </Box>

            <Typography variant="subtitle2">Product info</Typography>
            <Divider />

        </Box>
    ) : null;
