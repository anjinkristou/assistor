import * as React from 'react';
import {
    EditBase,
    EditProps,
    TextInput,
    ReferenceInput,
    AutocompleteInput,
    BooleanInput,
    FormWithRedirect,
    required,
    Toolbar,
    useEditContext,
    DateInput,
    SelectInput,
} from 'react-admin';
import { Card, CardContent, Divider, Box, Avatar } from '@material-ui/core';
import omit from 'lodash/omit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { TaskAside } from './TaskAside';
import { Task } from '../types';
import { statuses } from './status';

const Spacer = () => <Box width={20} component="span" />;
const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});

const TaskEditContent = () => {
    const classes = useStyles();
    const { record, loaded, save } = useEditContext<Task>();
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
                                        <Avatar >
                                            <AssignmentTurnedInIcon />
                                        </Avatar>
                                        </Box>
                                        <Box flex="1" mt={-1}>
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
                                            <ReferenceInput
                                                source="sales_id"
                                                reference="sales"
                                                label="Account manager"
                                                helperText={false}
                                                formClassName={classes.inline}
                                            >
                                                <SelectInput
                                                    optionText={(sales: any) =>
                                                        `${sales.first_name} ${sales.last_name}`
                                                    }
                                                />
                                            </ReferenceInput>
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
            <TaskAside record={record} link="show" />
        </Box>
    );
};

export const TaskEdit = (props: EditProps) => (
    <EditBase {...props}>
        <TaskEditContent />
    </EditBase>
);
