import React, { createRef, useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Loading, useGetList, useRedirect, Identifier } from 'react-admin';
import { Avatar, CircularProgress, ClickAwayListener, LinearProgress, List, ListItem, ListItemAvatar, ListItemProps, ListItemText, ListSubheader, Menu, MenuItem, Paper, Popover, Popper, Typography } from '@material-ui/core';
import { GlobalHotKeys } from 'react-hotkeys';
import { CompanyAvatar } from '../companies/CompanyAvatar';
import { Company, Contact } from '../types';
import { LogoField } from '../companies/LogoField';
import { ContactAvatar } from '../contacts/ContactAvatar';

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
    
    const { data: companies, ids: companyIds, loading: companyLoading, error: companyError } = useGetList<Company>(
        'companies',
        { page: 1, perPage: 5 },
        { field: 'name', order: 'ASC' },
        { q: searchTerm },
        { enabled: searchTerm.length > 0 }
    );

    const { data: contacts, ids: contactIds, loading: contactLoading, error: contactError } = useGetList<Contact>(
      'contacts',
      { page: 1, perPage: 5 },
      { field: 'last_name', order: 'ASC' },
      { q: searchTerm },
      { enabled: searchTerm.length > 0 }
  );
    
    // if (loading) { return <Loading />; }
    if (companyError || contactError) { return <p>ERROR</p>; }

    const redirectTo = (destination: string, id: Identifier) => {
      redirect("show", `/${destination}`, id);
      setSearchTerm("");
    };

    const handleClickAway = () => {
      setSearchTerm("");
    };

    const showSearchResults = (searchTerm.length > 0);
    const isLoading = companyLoading || contactLoading;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          {isLoading 
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
              className={classes.searchList}
              square
            >
              <List 
                component="nav"
                dense
              >
                <CompanySearchItems
                  ids={companyIds}
                  data={companies}
                  loading={companyLoading}
                  onClick={(id: Identifier) => redirectTo("companies", id)}
                />
                <ContactSearchItems
                  ids={contactIds}
                  data={contacts}
                  loading={contactLoading}
                  onClick={(id: Identifier) => redirectTo("contacts", id)}
                />
              </List>
            </Paper>
          </ClickAwayListener>
        }
      </div>
    );
};

const CompanySearchItems = ({ids, data, onClick, loading}: any) => {
  const items = ids.length > 0 
    ? ids.map((id: Identifier) => (
      <ListItem key={id} button onClick={() => {onClick(id)}}>
        <ListItemAvatar>
          <LogoField record={data[id] as Company} />
        </ListItemAvatar>
        <ListItemText primary={data[id].name} />
      </ListItem>
    ))
    : <ListItem><ListItemText  primary="No match" /></ListItem>;
  const loader = <LinearProgress />
  return (
    <>
      <ListSubheader>Companies</ListSubheader>
      {loading
        ? loader
        : items
      }
    </>
  );
};

const ContactSearchItems = ({ids, data, onClick, loading}: any) => {
  const items =  ids.length > 0 
    ? ids.map((id: Identifier) => (
      <ListItem key={id} button onClick={() => {onClick(id)}}>
        <ListItemAvatar>
          <ContactAvatar record={data[id] as Contact} />
        </ListItemAvatar>
        <ListItemText primary={`${data[id].first_name} ${data[id].last_name}`} />
      </ListItem>
    ))
    : <ListItem><ListItemText  primary="No match" /></ListItem>;
  const loader = <LinearProgress />
  return (
    <>
      <ListSubheader>Contacts</ListSubheader>
      {loading
        ? loader
        : items
      }
    </>
  );
};

export default GlobalSearch;