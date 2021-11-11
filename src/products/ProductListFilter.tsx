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
import BusinessIcon from '@material-ui/icons/Business';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import { TagChip } from '../tags/TagChip';
import { Tag } from '../types';

export const ProductListFilter = () => {
    const { identity } = useGetIdentity();
    const { data, ids } = useGetList<Tag>(
        'tags',
        { page: 1, perPage: 10 },
        { field: 'name', order: 'ASC' }
    );
    return (
        <Box width="15em" order="-1" marginRight="1em" mb={1}>
            <FilterLiveSearch />

            <FilterList label="Tags" icon={<LocalOfferIcon />}>
                {ids &&
                    data &&
                    ids.map(id => (
                        <FilterListItem
                            key={id}
                            label={<TagChip record={data[id]}/>}
                            value={{ tags: [id] }}
                        />
                    ))}
            </FilterList>

            <FilterList
                label="Account manager"
                icon={<SupervisorAccountIcon />}
            >
                <FilterListItem
                    label="Me"
                    value={{
                        sales_id: identity && identity.id,
                    }}
                />
            </FilterList>
        </Box>
    );
};
