import * as React from 'react';
import {
    Create,
    CreateProps,
    ReferenceInput,
    SimpleForm,
    TextInput,
    SelectInput,
    required,
    AutocompleteInput,
    useGetIdentity,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { Box, CardContent, Divider, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';


const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});

export const ProductCreate = (props: CreateProps) => {
    const classes = useStyles();
    const { identity } = useGetIdentity();

    if (!identity) return null;

    const companyDefaultValue = () => ({ sales_id: identity && identity?.id });

    return (
        <Create {...props} actions={false}>
            <SimpleForm 
                component={CustomLayout} 
                initialValues={companyDefaultValue}
                redirect="show"
            >
                <ReferenceInput 
                    label="Product Family" 
                    source="family_id" 
                    reference="productFamilies">
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <TextInput source="model" validate={required()} fullWidth />
                <TextInput source="code" fullWidth />
                <TextInput source="website" fullWidth />
                <RichTextInput source="description" fullWidth />
                
            </SimpleForm>
        </Create>
    );
};

const CustomLayout = ({ children }: 
    {children: any;}) => (
    <CardContent>
        <Box display="flex">
            <Box paddingTop={1}>
                <Avatar>
                    <ShoppingCartIcon />
                </Avatar>
            </Box>
            <Box ml={2} flex="1" maxWidth="80%">
                {children}
            </Box>
        </Box>
    </CardContent>
);

const CustomDivider = () => (
    <Box mb={2}>
        <Divider />
    </Box>
);
