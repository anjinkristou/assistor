import * as React from 'react';
import {
    Edit,
    EditProps,
    ReferenceInput,
    TabbedForm,
    FormTab,
    TextInput,
    SelectInput,
    useRecordContext,
    AutocompleteInput,
    required,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { Box, CardContent, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { ProductAside } from './ProductAside';
import { ProductImageField } from './ProductImageField';
import { CreatePropertyType } from './CreatePropertyType';

const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});

const renderDistributor = (choice: any) => {

}

export const ProductEdit = (props: EditProps) => {
    const classes = useStyles();
    return (
        <Edit 
            {...props} 
            aside={<ProductAside link="show" />} 
            actions={false}
        >
            <TabbedForm
                redirect="show"
            >
                <FormTab label="General">
                    <ReferenceInput 
                        label="Comapny" 
                        source="company_id" 
                        reference="companies"
                        fullWidth
                    >
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <ReferenceInput 
                        label="Product Family" 
                        source="family_id" 
                        reference="productFamilies"
                        fullWidth
                    >
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput>
                    <TextInput source="model" validate={required()} fullWidth />
                    <TextInput source="code" fullWidth />
                    <TextInput source="website" fullWidth />
                    <TextInput source="image" fullWidth />
                    <TextInput 
                        source="description"
                        multiline
                        rows={3} 
                        fullWidth 
                    />
                </FormTab>
                <FormTab label="Properties">
                    <ArrayInput
                        source="properties"
                    >
                        <SimpleFormIterator>
                                <ReferenceInput
                                    source="type_id"
                                    reference="propertyTypes"
                                    label="Type"
                                >
                                    <AutocompleteInput 
                                        optionText="name" 
                                        create={<CreatePropertyType />}
                                    />
                                </ReferenceInput>
                                <TextInput source="property_value" label="Value"/>
                                <TextInput source="condition"  label="Condition"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const CustomLayout = (props: any) => {
    const record = useRecordContext(props);
    return (
        <CardContent>
            <Box display="flex">
                <ProductImageField record={record as any} />
                <Box ml={2} flex="1" maxWidth={796}>
                    {props.children}
                </Box>
            </Box>
        </CardContent>
    );
};

const CustomDivider = () => (
    <Box mb={2}>
        <Divider />
    </Box>
);
