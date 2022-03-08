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


const OptionsPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {

  };
  

  return(
    <List
      subheader={<ListSubheader>Kris2Assistor Account</ListSubheader>}
    >
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
          <Button variant="outlined" onClick={handleLogin}>Login</Button>
        </Stack>
      </ListItem>
    </List>
  )
};

export default OptionsPanel;