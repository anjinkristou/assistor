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
import { ProductFamilyAside } from './ProductFamilyAside';
import { ProductFamily } from '../types';
import { productFamilyCategories } from './productFamilyCategories';

const Spacer = () => <Box width={20} component="span" />;

const ProductFamilyEditContent = () => {
    const { record, loaded, save } = useEditContext<ProductFamily>();
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
                                            <SelectInput
                                                source="category"
                                                choices={productFamilyCategories}
                                            />
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
            <ProductFamilyAside record={record} link="show" />
        </Box>
    );
};

export const ProductFamilyEdit = (props: EditProps) => (
    <EditBase {...props}>
        <ProductFamilyEditContent />
    </EditBase>
);
