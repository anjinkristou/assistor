import React, { useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

declare var messenger: any

const Message = () => {
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [received, setReceived] = useState("");

  useEffect(() => {
    (async () => {
      let tabs = await messenger.tabs.query({active: true, currentWindow: true});
      let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);
      let full = await messenger.messages.getFull(message.id);

      setSubject(message.subject);
      setFrom(message.author);
      setReceived(full.headers.received[0]);
    })();
  }, []);

  return(
    <Container component="main" maxWidth="xs">
    <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 6fr'
        }}
      >
        <Typography variant="h5">Subject:</Typography><Typography>{subject}</Typography>
        <Typography variant="h5">From:</Typography><Typography>{from}</Typography>
        <Typography variant="h5">Received-Header:</Typography><Typography>{received}</Typography>
      </Box>
    </Container>
  )
};

export default Message;