import * as React from 'react';
import {
    Create,
    CreateProps,
    ReferenceInput,
    SimpleForm,
    TextInput,
    SelectInput,
    required,
    AutocompleteInput,
    useGetIdentity,
    FormDataConsumer,
    ReferenceArrayInput,
    AutocompleteArrayInput,
} from 'react-admin';
import { Box, CardContent, Divider, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import clsx from 'clsx';

import { sectors } from './sectors';
import { sizes } from './sizes';
import { relations } from './relations';
import DistributorInput from './DistributorInput';

const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});

export const CompanyCreate = (props: CreateProps) => {
    const classes = useStyles();
    const { identity } = useGetIdentity();

    if (!identity) return null;

    const companyDefaultValue = () => ({ sales_id: identity && identity?.id });

    return (
        <Create {...props} actions={false}>
            <SimpleForm 
                component={CustomLayout} 
                initialValues={companyDefaultValue}
                redirect="show"
            >
                <TextInput source="name" validate={required()} fullWidth />
                <SelectInput
                    source="sector"
                    choices={sectors}
                    formClassName={clsx(classes.inline, 'first-child')}
                />
                <SelectInput
                    source="size"
                    choices={sizes}
                    formClassName={classes.inline}
                />
                <SelectInput
                    source="relation"
                    choices={relations}
                    formClassName={classes.inline}
                />
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.relation != 'Distributor' &&
                        <ReferenceInput
                            source="distributor_id"
                            reference="companies"
                        >
                            <DistributorInput />
                        </ReferenceInput>
                    }
                </FormDataConsumer>

                <ReferenceArrayInput source="use_products" reference="products">
                    <AutocompleteArrayInput source="model" />
                </ReferenceArrayInput>

                <CustomDivider />
                <TextInput source="address" fullWidth helperText={false} />
                <TextInput
                    source="city"
                    formClassName={clsx(classes.inline, 'first-child')}
                />
                <TextInput source="zipcode" formClassName={classes.inline} />
                <TextInput source="stateAbbr" formClassName={classes.inline} />
                <ReferenceInput
                    source="country_id"
                    reference="countries"
                >
                    <AutocompleteInput optionText="nicename" />
                </ReferenceInput>
                <CustomDivider />
                <TextInput source="website" fullWidth helperText={false} />
                <TextInput source="linkedIn" fullWidth helperText={false} />
                <TextInput source="logo" fullWidth />
                <CustomDivider />
                <TextInput
                    source="phone_number"
                    formClassName={clsx(classes.inline, 'first-child')}
                    helperText={false}
                />
                <ReferenceInput
                    source="sales_id"
                    reference="sales"
                    label="Account manager"
                    formClassName={classes.inline}
                    helperText={false}
                >
                    <SelectInput
                        optionText={(sales: any) =>
                            `${sales.first_name} ${sales.last_name}`
                        }
                    />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};

const CustomLayout = ({ children }: 
    {children: any;}) => (
    <CardContent>
        <Box display="flex">
            <Box paddingTop={1}>
                <Avatar>
                    <BusinessIcon />
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
