import * as React from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useListContext, Identifier } from 'react-admin';
import Skeleton from '@material-ui/lab/Skeleton';

import { ProductCard } from './ProductCard';
import { Product } from '../types';

const useStyles = makeStyles(theme => ({
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        width:  '100%',
        gap: '10px',
    },
    paper: {
        height: 200,
        width: 194,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: '1em',
        backgroundColor: theme.palette.grey[200],
    },
}));

const times = (nbChildren: number, fn: (key: number) => any) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
    const classes = useStyles();
    return (
        <Box className={classes.gridList}>
            {times(15, key => (
                <Paper className={classes.paper} key={key} >
                <Skeleton variant="circle" width={60} height={60}  animation="wave"/>
                <Skeleton variant="text" animation="wave" width={110}/>
                <Skeleton variant="text" animation="wave" width={150}/>
                <Skeleton variant="rect" width={180} height={40} />
                </Paper>
            ))}
        </Box>
    );
};

const LoadedGridList = () => {
    const { ids, data } = useListContext<Product>();
    const classes = useStyles();

    if (!ids || !data) return null;

    return (
        <Box className={classes.gridList}>
            {ids.map((id: Identifier) => (
                <ProductCard key={id} record={data[id]} />
            ))}
        </Box>
    );
};

export const ProductGridList = () => {
    const { loaded, loading } = useListContext();
    return loading ? <LoadingGridList /> : <LoadedGridList /> ;
};
