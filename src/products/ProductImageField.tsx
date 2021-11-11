import * as React from 'react';
import { Avatar } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    image: {
        objectFit: 'contain',
    },
});

const sizeInPixel = {
    medium: 42,
    small: 20,
};

export const ProductImageField = ({
    record,
    source,
    size = 'medium',
}: {
    record?: { image: string; name: string };
    source?: string;
    size?: 'small' | 'medium';
}) => {
    const classes = useStyles();
    if (!record) return null;
    if(!record.image) return (
        <Avatar>
            <BusinessIcon />
        </Avatar>
    )
    return (
        <img
            src={process.env.PUBLIC_URL + record.image}
            alt={record.name}
            title={record.name}
            width={sizeInPixel[size]}
            height={sizeInPixel[size]}
            className={classes.image}
        />
    );
};
