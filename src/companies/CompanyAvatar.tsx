import * as React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import clsx from 'clsx';

import { Company } from '../types';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: 'aliceblue',
        color: theme.palette.secondary.main,
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
}));

export const CompanyAvatar = ({
    record,
    size = 'large',
}: {
    record?: Company;
    size?: 'small' | 'large';
}) => {
    const classes = useStyles();
    if (!record) return null;
    if(!record.logo) return (
        <Avatar
            alt={record.name}
            className={classes.avatar}
        >
            <BusinessIcon />
        </Avatar>
    )
    return (
        <Avatar
            src={process.env.PUBLIC_URL + record.logo}
            alt={record.name}
            className={classes.avatar}
            imgProps={{ className: clsx(classes.img, classes[size]) }}
        />
    );
};
