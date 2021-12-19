import * as React from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceField,
    ReferenceManyField,
    useShowContext,
    SelectField,
    Pagination,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import { Avatar } from './Avatar';
import { ProductCategoryAside } from './ProductCategoryAside';
import { LogoField } from '../companies/LogoField';
import { NotesIterator } from '../notes';
import { ProductCategory } from '../types';
import { ProductGridList } from '../products/ProductGridList';

export const ProductCategoryShow = (props: ShowProps) => (
    <ShowBase {...props}>
        <ProductCategoryShowContent />
    </ShowBase>
);

const ProductCategoryShowContent = () => {
    const { record, loaded } = useShowContext<ProductCategory>();
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
                            </Box>
                        </Box>
                        <Box mt={2} p={1}>
                            <ReferenceManyField
                                reference="products"
                                target="category_id"
                                label="Products"
                                pagination={<Pagination rowsPerPageOptions={[15, 25, 50, 100]} />}
                                perPage={25}
                            >
                                <ProductGridList />
                            </ReferenceManyField>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <ProductCategoryAside record={record} />
        </Box>
    );
};
