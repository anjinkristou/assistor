import * as React from 'react';
import { useState } from 'react';
import { Paper, Typography, Link as MuiLink, Box, Chip, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/AccountCircle';
import DealIcon from '@material-ui/icons/MonetizationOn';
import NoteIcon from '@material-ui/icons/Note';
import { linkToRecord, SelectField, ReferenceField, useListContext } from 'react-admin';
import { Link } from 'react-router-dom';

import { sectors } from './sectors';
import { CompanyAvatar } from './CompanyAvatar';
import { Company } from '../types';
import { CountryField } from './CountryField';

const useStyles = makeStyles(theme => ({
    paper: {
        height: 200,
        width: 194,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1em',
        position: 'relative',
    },
    identity: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
    },
    stats: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    singleStat: {
        display: 'flex',
        alignItems: 'center',
    },
    statIcon: {
        marginRight: theme.spacing(1),
    },
    checkbox: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    identifier: {
        position: 'absolute',
        top: theme.spacing(1),
        lrft: 0,
    }
}));

export const CompanyCard = ({ record }: { record: Company }) => {
    const classes = useStyles();
    const [elevation, setElevation] = useState(1);
    const { data, ids, loaded, onToggleItem, selectedIds } = useListContext<Company>();
    return (
        <MuiLink
            component={Link}
            to={linkToRecord('/companies', record.id, 'show')}
            underline="none"
            onMouseEnter={() => setElevation(3)}
            onMouseLeave={() => setElevation(1)}
        >
            <Paper className={classes.paper} elevation={elevation}>
                <Checkbox
                    edge="start"
                    checked={selectedIds.includes(record.id)}
                    tabIndex={-1}
                    disableRipple
                    className={classes.checkbox}
                    onClick={(e: any )=> {
                        e.stopPropagation();
                        onToggleItem(record.id);
                    }}
                />
                <Typography 
                    variant="body2" 
                    color="textSecondary"
                    className={classes.identifier}
                >
                    {`#${record.id}`}
                </Typography>
                <div className={classes.identity}>
                    <CompanyAvatar record={record} />
                    <div className={classes.name}>
                        <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">
                            {record.name}
                        </Typography>
                        <ReferenceField
                            record={record}
                            source="country_id"
                            reference="countries"
                            link={false}
                        >
                            <CountryField size='small' />
                        </ReferenceField>
                        </Box>
                        {record.relation && (
                            <Chip 
                                label={record.relation} 
                                variant="outlined" 
                                size="small"
                            />
                        )}
                        <SelectField
                            color="textSecondary"
                            source="sector"
                            choices={sectors}
                            record={record}
                        />
                    </div>
                </div>
                <div className={classes.stats}>
                    <div className={classes.singleStat}>
                        <ContactsIcon
                            color="disabled"
                            className={classes.statIcon}
                        />
                        <div>
                            <Typography
                                variant="subtitle2"
                                style={{ marginBottom: -8 }}
                            >
                                {record.nb_contacts}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {record.nb_contacts > 1
                                    ? 'contacts'
                                    : 'contact'}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.singleStat}>
                        <NoteIcon
                            color="disabled"
                            className={classes.statIcon}
                        />
                        <div>
                            <Typography
                                variant="subtitle2"
                                style={{ marginBottom: -8 }}
                            >
                                {record.nb_notes}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {record.nb_notes > 1 ? 'notes' : 'note'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Paper>
        </MuiLink>
    );
};
