import Reacct, { useState, FormEvent } from 'react';
import {
    Create,
    CreateProps,
    TextInput,
    ReferenceInput,
    SelectInput,
    AutocompleteInput,
    BooleanInput,
    SimpleForm,
    Toolbar,
    required,
    useGetIdentity,
    useCreateContext,
    useCreateSuggestionContext,
    useCreate,
} from 'react-admin';
import { 
    Card, 
    CardContent, 
    Divider, 
    Box, 
    Dialog, 
    DialogContent,
    DialogActions,
    TextField,
    Button,
 } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { ProductFamily } from '../types';
import { categories } from './categories';

const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});


export const ProductFamilyCreate = (props: CreateProps) => {
    const classes = useStyles();

    const contactDefaultValue = () => ({ });
    const transform = (data: ProductFamily) => ({
        ...data,
    });
    
    return (
        <Create {...props} actions={false}>
            <SimpleForm 
                component={CustomLayout} 
                redirect="show"
                initialValues={contactDefaultValue}
                transform={transform}
            >
                <SelectInput
                    source="category"
                    choices={categories}
                    formClassName={clsx(classes.inline, 'first-child')}
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
            </SimpleForm>
        </Create>
    );
};


const CustomLayout = ({ children }: 
    {children: any;}) => (
    <CardContent>
        <Box display="flex">
            <Box paddingTop={1}>
                <CategoryIcon />
            </Box>
            <Box ml={2} flex="1" maxWidth={796}>
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

