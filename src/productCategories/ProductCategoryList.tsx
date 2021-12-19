/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import {
    List as RaList,
    ListProps,
    SimpleListLoading,
    ReferenceField,
    TextField,
    useListContext,
    ExportButton,
    SortButton,
    TopToolbar,
    CreateButton,
    Pagination,
    useGetIdentity,
    SelectField,
} from 'react-admin';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import { Avatar } from './Avatar';
import { Status } from '../misc/Status';
import { TagsList } from '../tags/TagsList';
import { ProductCategoryListFilter } from './ProductCategoryListFilter';
import { ProductCategory } from '../types';

const ProductCategoryListContent = () => {
    const { data, ids, loaded, onToggleItem, selectedIds } = useListContext<
        ProductCategory
    >();
    const now = Date.now();
    if (loaded === false) {
        return <SimpleListLoading hasLeftAvatarOrIcon hasSecondaryText />;
    }

    return (
        <List>
            {ids.map(id => {
                const record = data[id];
                return (
                    <ListItem
                        button
                        key={id}
                        component={Link}
                        to={`/productCategories/${id}/show`}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedIds.includes(id)}
                                tabIndex={-1}
                                disableRipple
                                onClick={e => {
                                    e.stopPropagation();
                                    onToggleItem(id);
                                }}
                            />
                        </ListItemIcon>
                        <ListItemAvatar>
                            <Avatar record={record} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${record.name}`}
                        />
                        <ListItemSecondaryAction>

                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

const useActionStyles = makeStyles(theme => ({
    createButton: {
        marginLeft: theme.spacing(2),
    },
}));
const ProductCategoryListActions = () => {
    const classes = useActionStyles();
    return (
        <TopToolbar>
            <SortButton fields={['last_name', 'first_name', 'last_seen']} />
            <ExportButton />
            <CreateButton
                basePath="/productCategories"
                variant="contained"
                label="Add New"
                className={classes.createButton}
            />
        </TopToolbar>
    );
};

export const ProductCategoryList = (props: ListProps) => {
    const { identity } = useGetIdentity();
    return identity ? (
        <RaList
            {...props}
            actions={<ProductCategoryListActions />}
            aside={<ProductCategoryListFilter />}
            perPage={25}
            pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
            filterDefaultValues={{  }}
            // sort={{  }}
        >
            <ProductCategoryListContent />
        </RaList>
    ) : null;
};
