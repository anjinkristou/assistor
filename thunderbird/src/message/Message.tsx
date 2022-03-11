import React, { useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import Paper from "@mui/material/Paper";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { LinearProgress } from "@mui/material";

import Facebook from "@mui/icons-material/Facebook";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import { serverManager } from '../managers/serverManager'
import { ContactCard } from "./ContactCard";

declare var messenger: any

const Message = () => {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let tabs = await messenger.tabs.query({active: true, currentWindow: true});
      let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);
      let full = await messenger.messages.getFull(message.id);
      const authorEmail = message.author.substring(
        message.author.indexOf("<") + 1, 
        message.author.lastIndexOf(">")
      );

      setMessage(message);

      let [state, status] = await serverManager.getList("contacts", {email: authorEmail});
      if (!state){
        setErrorMessage(status);
        setIsLoading(false);
        return;
      }

      const {data: contacts, total: contact_cnt} = status;
      if(contact_cnt){
        setContact(contacts[0]);
      }
      
      setIsLoading(false);
    })();
  }, []);

  if(!message) return null;
  if(isLoading) return <LinearProgress sx={{minWidth: 300}}/>;

  const authorEmail = message.author.substring(
    message.author.indexOf("<") + 1, 
    message.author.lastIndexOf(">")
  );

  const authorName = message.author.substring(
    0,
    message.author.indexOf("<")
  );

  const withContact = <ContactCard contact={contact} />

  const withoutContact = (
    <Box sx={{display: 'block', padding: 1}}>
      <Box sx={{display: 'flex', gap: 2, marginBottom: 2}}>
        <Avatar />
        <Box sx={{display: 'block', minWidth: 200}}>
          <Typography variant="h6">{authorName}</Typography>
          <Typography variant="body2">{authorEmail}</Typography>
        </Box>
      </Box>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
        <Button variant="contained">Add contact</Button>
      </Stack>
    </Box>
  );
  return(
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {contact ? withContact : withoutContact }
    </>

  )
};

export default Message;