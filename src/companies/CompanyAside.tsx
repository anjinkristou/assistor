import * as React from 'react';
import { useState } from 'react';
import {
    TextField,
    DateField,
    FunctionField,
    ReferenceField,
    EditButton,
    DeleteButton,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    ShowButton,
} from 'react-admin';
import { Box, Typography, Divider, Link, Drawer, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import clsx from 'clsx';

import { Company, Sale } from '../types';
import { TagsListEdit } from '../tags/TagsListEdit';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    sideBig: {
        width: 250,
        minWidth: 250,
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            display: 'none',
        }
    },
    sideSmall: {
        [theme.breakpoints.up('sm')]:{
            display: 'none',
        }
    },
    drawerContent: {
         marginTop: theme.spacing(2),
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
    }
}));

export const CompanyAside = ({
    record,
    link = 'edit',
}: {
    record?: Company;
    link?: string;
}) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    if (!record) return null;

    return (
        <div className={classes.root}>
        <Box textAlign="center" mb={2}>
            {link === 'edit' ? (
                <EditButton
                    basePath="/companies"
                    record={record}
                    label="Edit Company"
                />
            ) : (
                <ShowButton
                    basePath="/companies"
                    record={record}
                    label="Show Company"
                />
            )}
        </Box>
        <div className={classes.sideBig}>

            
            <AsideContent record={record} />
            
        </div>
        <div className={classes.sideSmall}>
            <IconButton 
                onClick={() => setOpen(true)}
                color="secondary"
            >
                <MenuOpenIcon />
            </IconButton>
        </div>
        <Drawer 
            anchor="right" 
            open={isOpen} onClose={() => setOpen(false)}
        >
            <div className={classes.drawerContent}>
                <AsideContent record={record} />
            </div>
        </Drawer>
        </div>
    )
};
    

const AsideContent = ({ 
    record 
}: { 
    record?: Company;
}) => 
    record ? (
        <>
            <Typography variant="subtitle2">Company info</Typography>
            <Divider />

            <Box mt={2}>
                Website: <Link href={record.website} target="_blank" rel="noreferrer">{record.website}</Link>
                <br />
                LinkedIn: <Link href={record.linkedIn} target="_blank" rel="noreferrer">LinkedIn</Link>
            </Box>
            <Box mt={1}>
                Relation: <TextField source="relation" record={record} />
            </Box>
            {record.distributor_id && (
                <Box mt={1}>
                    Distributor: <ReferenceField
                            record={record}
                            source="distributor_id"
                            reference="companies"
                        >
                            <TextField source="name" record={record} />
                        </ReferenceField>
                </Box>
            )}

            {record.phone_number && (
                <Box mt={1}>
                    <TextField source="phone_number" record={record} />{' '}
                    <Typography variant="body2" color="textSecondary" component="span">Main</Typography>
                </Box>
            )}

            <Box mt={1} mb={3}>
                <TextField source="address" />
                <br />
                <TextField source="city" /> <TextField source="zipcode" />{' '}
                <TextField source="stateAbbr" />
            </Box>

            <Typography variant="subtitle2">Background</Typography>
            <Divider />

            <Box mt={3}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                >
                    Added on
                </Typography>{' '}
                <DateField
                    source="created_at"
                    options={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    color="textSecondary"
                />
                <br />
                <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                >
                    Followed by
                </Typography>{' '}
                <ReferenceField
                    resource="companies"
                    source="sales_id"
                    reference="sales"
                >
                    <FunctionField<Sale>
                        source="last_name"
                        render={record =>
                            record
                                ? `${record.first_name} ${record.last_name}`
                                : ''
                        }
                    />
                </ReferenceField>
            </Box>

            <Box mb={3}>
                <Typography variant="subtitle2">Tags</Typography>
                <Divider />
                <TagsListEdit record={record} reference="companies" />
            </Box>

            <Box mb={3}>
                <Typography variant="subtitle2">Use Products</Typography>
                <Divider />

                <Box mt={1}>
                    <ReferenceArrayField label="Tags" reference="products" source="use_products">
                        <SingleFieldList>
                            <ChipField 
                                source="model" 
                                variant="outlined" 
                                color="secondary"
                                size="small"
                            />
                        </SingleFieldList>
                    </ReferenceArrayField>
                </Box>
            </Box>
        </>
    ) : null;