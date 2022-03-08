import React, { useEffect, useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";
import axios, { AxiosError } from 'axios';
import Alert from '@mui/material/Alert';

const baseURL = "http://kris2assistor.herokuapp.com/auth";


interface LoginToken {
  access_token: string;
  refresh_token: string;
}

const OptionsPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      let { username, password } = await messenger.storage.local.get({ username: "", password: "" });
      setUsername(username);
      setPassword(password);
    })();

  }, []);

  const handleSave = async () => {
    await messenger.storage.local.set({ username, password });
  };

  const handleLogin = async () => {
    setLoading(true);
    try{
      let storedData = await messenger.storage.local.get({});

      const response = await axios.post<LoginToken>(`${baseURL}/login`, { username, password })
      const { access_token, refresh_token } = response.data;
      
     
      await messenger.storage.local.set({ ...storedData, access_token, refresh_token});
      setErrorMessage("");
      setSuccessMessage("Logged in to Kris2Assistor");
    } catch (error: any) {
        let message = error.message;
        if(error.response){
          const response = error.response;
          message = response.data.msg;
        }
        setSuccessMessage("");
        setErrorMessage(message);
    }

    setLoading(false);

  };
  

  return(
    <List
      subheader={<ListSubheader>Kris2Assistor Account</ListSubheader>}
    >
    {successMessage && <Alert severity="success">{successMessage}</Alert>}
    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <ListItem>
        <TextField
          id="input-with-icon-textfield"
          label="Username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
      <ListItem>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleSave}>Save</Button>
          <Button 
            variant="outlined" 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading &&<CircularProgress size={18} sx={{marginRight: "0.5em"}}/>}
            Login
          </Button>
        </Stack>
      </ListItem>
    </List>
  )
};

export default OptionsPanel;