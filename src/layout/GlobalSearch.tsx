import React, { useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { LinearProgress, Loading, useGetList, useRedirect } from 'react-admin';
import { Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Popover, Popper } from '@material-ui/core';
import { GlobalHotKeys } from 'react-hotkeys';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

const GlobalSearch = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const redirect = useRedirect();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSearchTerm(event.target.value);
    };
    
    const { data, ids, loading, error } = useGetList(
        'companies',
        { page: 1, perPage: 10 },
        { field: 'name', order: 'ASC' },
        { q: searchTerm },
        { enabled: searchTerm.length > 0 }
    );
    
    // if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }
    
    const handleSearchClick = (id: any) => {
        setAnchorEl(null);

        redirect(`/companies/${id}/show`);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const keyMap = { SEARCH_HOTKEYS: "command+f" };
    const handlers = { SEARCH_HOTKEYS: () => console.log("test") };

    return (
      <>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />;
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              {loading 
                ? <CircularProgress size={24}/>
                : <SearchIcon />
              }
              
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              autoFocus
              onChange={handleChange}
            />
          </div>
          <Menu
            open={!loading && Boolean(anchorEl) && (ids.length > 0) && (searchTerm.length > 0)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
              {ids.map((id) => (
                <MenuItem key={id} onClick={() => handleSearchClick(id)}>
                  <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={data[id].name} />
                </MenuItem>
              ))}
          </Menu>
      </>
    );
};

export default GlobalSearch;