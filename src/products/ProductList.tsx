import * as React from 'react';
import {
    List,
    ListProps,
    TopToolbar,
    ExportButton,
    CreateButton,
    Pagination,
    useGetIdentity,
    ListActionsProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import { ProductGridList } from './ProductGridList';
import { ProductListFilter } from './ProductListFilter';
import { ImportButton } from 'react-admin-import-csv';

export const ProductList = (props: ListProps) => {
    const { identity } = useGetIdentity();
    return identity ? (
        <List
            {...props}
            actions={<ProductListActions />}
            aside={<ProductListFilter />}
            filterDefaultValues={{ }}
            pagination={<Pagination rowsPerPageOptions={[15, 25, 50, 100]} />}
            perPage={25}
            sort={{ field: 'model', order: 'ASC' }}
            component="div"
        >
            <ProductGridList />
        </List>
    ) : null;
};

const useActionStyles = makeStyles(theme => ({
    createButton: {
        marginLeft: theme.spacing(2),
    },
}));

const ProductListActions = (props: ListActionsProps) => {
    const classes = useActionStyles();
    return (
        <TopToolbar>
            <ExportButton />
            <ImportButton {...props} />
            <CreateButton
                basePath="/products"
                variant="contained"
                label="New Product"
                className={classes.createButton}
            />
        </TopToolbar>
    );
};
