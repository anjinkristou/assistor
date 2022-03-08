import React, { useEffect } from "react";
import Typography from '@mui/material/Typography';

import { contactManager } from '../managers/contactManager';

declare var browser: any

const Popup = () => {

  useEffect(()=>{
    (async () => {
      const matchingCards = await contactManager.get("y-matsuoka@hokuyo-aut.co.jp")
      console.log(matchingCards);
    })();
  }, [])

  return(
    <Typography>Hello Popup</Typography>
  )
};

export default Popup;