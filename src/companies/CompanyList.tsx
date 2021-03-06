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
    SortButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import { GridList } from './GridList';
import { CompanyListFilter } from './CompanyListFilter';
import { ImportButton } from 'react-admin-import-csv';
import SelectAllButton from './SelectAllButton';

export const CompanyList = (props: ListProps) => {
    const { identity } = useGetIdentity();
    return identity ? (
        <List
            {...props}
            actions={<CompanyListActions />}
            aside={<CompanyListFilter />}
            filterDefaultValues={{ sales_id: identity?.id }}
            pagination={<Pagination rowsPerPageOptions={[15, 25, 50, 100, 1000]} />}
            perPage={25}
            sort={{ field: 'name', order: 'ASC' }}
            component="div"
        >
            <GridList />
        </List>
    ) : null;
};

const useActionStyles = makeStyles(theme => ({
    createButton: {
        marginLeft: theme.spacing(2),
    },
}));

const importOptions = {
    parseConfig: {
        // For all options see: https://www.papaparse.com/docs#config
        dynamicTyping: true
    }
}

const CompanyListActions = (props: ListActionsProps) => {
    const classes = useActionStyles();
    return (
        <TopToolbar>
            <SortButton fields={['id', 'name']} />
            <SelectAllButton />
            <ExportButton />
            <ImportButton {...props} {...importOptions}/>
            <CreateButton
                basePath="/companies"
                variant="contained"
                label="New Company"
                className={classes.createButton}
            />
        </TopToolbar>
    );
};
