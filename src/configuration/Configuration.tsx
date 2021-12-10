import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useTranslate, useLocale, useSetLocale, Title } from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { changeTheme } from './actions';
import { AppState } from '../types';
import { 
    Card,
    CardContent,
    Tabs, 
    Tab,
} from '@material-ui/core';
import GeneralSettings from './GeneralSettings';
import UserSettings from './UserSettngs';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabPanel: {
        flexGrow: 1,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
            className={classes.tabPanel}
        >
            {children}
        </div>
    );
};

const Configuration = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
      };

    return (
        <Card>
            <CardContent className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="User" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <GeneralSettings />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserSettings />
                </TabPanel>
            </CardContent>
        </Card>
    );
};

export default Configuration;

