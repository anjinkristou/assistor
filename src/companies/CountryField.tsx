import * as React from 'react';
import { Theme } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';
import { ImageField } from 'react-admin';

export interface StyleProps {
    width: number;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    image: {
        width: props => props.width
    },
}));

const sizeInPixel = {
    medium: 42,
    small: 20,
};

export const CountryField = ({
    record,
    source="url",
    title="nicename",
    size = 'medium',
}: {
    record?: { logo: string; name: string };
    source?: string;
    title?: string;
    size?: 'small' | 'medium';
}) => {
    const classes = useStyles({width: sizeInPixel[size]});
    if (!record) return null;

    return (
        <ImageField 
            record={record as any}
            source={source} 
            title={title}
            classes={classes}
        />
    );
};
