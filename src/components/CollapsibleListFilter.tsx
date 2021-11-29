/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';


const useStyles = makeStyles(theme => ({
    root: {
        order: -1,
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
    container: {
        order: -1,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: '13em',
    },
    drawerContent: {
         marginTop: theme.spacing(2),
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
         maxWidth: theme.spacing(32),
    }
}));

export const CollapsibleListFilter = ({ children }: {children: any;}) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const childrenWithProps = React.Children.map(children, child => 
        React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, {})
        : child
    );
    return (
        <div className={classes.root}>
            <div className={classes.sideBig}>
                {childrenWithProps}
            </div>
            <div className={classes.sideSmall}>
                <IconButton 
                    onClick={() => setOpen(true)}
                    color="secondary"
                >
                    <ChevronRightIcon />
                </IconButton>
            </div>
            <Drawer 
                anchor="left" 
                open={isOpen} onClose={() => setOpen(false)}
            >
                <div className={classes.drawerContent}>
                    {childrenWithProps}
                </div>
            </Drawer>
        </div>
    );
};