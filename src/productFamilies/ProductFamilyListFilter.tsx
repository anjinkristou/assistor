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

export const ProductFamilyListFilter = () => {

    return (
        <Box width="15em" order="-1" marginRight="1em">
            <FilterLiveSearch />
        </Box>
    );
};
