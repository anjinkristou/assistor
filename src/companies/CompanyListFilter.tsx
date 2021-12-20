/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState } from 'react';
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
    useGetList,
    LinearProgress,
} from 'react-admin';
import { 
    InputAdornment,
    TextField, 
} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PublicIcon from '@material-ui/icons/Public';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import { sectors } from './sectors';
import { relations } from './relations';
import { TagChip } from '../tags/TagChip';
import { Country, Tag } from '../types';
import { CollapsibleListFilter } from '../components/CollapsibleListFilter';

const useStyles = makeStyles(theme => ({
    container: {
        minWidth: '13em',
    },
    countryList: {
        maxHeight: theme.spacing(20), 
        overflow: 'auto',
    },
    tagList: {
        maxHeight: theme.spacing(20), 
        overflow: 'auto',
    }
}));

export const CompanyListFilter = () => {
    const classes = useStyles();
    const { identity } = useGetIdentity();
    const [countrySearch, setCountrySearch] = useState('');

    const { data: tags, ids: tagIds, loading: tags_loading } = useGetList<Tag>(
        'tags',
        { page: 1, perPage: 500 },
        { field: 'name', order: 'ASC' }
    );


    const { data: countries, ids: countryIds, loading: country_loading } = useGetList<Country>(
        'countries',
        { page: 1, perPage: 500 },
        { field: 'name', order: 'ASC' }
    );

    return (
        <CollapsibleListFilter>
            <FilterLiveSearch />

            <FilterList label="Relation" icon={<BusinessIcon />}>
                {relations.map(relation => (
                    <FilterListItem
                        key={relation.id}
                        label={relation.name}
                        value={{ relation: relation.id }}
                    />
                ))}
            </FilterList>

            <FilterList label="Tags" icon={<LocalOfferIcon />}>
                <div className={classes.tagList}>
                    {tags_loading
                        ? <LinearProgress />
                        : tagIds.map(id => (
                            <FilterListItem
                                key={id}
                                label={<TagChip record={tags[id]}/>}
                                value={{ tags: [id] }}
                            />
                        ))
                    }
                </div>
            </FilterList>

            <FilterList label="Sector" icon={<LocalShippingIcon />}>
                {sectors.map(sector => (
                    <FilterListItem
                        key={sector.id}
                        label={sector.name}
                        value={{ sector: sector.id }}
                    />
                ))}
            </FilterList>

            <FilterList label="Countries" icon={<PublicIcon />}>
                <TextField 
                    value={countrySearch} 
                    onChange={e => setCountrySearch(e.target.value)} 
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
                <div className={classes.countryList}>
                    {country_loading
                        ? <LinearProgress />
                        : countryIds.filter(id => countries[id]
                            .nicename
                            .toLowerCase()
                            .includes(countrySearch.toLowerCase())).map(id => (
                            <FilterListItem
                            key={id}
                            label={countries[id].nicename}
                            value={{ country_id: id }}
                            />
                        ))
                    }
                </div>
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
        </CollapsibleListFilter>
    );
};
