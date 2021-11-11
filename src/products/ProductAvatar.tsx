import * as React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import clsx from 'clsx';

import { Product } from '../types';

const useStyles = makeStyles({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: 'aliceblue',
    },
    img: {
        objectFit: 'contain',
    },
    small: {
        width: 20,
        height: 20,
    },
    large: {
        width: 40,
        height: 40,
    },
});

export const ProductAvatar = ({
    record,
    size = 'large',
}: {
    record?: Product;
    size?: 'small' | 'large';
}) => {
    const classes = useStyles();
    if (!record) return null;
    if(!record.image) return (
        <Avatar
            alt={record.name}
            className={classes.avatar}
        >
            <BusinessIcon />
        </Avatar>
    )
    return (
        <Avatar
            src={process.env.PUBLIC_URL + record.iamge}
            alt={record.name}
            className={classes.avatar}
            imgProps={{ className: clsx(classes.img, classes[size]) }}
        />
    );
};
