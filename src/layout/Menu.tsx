import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    ReduxState,
} from 'react-admin';


import SubMenu from './SubMenu';
import { AppState } from '../types';

import companies from '../companies';
import contacts from '../contacts';
import tasks from '../tasks';
import deals from '../deals';
import products from '../products';
import productFamilies from '../productFamilies';



type MenuName = 'menuCrm' | 'menuProduct' | 'menuCustomers';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuCrm: true,
        menuProduct: true,
        menuCustomers: true,
    });
    const translate = useTranslate();
    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const classes = useStyles();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div
            className={classnames(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open,
            })}
        >
            {' '}
            <DashboardMenuItem />
            <SubMenu
                handleToggle={() => handleToggle('menuCrm')}
                isOpen={state.menuCrm}
                name="CRM"
                icon={<companies.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/companies',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Companies"
                    leftIcon={<companies.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/contacts',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Contacts"
                    leftIcon={<contacts.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/deals',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Deals"
                    leftIcon={<deals.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/tasks',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Taks"
                    leftIcon={<tasks.icon />}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuProduct')}
                isOpen={state.menuProduct}
                name="Products"
                icon={<products.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/products',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Products"
                    leftIcon={<products.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/productFamilies',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Families"
                    leftIcon={<productFamilies.icon />}
                    dense={dense}
                />
            </SubMenu>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    open: {
        width: 200,
    },
    closed: {
        width: 55,
    },
}));

export default Menu;
