import * as React from 'react';
import {
    EditBase,
    EditProps,
    TextInput,
    ReferenceInput,
    AutocompleteInput,
    BooleanInput,
    FormWithRedirect,
    Toolbar,
    useEditContext,
    SelectInput,
} from 'react-admin';
import { Card, CardContent, Divider, Box } from '@material-ui/core';
import omit from 'lodash/omit';

import { Avatar } from './Avatar';
import { ProductCategoryAside } from './ProductCategoryAside';
import { ProductCategory } from '../types';

const Spacer = () => <Box width={20} component="span" />;

const ProductCategoryEditContent = () => {
    const { record, loaded, save } = useEditContext<ProductCategory>();
    if (!loaded || !record) return null;
    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <FormWithRedirect
                    record={record}
                    redirect="show"
                    save={save}
                    render={(formProps: any) => (
                        <Card>
                            <CardContent>
                                <Box>
                                    <Box display="flex">
                                        <Box mr={2}>
                                            <Avatar record={record} />
                                        </Box>
                                        <Box flex={1}>
                                            <TextInput source="name" fullWidth />
                                            <TextInput source="website" fullWidth />
                                            <TextInput source="image" fullWidth />
                                            <TextInput 
                                                source="description"
                                                multiline
                                                rows={3} 
                                                fullWidth 
                                            />
                                        </Box>
                                        
                                    </Box>
                                </Box>
                            </CardContent>
                            <Toolbar {...formProps} />
                        </Card>
                    )}
                />
            </Box>
            <ProductCategoryAside record={record} link="show" />
        </Box>
    );
};

export const ProductCategoryEdit = (props: EditProps) => (
    <EditBase {...props}>
        <ProductCategoryEditContent />
    </EditBase>
);
