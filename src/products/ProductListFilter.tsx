/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
    useGetList,
} from 'react-admin';
import { Box, Chip, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category';

import { ProductCategory, ProductFamily } from '../types';
import { CollapsibleListFilter } from '../components/CollapsibleListFilter';
import { productFamilyCategories } from '../productFamilies/productFamilyCategories';
import ProductCategoryPie from '../productCategories/ProductCategoryPie';

const useStyles = makeStyles(theme => ({
    familyList: {
        maxHeight: theme.spacing(20), 
        overflow: 'auto',
    },
    categoryList: {
        maxHeight: theme.spacing(20), 
        overflow: 'auto',
    }
}));

export const ProductListFilter = () => {
    const classes = useStyles();
    const [familySearch, setFamilySearch] = useState('');
    const { identity } = useGetIdentity();
    const { data: familyData, ids: familyIds } = useGetList<ProductFamily>(
        'productFamilies',
        { page: 1, perPage: 1000 },
        { field: 'name', order: 'ASC' }
    );
    const { data: categoryData, ids: categoryIds } = useGetList<ProductCategory>(
        'productCategories',
        { page: 1, perPage: 1000 },
        { field: 'name', order: 'ASC' }
    );
    return (
        <CollapsibleListFilter>
            <FilterLiveSearch />

            <FilterList label="Families" icon={<CategoryIcon />}>
                <TextField 
                    value={familySearch} 
                    onChange={e => setFamilySearch(e.target.value)} 
                    label="Search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    style={{width: '100%'}}
                />
                <div className={classes.familyList}>
                    {familyIds &&
                        familyData &&
                        familyIds
                        .filter(id => familyData[id]
                            .name
                            .toLowerCase()
                            .includes(familySearch.toLowerCase()))
                        .map(id => (
                            <FilterListItem
                                key={id}
                                label={<Chip label={familyData[id].name} size="small"/>}
                                value={{ family_id: id }}
                            />
                        ))}
                </div>
            </FilterList>

            <FilterList label="Categories" icon={<CategoryIcon />}>
                <div className={classes.categoryList}>
                    {categoryIds &&
                        categoryData &&
                        categoryIds.map(id => (
                            <FilterListItem
                                key={id}
                                label={<Chip label={categoryData[id].name} size="small"/>}
                                value={{ category_id: id }}
                            />
                    ))}
                </div>
            </FilterList>
            <Box marginTop={1}>
                <Typography>Category ratio</Typography>
                <ProductCategoryPie width='100%' height={200}/>
            </Box>
        </CollapsibleListFilter>
    );
};
