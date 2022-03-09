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

export const ContactCard = ({contact}:{contact: any}) => {
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoading(true);
    
            let [state, status] = await serverManager.getList("companies", {id: contact.company_id});
            if (!state){
                setErrorMessage(status);
                setIsLoading(false);
                return;
            }

            const {data: companies, total: company_cnt} = status;
            if(company_cnt){
                setCompany(companies[0]);
            }
    
            
            setErrorMessage("");
            setIsLoading(false);
        })();
      }, []);

      
    if(!contact) return null;

    return (
        <Box sx={{display: 'block', padding: 1}}>
        <Box sx={{display: 'flex', gap: 2, marginBottom: 2}}>
          <Avatar src={contact.Avatar}/>
          <Box sx={{display: 'block', minWidth: 200}}>
            <Typography variant="h6">{contact.first_name} {contact.last_name}</Typography>
            <Typography variant="body1">{contact.title}</Typography>
            <Typography variant="body2">{contact.email}</Typography>
            {company
              ? <Typography variant="body1">{company.name}</Typography>
              : <LinearProgress />
            }
          </Box>
        </Box>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained">Note</Button>
          <Button variant="outlined">Action</Button>
        </Stack>
      </Box>
    )
}