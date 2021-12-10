import * as React from 'react';
import {
    TextField,
    DateField,
    FunctionField,
    ReferenceField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    ShowButton,
} from 'react-admin';
import { 
    Box, 
    Typography, 
    Divider, 
    Link,
} from '@material-ui/core';
import { Company, Sale } from '../types';
import { TagsListEdit } from '../tags/TagsListEdit';
import { CollapsibleAside } from '../components/CollapsibleAside';
import { ProductsListEdit } from '../products/ProductsListEdit';
import { any } from 'prop-types';
import { UpdateLinkedinCompany } from '../linkedin/UpdateLinkedinCompany';

export const CompanyAside = ({
    record,
    link = 'edit',
    ...props
}: {
    record?: Company;
    link?: string;
}) => {
    if (!record) return null;

    return (
        <CollapsibleAside record={record} link={link} basePath="/companies">
            <AsideContent />
        </CollapsibleAside>
    );
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
                
                {record.linkedIn &&
                    <>
                    LinkedIn: <Link href={record.linkedIn} target="_blank" rel="noreferrer">LinkedIn</Link>
                    <UpdateLinkedinCompany record={record} />
                    </>
                }
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

                <ProductsListEdit record={record} reference="companies" />
            </Box>
        </>
    ) : null;