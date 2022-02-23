import React, { createRef, useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { LinearProgress, Loading, useGetList, useRedirect, Identifier } from 'react-admin';
import { Avatar, CircularProgress, ClickAwayListener, List, ListItem, ListItemAvatar, ListItemProps, ListItemText, Menu, MenuItem, Paper, Popover, Popper } from '@material-ui/core';
import { GlobalHotKeys } from 'react-hotkeys';
import { CompanyAvatar } from '../companies/CompanyAvatar';
import { Company } from '../types';
import { LogoField } from '../companies/LogoField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      display: 'inlineBlock',
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
    searchList: {
      position: 'absolute',
      minWidth: theme.spacing(48),
      zIndex: 1,
      right: 0,
    }
  }),
);

const GlobalSearch = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const redirect = useRedirect();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const redirectTo = (id: Identifier) => {
      redirect("show", "/companies", id);
      setSearchTerm("");
    };

    const handleClickAway = () => {
      setSearchTerm("");
    };

    const showSearchResults = (searchTerm.length > 0) && (ids.length > 0) && !loading;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          {loading 
            ? <CircularProgress size={24} color="secondary" />
            : <SearchIcon />
          }
          
        </div>
        <InputBase
          placeholder="Search…"
          type="search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          autoFocus
          value={searchTerm}
          onChange={handleChange}
        />
        {showSearchResults &&
          <ClickAwayListener onClickAway={handleClickAway}>
              <Paper 
                className={classes.searchList} >
                <List component="nav">
                  {ids.map((id) => (
                    <ListItem key={id} button onClick={() => {redirectTo(id)}}>
                        <ListItemAvatar>
                          <LogoField record={data[id] as Company} />
                        </ListItemAvatar>
                        <ListItemText primary={data[id].name} />
                      </ListItem>
                    ))}
                </List>
              </Paper>
          </ClickAwayListener>
        }
      </div>
    );
};

export default GlobalSearch;