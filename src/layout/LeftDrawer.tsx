import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import { mainListItems, secondaryListItems } from './drawerItems'
import { BarItem } from '@nivo/bar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const LeftDrawer = ({open, setOpen}: any) => {
    const classes = useStyles();
    const match = useRouteMatch( ([] as any[])
      .concat(mainListItems, secondaryListItems)
      .filter(item => item.link !== '/')
      .map(item => item.link)
    );
    const currentPath = match?.path ?? '/';

    return (
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={() => setOpen(false)}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>
              {
                mainListItems.map((item: any, index: any) => (
                    <DraweItem 
                        key={index}
                        selected={currentPath === item?.link}
                        text={item?.text}
                        link={item?.link}
                        icon={item?.icon}
                    />
                ))
              }
            </List>
            <Divider />
            <List>
                <ListSubheader inset>Others</ListSubheader>
                {
                  secondaryListItems.map((item: any, index: any) => (
                      <DraweItem 
                          key={index}
                          selected={currentPath === item?.link}
                          text={item?.text}
                          link={item?.link}
                          icon={item?.icon}
                      />
                  ))
                }
            </List>
      </Drawer>
    );
};

const DraweItem = ({ text, link, icon, selected}: any) => (
    <ListItem 
        button
        selected={selected}
        component={RouterLink}
        to={link}
    >
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
);

export default LeftDrawer;