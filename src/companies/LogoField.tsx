import React, { useState} from 'react';
import { Avatar } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const useStyles = makeStyles({
    image: {
        objectFit: 'contain',
    },
});

const sizeInPixel = {
    medium: 42,
    small: 20,
};

export const LogoField = ({
    record,
    source,
    size = 'medium',
}: {
    record?: { logo: string; name: string };
    source?: string;
    size?: 'small' | 'medium';
}) => {
    const classes = useStyles();
    const [imageBroken, setImageBroken] = useState(false);
    if (!record) return null;
    if(!record.logo) return (
        <Avatar>
            <BusinessIcon />
        </Avatar>
    )

    const onError = () => setImageBroken(true);
    return (
        <>
        {
        imageBroken
        ? <Avatar>
            <BrokenImageIcon />
        </Avatar>
        : <img
            src={process.env.PUBLIC_URL + record.logo}
            alt={record.name}
            title={record.name}
            width={sizeInPixel[size]}
            height={sizeInPixel[size]}
            className={classes.image}
            onError={onError}
        />
        }
        </>
    );
};
