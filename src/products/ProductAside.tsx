import * as React from 'react';
import {
    TextField,
    ReferenceField,
} from 'react-admin';
import { Box, Typography, Divider, Link } from '@material-ui/core';

import { Product, Sale } from '../types';
import { CollapsibleAside } from '../components/CollapsibleAside';

export const ProductAside = ({
    record,
    link = 'edit',
}: {
    record?: Product;
    link?: string;
}) =>{
    if (!record) return null;

    return (
        <CollapsibleAside record={record} link={link} basePath="/products">
            <AsideContent record={record} />
        </CollapsibleAside>
    );
};

const AsideContent = ({ 
    record 
}: { 
    record?: Product;
}) => 
    record ? (
        <>
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
        </>
    ) : null;