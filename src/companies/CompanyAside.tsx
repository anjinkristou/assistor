import * as React from 'react';
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
import { Box, Typography, Divider, Link } from '@material-ui/core';

import { Company, Sale } from '../types';
import { TagsListEdit } from '../tags/TagsListEdit';

export const CompanyAside = ({
    record,
    link = 'edit',
}: {
    record?: Company;
    link?: string;
}) =>
    record ? (
        <Box ml={4} width={250} minWidth={250}>
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
        </Box>
    ) : null;
