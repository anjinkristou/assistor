import * as React from 'react';
import {
    TextField,
    ReferenceField,
    SelectField,
} from 'react-admin';
import { 
    Box, 
    Typography, 
    Divider,
    Link,
 } from '@material-ui/core';

import { ProductFamily, Sale } from '../types';
import { CollapsibleAside } from '../components/CollapsibleAside';
import { categories } from './categories';

export const ProductFamilyAside = ({
    record,
    link = 'edit',
}: {
    record?: ProductFamily;
    link?: string;
}) => {
    if (!record) return null;

    return (
        <CollapsibleAside record={record} link={link} basePath="/productFamilies">
            <AsideContent />
        </CollapsibleAside>
    );
};

const AsideContent = ({ 
    record 
}: { 
    record?: ProductFamily;
}) => 
    record ? (
        <>
            <Typography variant="subtitle2">Family info</Typography>
            <Divider />
            <Box mt={1} display="flex" gridGap={2}>
                <Typography>Category:</Typography>
                <SelectField
                    source="category"
                    choices={categories}
                />
            </Box>

            {record.website && (
                <Box mt={1}>
                    Website: <Link href={record.website} target="_blank" rel="noreferrer">Link</Link>
                </Box>
            )}
        </>
    ) : null;