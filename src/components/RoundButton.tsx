import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'inline-block',
        margin: 8,
    },
});

export const RoundButton = ({ color, handleClick, selected }: any) => {
    const classes = useStyles();
    return (
        <button
            type="button"
            className={classes.root}
            style={{
                backgroundColor: color,
                border: selected ? '2px solid grey' : 'none',
            }}
            onClick={handleClick}
        />
    );
};