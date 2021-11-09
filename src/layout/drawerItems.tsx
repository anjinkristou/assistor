import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactsIcon from '@material-ui/icons/Contacts';
import BusinessIcon from '@material-ui/icons/Business';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export const mainListItems = [
    {
        text: "Dashboard",
        link: "/",
        icon: (<DashboardIcon />)
    },
    {
        text: "Contacts",
        link: "/contacts",
        icon: (<ContactsIcon />)
    },
    {
        text: "Companies",
        link: "/companies",
        icon: (<BusinessIcon />)
    },
    {
        text: "Deals",
        link: "/deals",
        icon: (<MonetizationOnIcon />)
    },
]

export const secondaryListItems = []