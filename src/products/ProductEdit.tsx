import * as React from 'react';
import {
    Edit,
    EditProps,
    ReferenceInput,
    SimpleForm,
    TextInput,
    SelectInput,
    useRecordContext,
    AutocompleteInput,
    required,
} from 'react-admin';
import { Box, CardContent, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { ProductAside } from './ProductAside';
import { ProductImageField } from './ProductImageField';

const useStyles = makeStyles({
    inline: {
        display: 'inline-block',
        marginLeft: '1em',
        '&.first-child': {
            marginLeft: 0,
        },
    },
});

const renderDistributor = (choice: any) => {

}

export const ProductEdit = (props: EditProps) => {
    const classes = useStyles();
    return (
        <Edit {...props} aside={<ProductAside link="show" />} actions={false}>
            <SimpleForm component={CustomLayout} redirect="show">
                <TextInput source="name" validate={required()} fullWidth />

            </SimpleForm>
        </Edit>
    );
};

const CustomLayout = (props: any) => {
    const record = useRecordContext(props);
    return (
        <CardContent>
            <Box display="flex">
                <ProductImageField record={record as any} />
                <Box ml={2} flex="1" maxWidth={796}>
                    {props.children}
                </Box>
            </Box>
        </CardContent>
    );
};

const CustomDivider = () => (
    <Box mb={2}>
        <Divider />
    </Box>
);
