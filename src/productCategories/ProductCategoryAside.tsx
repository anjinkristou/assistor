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

import { ProductCategory, Sale } from '../types';
import { CollapsibleAside } from '../components/CollapsibleAside';

export const ProductCategoryAside = ({
    record,
    link = 'edit',
}: {
    record?: ProductCategory;
    link?: string;
}) => {
    if (!record) return null;

    return (
        <CollapsibleAside record={record} link={link} basePath="/productCategories">
            <AsideContent />
        </CollapsibleAside>
    );
};

const AsideContent = ({ 
    record 
}: { 
    record?: ProductCategory;
}) => 
    record ? (
        <>
            <Typography variant="subtitle2">Category info</Typography>
            <Divider />

            {record.website && (
                <Box mt={1}>
                    Website: <Link href={record.website} target="_blank" rel="noreferrer">Link</Link>
                </Box>
            )}
        </>
    ) : null;