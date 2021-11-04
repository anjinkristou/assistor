import * as React from 'react';
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
} from 'react-admin';
import { Card, CardContent, Divider, Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Contact } from '../types';

const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});


export const ContactCreate = (props: CreateProps) => {
    const classes = useStyles();
    const { identity } = useGetIdentity();
    
    if (!identity) return null;

    const contactDefaultValue = () => ({ sales_id: identity && identity?.id });
    const transform = (data: Contact) => ({
        ...data,
        last_seen: new Date(),
        tags: [],
    });
    
    return (
        <Create {...props} actions={false}>
            <SimpleForm 
                component={CustomLayout} 
                redirect="show"
                initialValues={contactDefaultValue}
                transform={transform}
            >
                <TextInput 
                    source="first_name" 
                    validate={[required()]} 
                    formClassName={clsx(classes.inline, 'first-child')}
                />
                <TextInput
                    source="last_name"
                    validate={[required()]}
                    formClassName={classes.inline}
                />
                <CustomDivider />
                <TextInput 
                    source="title"
                    formClassName={clsx(classes.inline, 'first-child')}
                />
                <ReferenceInput
                    source="company_id"
                    reference="companies"
                    formClassName={classes.inline}
                >
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <CustomDivider />
                <TextInput
                    source="email"
                    fullWidth
                />
                <TextInput source="phone_number1"
                    formClassName={clsx(classes.inline, 'first-child')} />
                <TextInput source="phone_number2"
                    formClassName={classes.inline} />
                <CustomDivider />
                <TextInput
                    source="background"
                    multiline
                    fullWidth
                />
                <TextInput
                    source="avatar"
                    fullWidth
                />
                <ReferenceInput
                    source="sales_id"
                    reference="sales"
                    label="Account manager"
                    helperText={false}
                >
                    <SelectInput
                        optionText={(sales: any) =>
                            `${sales.first_name} ${sales.last_name}`
                        }
                    />
                </ReferenceInput>
                <BooleanInput source="has_newsletter" />
            </SimpleForm>
        </Create>
    );
};


const CustomLayout = ({ children }: 
    {children: any;}) => (
    <CardContent>
        <Box display="flex">
            <Box paddingTop={1}>
                <Avatar />
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