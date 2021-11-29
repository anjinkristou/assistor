/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import {
    List as RaList,
    ListProps,
    SimpleListLoading,
    ReferenceField,
    TextField,
    useListContext,
    ExportButton,
    SortButton,
    TopToolbar,
    CreateButton,
    Pagination,
    useGetIdentity,
    ListActionsProps,
    FilterLiveSearch,
} from 'react-admin';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import { Avatar } from './Avatar';
import { Status } from '../misc/Status';
import { TagsList } from '../tags/TagsList';
import { ContactListFilter } from './ContactListFilter';
import { Contact } from '../types';
import { ImportButton } from 'react-admin-import-csv';

const ContactListContent = () => {
    const { data, ids, loaded, onToggleItem, selectedIds } = useListContext<
        Contact
    >();
    const now = Date.now();
    if (loaded === false) {
        return <SimpleListLoading hasLeftAvatarOrIcon hasSecondaryText />;
    }

    return (
        <List>
            {ids.map(id => {
                const contact = data[id];
                return (
                    <ListItem
                        button
                        key={id}
                        component={Link}
                        to={`/contacts/${id}/show`}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedIds.includes(id)}
                                tabIndex={-1}
                                disableRipple
                                onClick={e => {
                                    e.stopPropagation();
                                    onToggleItem(id);
                                }}
                            />
                        </ListItemIcon>
                        <ListItemAvatar>
                            <Avatar record={contact} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${contact.first_name} ${contact.last_name}`}
                            secondary={
                                <>
                                    {`#${contact.id} - `}
                                    {contact.title} at{' '}
                                    <ReferenceField
                                        record={contact}
                                        source="company_id"
                                        reference="companies"
                                        basePath="/companies"
                                        link={false}
                                    >
                                        <TextField source="name" />
                                    </ReferenceField>{' '}
                                    {!!contact.nb_notes &&
                                        `- ${contact.nb_notes} notes `}
                                    <TagsList record={contact} />
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="body2" color="textSecondary">
                                last activity{' '}
                                {formatDistance(
                                    new Date(contact.last_seen),
                                    now
                                )}{' '}
                                ago <Status status={contact.status} />
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

const useStyles = makeStyles(theme => ({
    createButton: {
        marginLeft: theme.spacing(2),
    },
}));

const ContactListActions = (props: ListActionsProps) => {
    const classes = useStyles();
    return (
        <TopToolbar>
            <SortButton fields={['id', 'last_name', 'first_name', 'last_seen']} />
            <ExportButton />
            <ImportButton {...props} />
            <CreateButton
                basePath="/contacts"
                variant="contained"
                label="New Contact"
                className={classes.createButton}
            />
        </TopToolbar>
    );
};

export const ContactList = (props: ListProps) => {
    const { identity } = useGetIdentity();
    return identity ? (
        <RaList
            {...props}
            actions={<ContactListActions />}
            aside={<ContactListFilter />}
            perPage={25}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
            filterDefaultValues={{ sales_id: identity?.id }}
            sort={{ field: 'last_seen', order: 'DESC' }}
        >
            <ContactListContent />
        </RaList>
    ) : null;
};
