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

export const ProductListFilter = () => {
    const { identity } = useGetIdentity();
    const { data: familyData, ids: familyIds } = useGetList<ProductFamily>(
        'productFamilies',
        { page: 1, perPage: 10 },
        { field: 'name', order: 'ASC' }
    );
    return (
        <Box width="15em" order="-1" marginRight="1em" mb={1}>
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
        </Box>
    );
};
