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

import { Avatar } from './Avatar';
import { ProductFamilyAside } from './ProductFamilyAside';
import { LogoField } from '../companies/LogoField';
import { NotesIterator } from '../notes';
import { ProductFamily } from '../types';
import { ProductGridList } from '../products/ProductGridList';

export const ProductFamilyShow = (props: ShowProps) => (
    <ShowBase {...props}>
        <ProductFamilyShowContent />
    </ShowBase>
);

const ProductFamilyShowContent = () => {
    const { record, loaded } = useShowContext<ProductFamily>();
    if (!loaded || !record) return null;
    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex">
                            <Avatar record={record} />
                            <Box ml={2} flex="1">
                                <Typography variant="h5">
                                    {record.name}
                                </Typography>
                                <Typography variant="body2">
                                    {record.title} in{' '}
                                    <ReferenceField
                                        source="category_id"
                                        reference="familyCategories"
                                        link="show"
                                    >
                                        <TextField source="name" />
                                    </ReferenceField>
                                </Typography>
                            </Box>
                        </Box>
                        <Box mt={2} p={1}>
                            <ReferenceManyField
                                reference="products"
                                target="family_id"
                                label="Products"
                            >
                                <ProductGridList />
                            </ReferenceManyField>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <ProductFamilyAside record={record} />
        </Box>
    );
};
