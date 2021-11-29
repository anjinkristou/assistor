import * as React from 'react';
import {
    TextField,
    EmailField,
    DateField,
    ReferenceManyField,
    useListContext,
    ReferenceField,
    FunctionField,
} from 'react-admin';
import { Box, Typography, Divider, List, ListItem } from '@material-ui/core';
import { TagsListEdit } from '../tags/TagsListEdit';

import { Contact, Sale } from '../types';
import { CollapsibleAside } from '../components/CollapsibleAside';

export const ContactAside = ({ 
    record, 
    link = 'edit',
}: {
    record?: Contact;
    link?: string;
}) => {
    if (!record) return null;

    return (
        <CollapsibleAside record={record} link={link} basePath="/contacts">
            <AsideContent record={record} />
        </CollapsibleAside>
    );
};

const TasksIterator = () => {
    const { data, ids, loading } = useListContext();
    if (loading || ids.length === 0) return null;
    return (
            <List>
                {ids.map(id => {
                    const task = data[id];
                    return (
                        <ListItem key={id} disableGutters>
                            <Box>
                                <Typography variant="body2">
                                    {task.text}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    due{' '}
                                    <DateField
                                        source="due_date"
                                        record={task}
                                    />
                                </Typography>
                            </Box>
                        </ListItem>
                    );
                })}
            </List>
    );
};


const AsideContent = ({ 
    record 
}: { 
    record?: Contact;
}) => 
    record ? (
        <>
            <Typography variant="subtitle2">Personal info</Typography>
            <Divider />

            <Box mt={2}>
                <EmailField source="email" />
            </Box>

            <Box mt={1}>
                <TextField source="phone_number1" />{' '}
                <Typography variant="body2" color="textSecondary" component="span">
                    Work
                </Typography>
            </Box>

            <Box mb={1}>
                <TextField source="phone_number2" />{' '}
                <Typography variant="body2" color="textSecondary" component="span">
                    Home
                </Typography>
            </Box>

            <Box mb={3}>
                <Typography variant="body2">
                    {record.gender === 'male' ? 'He/Him' : 'She/Her'}
                </Typography>
            </Box>

            <Typography variant="subtitle2">Background</Typography>
            <Divider />

            <Box mt={2}>{record && record.background}</Box>
            <Box mt={1} mb={3}>
                <Typography component="span" variant="body2" color="textSecondary">
                    Added on
                </Typography>{' '}
                <DateField
                    source="first_seen"
                    options={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    color="textSecondary"
                />
                <br />
                <Typography component="span" variant="body2" color="textSecondary">
                    Last seen on
                </Typography>{' '}
                <DateField
                    source="last_seen"
                    options={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    color="textSecondary"
                />
                <br />
                <Typography component="span" variant="body2" color="textSecondary">
                    Followed by
                </Typography>{' '}
                <ReferenceField
                    resource="contacts"
                    source="sales_id"
                    reference="sales"
                >
                    <FunctionField<Sale>
                        source="last_name"
                        render={record =>
                            record ? `${record.first_name} ${record.last_name}` : ''
                        }
                    />
                </ReferenceField>
            </Box>

            <Box mb={3}>
                <Typography variant="subtitle2">Tags</Typography>
                <Divider />
                <TagsListEdit record={record} reference="contacts" />
            </Box>

            <Box>
                <Typography variant="subtitle2">Tasks</Typography>
                <Divider />
                <ReferenceManyField
                    resource="contacts"
                    target="contact_id"
                    reference="tasks"
                >
                    <TasksIterator />
                </ReferenceManyField>
            </Box>
        </>
    ) : null;