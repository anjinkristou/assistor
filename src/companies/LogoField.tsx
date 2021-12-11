import React, { useState} from 'react';
import { Avatar, CircularProgress, IconButton } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { Identifier, useDataProvider, useRefresh, useUpdate } from 'react-admin';

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
    record?: { logo: string; name: string; id: Identifier; };
    source?: string;
    size?: 'small' | 'medium';
}) => {
    const classes = useStyles();
    const [imageBroken, setImageBroken] = useState(false);
    const [loading, setLoading] = useState(false);
    const dataProvider = useDataProvider();
    const [update, { loading: updating }] = useUpdate();
    const refresh = useRefresh();

    if (!record) return null;
    if(!record.logo) return (
        <Avatar>
            <BusinessIcon />
        </Avatar>
    )


    const handleClicked = async () => {
        setLoading(true)
        try{
            const response: any = await dataProvider.fetchLinkedinCompany(record.id);
            await update(
                'companies',
                record.id,
                {
                    logo: response.data.logo_url,
                },
                record,
            );
            setImageBroken(false);
            refresh();
        }
        catch(error) {

        }
        setLoading(false);
    }

    const onError = () => setImageBroken(true);
    return (
        <>
        {
        imageBroken
        ? loading 
        ? <CircularProgress />
        : <IconButton
        onClick={handleClicked}
    >
        <BrokenImageIcon />
    </IconButton>
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
