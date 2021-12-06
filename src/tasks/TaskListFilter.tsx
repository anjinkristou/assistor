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
import { 
    endOfYesterday, 
    startOfWeek, 
    startOfMonth, 
    subMonths, 
    endOfToday,
    endOfWeek,
    addWeeks,
    endOfMonth,
 } from 'date-fns';

import { TaskStatus } from './TaskStatus';
import { TagChip } from '../tags/TagChip';
import { Tag } from '../types';
import { statuses } from './status';
import { CollapsibleListFilter } from '../components/CollapsibleListFilter';

export const TaskListFilter = () => {
    const { identity } = useGetIdentity();
    return (
        <CollapsibleListFilter>
            <FilterLiveSearch />
            <FilterList label="Due date" icon={<AccessTimeIcon />}>
                <FilterListItem
                    label="Today"
                    value={{
                        due_date_gte: undefined,
                        due_date_lte: endOfToday().toISOString(),
                    }}
                />
                <FilterListItem
                    label="This week"
                    value={{
                        due_date_gte: undefined,
                        due_date_lte: endOfWeek(new Date()).toISOString(),
                    }}
                />
                <FilterListItem
                    label="This month"
                    value={{
                        due_date_gte: undefined,
                        due_date_lte: endOfMonth(new Date()).toISOString(),
                    }}
                />
            </FilterList>
            <FilterList label="Status" icon={<TrendingUpIcon />}>
                {statuses.map(status =>(
                    <FilterListItem
                    label={
                        <>
                            {status.name} <TaskStatus status={status.id} />
                        </>
                    }
                    value={{
                        status: status.id,
                    }}
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
        </CollapsibleListFilter>
    );
};
