import * as React from 'react';
import { Box, Grid } from '@material-ui/core';

import { Welcome } from './Welcome';
import { DealsChart } from './DealsChart';
import { HotContacts } from './HotContacts';
import { LatestNotes } from './LatestNotes';
import { DealsPipeline } from './DealsPipeline';
import { CompaniesMap } from './CompaniesMap';

export const Dashboard = () => {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    <CompaniesMap />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <HotContacts />
                </Grid>
                <Grid item xs={12}>
                    <LatestNotes />
                </Grid>
            </Grid>
        </>
    );
};
