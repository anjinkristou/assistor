import * as React from 'react';
import { useState } from 'react';
import {
    EditButton,
    ShowButton,
} from 'react-admin';
import { Box, Drawer, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    sideBig: {
        width: 250,
        minWidth: 250,
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            display: 'none',
        }
    },
    sideSmall: {
        [theme.breakpoints.up('sm')]:{
            display: 'none',
        }
    },
    drawerContent: {
         marginTop: theme.spacing(2),
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
         maxWidth: theme.spacing(32),
    }
}));

export const CollapsibleAside = ({
    basePath,
    record,
    link = 'edit',
    children,
}: {
    basePath: string,
    record?: any;
    children: any,
    link?: string;
}) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    if (!record) return null;

    const childrenWithProps = React.Children.map(children, child => 
        React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, { record })
        : child
    );

    return (
        <div className={classes.root}>
            <Box textAlign="center" mb={2}>
                {link === 'edit' ? (
                    <EditButton
                        basePath={basePath}
                        record={record}
                        label="Edit"
                    />
                ) : (
                    <ShowButton
                        basePath={basePath}
                        record={record}
                        label="Show"
                    />
                )}
            </Box>
            <div className={classes.sideBig}>
                {childrenWithProps}
            </div>
            <div className={classes.sideSmall}>
                <IconButton 
                    onClick={() => setOpen(true)}
                    color="secondary"
                >
                    <MenuOpenIcon />
                </IconButton>
            </div>
            <Drawer 
                anchor="right" 
                open={isOpen} onClose={() => setOpen(false)}
            >
                <div className={classes.drawerContent}>
                    {childrenWithProps}
                </div>
            </Drawer>
        </div>
    )
};
    
