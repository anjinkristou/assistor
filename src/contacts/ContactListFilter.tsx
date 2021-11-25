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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { endOfYesterday, startOfWeek, startOfMonth, subMonths } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

import { Status } from '../misc/Status';
import { TagChip } from '../tags/TagChip';
import { Tag } from '../types';

const useStyles = makeStyles(theme => ({
    container: {
        order: -1,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: '13em',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
}));

export const ContactListFilter = () => {
    const classes = useStyles();
    const { identity } = useGetIdentity();
    const { data, ids } = useGetList<Tag>(
        'tags',
        { page: 1, perPage: 10 },
        { field: 'name', order: 'ASC' }
    );
    return (
        <div className={classes.container}>
            <FilterLiveSearch />
            <FilterList label="Last seen" icon={<AccessTimeIcon />}>
                <FilterListItem
                    label="Today"
                    value={{
                        last_seen_gte: endOfYesterday().toISOString(),
                        last_seen_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="This week"
                    value={{
                        last_seen_gte: startOfWeek(new Date()).toISOString(),
                        last_seen_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="Before this week"
                    value={{
                        last_seen_gte: undefined,
                        last_seen_lte: startOfWeek(new Date()).toISOString(),
                    }}
                />
                <FilterListItem
                    label="Before this month"
                    value={{
                        last_seen_gte: undefined,
                        last_seen_lte: startOfMonth(new Date()).toISOString(),
                    }}
                />
                <FilterListItem
                    label="Before last month"
                    value={{
                        last_seen_gte: undefined,
                        last_seen_lte: subMonths(
                            startOfMonth(new Date()),
                            1
                        ).toISOString(),
                    }}
                />
            </FilterList>
            <FilterList label="Status" icon={<TrendingUpIcon />}>
                <FilterListItem
                    label={
                        <>
                            Cold <Status status="cold" />
                        </>
                    }
                    value={{
                        status: 'cold',
                    }}
                />
                <FilterListItem
                    label={
                        <>
                            Warm <Status status="warm" />
                        </>
                    }
                    value={{
                        status: 'warm',
                    }}
                />
                <FilterListItem
                    label={
                        <>
                            Hot <Status status="hot" />
                        </>
                    }
                    value={{
                        status: 'hot',
                    }}
                />
                <FilterListItem
                    label={
                        <>
                            In contract <Status status="in-contract" />
                        </>
                    }
                    value={{
                        status: 'in-contract',
                    }}
                />
            </FilterList>
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
        </div>
    );
};
