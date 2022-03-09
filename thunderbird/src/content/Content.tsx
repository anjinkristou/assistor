import React, { useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

declare var browser: any

const Content = () => {

  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let messageResponse = await browser.runtime.sendMessage({
        command: "getMessage",
      });
      // get the details back from the formerly serialized content
      const { message } = messageResponse;

      setMessage(message);
    })();
  
  }, []);

  const markUnread = async() => {
    browser.runtime.sendMessage({
      command: "markUnread",
      messageId: message.id
    });
  };

  if(!message) return null;

  const authorEmail = message.author.substring(
      message.author.indexOf("<") + 1, 
      message.author.lastIndexOf(">")
  );

  return(
    <Paper 
      sx={{
        padding: "0.25rem",
        marginBottom: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography sx={{flexGrow: 1}}>Author: {authorEmail}</Typography>
        <Button variant="contained" onClick={markUnread}>Mark unread</Button>
      </Box>
    </Paper>
  )
};

export default Content;