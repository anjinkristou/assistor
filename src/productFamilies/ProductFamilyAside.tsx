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
    ListButton,
} from 'react-admin';
import { 
    Box, 
    Typography, 
    Divider, 
    List, 
    ListItem,
    Link,
 } from '@material-ui/core';

import { ProductFamily, Sale } from '../types';

export const ProductFamilyAside = ({
    record,
    link = 'edit',
}: {
    record?: ProductFamily;
    link?: string;
}) =>
    record ? (
        <Box ml={4} width={250} minWidth={250}>
            <Box textAlign="center" mb={2}>
                {link === 'edit' ? (
                    <Box>
                        <EditButton
                            basePath="/productfamilies"
                            record={record}
                        />
                        <ListButton 
                            basePath="/productFamilies"
                        />
                    </Box>
                ) : (
                    <ShowButton
                        basePath="/productfamilies"
                        record={record}
                    />
                )}
            </Box>

            <Typography variant="subtitle2">Family info</Typography>
            <Divider />
            <Box mt={1} display="flex" gridGap={2}>
                <Typography>Category:</Typography>
                <ReferenceField
                    record={record}
                    source="category_id"
                    reference="familyCategories"
                    link="show"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Box>

            {record.website && (
                <Box mt={1}>
                    Website: <Link href={record.website} target="_blank" rel="noreferrer">Link</Link>
                </Box>
            )}
            
        </Box>
) : null;
