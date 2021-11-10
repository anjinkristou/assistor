import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceManyField,
    SelectField,
    ReferenceField,
    ImageField,
    useShowContext,
    useRecordContext,
    useListContext,
} from 'react-admin';
import {
    Avatar as MuiAvatar,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Tabs,
    Tab,
    Chip,
    Divider,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link as RouterLink } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import BusinessIcon from '@material-ui/icons/Business';

import { Avatar } from '../contacts/Avatar';
import { Status } from '../misc/Status';
import { TagsList } from '../tags/TagsList';
import { sizes } from './sizes';
import { LogoField } from './LogoField';
import { CompanyAside } from './CompanyAside';
import { Company, Deal, Contact } from '../types';
import { stageNames } from '../deals/stages';
import { NotesIterator } from '../notes';
import { CountryField } from './CountryField';

export const CompanyShow = (props: ShowProps) => (
    <ShowBase {...props}>
        <CompanyShowContent />
    </ShowBase>
);

const CompanyShowContent = () => {
    const { record, loaded } = useShowContext<Company>();
    const [value, setValue] = useState(0);
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    if (!loaded || !record) return null;
    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" mb={1}>
                            <LogoField record={record as any} />
                            <Box ml={2} flex="1">
                                <Box display="flex" gridGap={4}>
                                    <Typography variant="h5">{record.name}</Typography>
                                    {record.relation && (
                                        <Chip 
                                            label={record.relation} 
                                            variant="outlined" 
                                            size="small"
                                        />
                                    )}
                                </Box>
                                {record.sector && (
                                        <Typography variant="body2">
                                            <TextField source="sector" />,{' '}
                                            <SelectField
                                                source="size"
                                                choices={sizes}
                                            />
                                        </Typography>
                                )}
                            </Box>
                            <Box>
                                <ReferenceField
                                    source="country_id"
                                    reference="countries"
                                    link={false}
                                >
                                    <CountryField />
                                </ReferenceField>
                            </Box>
                        </Box>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                        >
                            <Tab
                                label={
                                    record.nb_notes === 1
                                        ? '1 Note'
                                        : `${record.nb_notes} Notes`
                                }
                            />
                            <Tab
                                label={
                                    record.nb_contacts === 1
                                        ? '1 Contact'
                                        : `${record.nb_contacts} Contacts`
                                }
                            />
                            {record.nb_deals && (
                                <Tab
                                    label={
                                        record.nb_deals === 1
                                            ? '1 deal'
                                            : `${record.nb_deals} Deals`
                                    }
                                />
                            )}
                        </Tabs>
                        <Divider />
                        <TabPanel value={value} index={0}>
                            <ReferenceManyField
                                reference="companyNotes"
                                target="company_id"
                                sort={{ field: 'date', order: 'DESC' }}
                            >
                                 <NotesIterator reference="companies" />
                            </ReferenceManyField>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ReferenceManyField
                                reference="contacts"
                                target="company_id"
                                sort={{ field: 'last_name', order: 'ASC' }}
                            >
                                <ContactsIterator />
                            </ReferenceManyField>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <ReferenceManyField
                                reference="deals"
                                target="company_id"
                                sort={{ field: 'name', order: 'ASC' }}
                            >
                                <DealsIterator />
                            </ReferenceManyField>
                        </TabPanel>
                    </CardContent>
                </Card>
            </Box>
            <CompanyAside record={record} />
        </Box>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
};

const ContactsIterator = () => {
    const { data, ids, loaded } = useListContext<Contact>();
    const record = useRecordContext();

    const now = Date.now();
    if (!loaded) return null;
    return (
        <Box>
            <List>
                {ids.map(id => {
                    const contact = data[id];
                    return (
                        <ListItem
                            button
                            key={id}
                            component={RouterLink}
                            to={`/contacts/${id}/show`}
                        >
                            <ListItemAvatar>
                                <Avatar record={contact} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${contact.first_name} ${contact.last_name}`}
                                secondary={
                                    <>
                                        {contact.title}{' '}
                                        {contact.nb_notes &&
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
            <Box textAlign="center" mt={1}>
                <CreateRelatedContactButton record={record} />
            </Box>
        </Box>
    );
};

const CreateRelatedContactButton = ({ record }: any) => (
    <Button
        component={RouterLink}
        to={{
            pathname: '/contacts/create',
            state: { record: { company_id: record.id } },
        }}
        color="primary"
        variant="contained"
        size="small"
        startIcon={<PersonAddIcon />}
    >
        Add contact
    </Button>
);

const DealsIterator = () => {
    const { data, ids, loaded } = useListContext<Deal>();

    const now = Date.now();
    if (!loaded) return null;
    return (
        <Box>
            <List>
                {ids.map(id => {
                    const deal = data[id];
                    return (
                        <ListItem
                            button
                            key={id}
                            component={RouterLink}
                            to={`/deals/${id}/show`}
                        >
                            <ListItemText
                                primary={deal.name}
                                secondary={
                                    <>
                                        {/* @ts-ignore */}
                                        {stageNames[deal.stage]},{' '}
                                        {deal.amount.toLocaleString('en-US', {
                                            notation: 'compact',
                                            style: 'currency',
                                            currency: 'USD',
                                            currencyDisplay: 'narrowSymbol',
                                            minimumSignificantDigits: 3,
                                        })}
                                        , {deal.type}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="span"
                                >
                                    last activity{' '}
                                    {formatDistance(
                                        new Date(deal.updated_at),
                                        now
                                    )}{' '}
                                    ago{' '}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};
