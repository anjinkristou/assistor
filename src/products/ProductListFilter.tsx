/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
    useGetList,
} from 'react-admin';
import { Box, Chip } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';

import { ProductFamily } from '../types';
import { CollapsibleListFilter } from '../components/CollapsibleListFilter';

export const ProductListFilter = () => {
    const { identity } = useGetIdentity();
    const { data: familyData, ids: familyIds } = useGetList<ProductFamily>(
        'productFamilies',
        { page: 1, perPage: 10 },
        { field: 'name', order: 'ASC' }
    );
    return (
        <CollapsibleListFilter>
            <FilterLiveSearch />

            <FilterList label="Families" icon={<CategoryIcon />}>
                {familyIds &&
                    familyData &&
                    familyIds.map(id => (
                        <FilterListItem
                            key={id}
                            label={<Chip label={familyData[id].name} size="small"/>}
                            value={{ family_id: id }}
                        />
                    ))}
            </FilterList>
        </CollapsibleListFilter>
    );
};
