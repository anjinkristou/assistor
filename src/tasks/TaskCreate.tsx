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
    DateInput,
    useCreateContext,
    SelectField,
} from 'react-admin';
import { Card, CardContent, Divider, Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


import { Task } from '../types';
import { statuses } from './status';

const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});


export const TaskCreate = (props: CreateProps) => {
    const classes = useStyles();
    const { identity } = useGetIdentity();
    
    if (!identity) return null;

    const defaultValue = () => ({
        due_date: new Date(), 
        status: 'Pending',
    });
    const transform = (data: Task) => ({
        ...data,
        sales_id: identity && identity?.id, 
    });
    
    return (
        <Create {...props} actions={false}>
            <SimpleForm 
                component={CustomLayout} 
                redirect="show"
                initialValues={defaultValue}
                transform={transform}
            >
                <TextInput 
                    source="text"
                    label="Task"
                    validate={[required()]}
                    fullWidth
                />
                <DateInput
                    source="due_date"
                    formClassName={clsx(classes.inline, 'first-child')}
                />
                <SelectInput
                    source="status"
                    choices={statuses}
                    formClassName={classes.inline}
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
                <Avatar >
                    <AssignmentTurnedInIcon />
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