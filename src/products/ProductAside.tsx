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
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

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
                    <EditButton
                        basePath="/products"
                        record={record}
                        label="Edit Product"
                    />
                ) : (
                    <ShowButton
                        basePath="/products"
                        record={record}
                        label="Show Product"
                    />
                )}
            </Box>

            <Typography variant="subtitle2">Product info</Typography>
            <Divider />

            <Box mt={1} display="flex" gridGap={2}>
                Company: 
                <ReferenceField
                    record={record}
                    source="company_id"
                    reference="companies"
                    link="show"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Box>

            <Box mt={1} display="flex" gridGap={2}>
                Family: 
                <ReferenceField
                    record={record}
                    source="family_id"
                    reference="productFamilies"
                    link="show"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Box>

            <Box mt={1}>
                Code: <TextField source="code" record={record} />
            </Box>
            {record.website && (
                <Box mt={1}>
                    Website: <Link href={record.website} target="_blank" rel="noreferrer">Link</Link>
                </Box>
            )}

            <Box mt={3}>
                <Typography variant="subtitle2">Description</Typography>
                <Divider />

                <Box mt={1}>
                    <TextField source="description" />
                </Box>

            </Box>
        </Box>
    ) : null;
