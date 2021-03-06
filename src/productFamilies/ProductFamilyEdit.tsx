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
} from 'react-admin';
import { Card, CardContent, Divider, Box } from '@material-ui/core';
import omit from 'lodash/omit';

import { Avatar } from './Avatar';
import { ProductFamilyAside } from './ProductFamilyAside';
import { ProductFamily } from '../types';
import { CreateCategory } from './CreateCategory';

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
                    render={formProps => (
                        <Card>
                            <CardContent>
                                <Box>
                                    <Box display="flex">
                                        <Box mr={2}>
                                            <Avatar record={record} />
                                        </Box>
                                        <Box flex={1}>
                                            <ReferenceInput
                                                source="category_id"
                                                reference="familyCategories"
                                                fullWidth
                                            >
                                                <AutocompleteInput 
                                                    optionText="name"
                                                    create={<CreateCategory />}
                                                />
                                            </ReferenceInput>
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
                            <Toolbar
                                {...omit(formProps, [
                                    // FIXME Not super user friendly way to remove warnings
                                    'dirtyFields',
                                    'dirtyFieldsSinceLastSubmit',
                                    'dirtySinceLastSubmit',
                                    'hasSubmitErrors',
                                    'hasValidationErrors',
                                    'initialValues',
                                    'modifiedSinceLastSubmit',
                                    'submitError',
                                    'submitErrors',
                                    'submitFailed',
                                    'submitSucceeded',
                                    'submitting',
                                    'valid',
                                ])}
                            />
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
