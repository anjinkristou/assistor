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
import { Box, CardContent, Divider, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
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
                <TextInput source="name" validate={required()} fullWidth />
                
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
                    <BusinessIcon />
                </Avatar>
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
