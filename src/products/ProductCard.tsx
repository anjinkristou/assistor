import * as React from 'react';
import { useState } from 'react';
import { Paper, Typography, Link as MuiLink, Box, Chip, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/AccountCircle';
import DealIcon from '@material-ui/icons/MonetizationOn';
import { linkToRecord, TextField, ReferenceField, ImageField, useListContext } from 'react-admin';
import { Link } from 'react-router-dom';

import { ProductAvatar } from './ProductAvatar';
import { Product } from '../types';
import classNames from 'classnames';
import { LogoField } from '../companies/LogoField';

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
    family: {
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
    image: {
        width: 28,
        height: 28,
    },
    checkbox: {
        position: 'absolute',
        top: 0,
        left: theme.spacing(1),
    },
    hidden:{
        display: 'none',
    }
}));

export const ProductCard = ({ record }: { record: Product }) => {
    const classes = useStyles();
    const [elevation, setElevation] = useState(1);
    const { data, ids, loaded, onToggleItem, selectedIds } = useListContext<Product>();
    return (
        <MuiLink
            component={Link}
            to={linkToRecord('/products', record.id, 'show')}
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
                    className={classNames(classes.checkbox, {[classes.hidden]: !loaded})}
                    onClick={(e: any )=> {
                        e.stopPropagation();
                        onToggleItem(record.id);
                    }}
                />
                <Box position="absolute" top={10} right={10}>
                    <ReferenceField
                        record={record}
                        source="company_id"
                        reference="companies"
                        link="show"
                    >
                        <LogoField />
                    </ReferenceField>
                </Box>
                <div className={classes.identity}>
                    <ProductAvatar record={record} />
                    <div className={classes.name}>
                        <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">
                            {record.model}
                        </Typography>
                        </Box>
                    </div>

                    <div className={classes.family}>
                        <Typography variant="body2">
                            in family{' '}
                            <ReferenceField
                                record={record}
                                source="family_id"
                                reference="productFamilies"
                                link="show"
                            >
                                <TextField source="name" />
                            </ReferenceField>
                        </Typography>
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
                                {record.nb_notes}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {record.nb_notes > 1 ? 'notes' : 'note'}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.singleStat}>
                        <DealIcon
                            color="disabled"
                            className={classes.statIcon}
                        />
                        <div>
                            <Typography
                                variant="subtitle2"
                                style={{ marginBottom: -8 }}
                            >
                                {record.nb_properties}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {record.nb_properties > 1 ? 'properties' : 'property'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Paper>
        </MuiLink>
    );
};
