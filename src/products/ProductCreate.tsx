import * as React from 'react';
import {
    Create,
    CreateProps,
    ReferenceInput,
    TabbedForm,
    TextInput,
    FormTab,
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

    const defaultValue = () => ({ });

    return (
        <Create {...props} actions={false}>
            <TabbedForm>
                <FormTab label="General">
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
            </TabbedForm>
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
