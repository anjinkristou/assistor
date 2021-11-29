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
import { CollapsibleListFilter } from '../components/CollapsibleListFilter';

export const ProductFamilyListFilter = () => {

    return (
        <CollapsibleListFilter>
            <FilterLiveSearch />
        </CollapsibleListFilter>
    );
};
