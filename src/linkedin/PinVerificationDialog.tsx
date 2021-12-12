import React, { useState } from 'react';
import { 
    TextField , 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { 
    useDataProvider, 
    useNotify, 
} from 'react-admin';



const PinVerificationDialog = ({open, onClose}: any) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [pin, setPin] = useState('');

    const handleSubmitPin = async () => {
        try {
            await dataProvider.verifyLoginLinkedin(pin);
            notify('Linkedin login successfull', 'info');
            onClose();
        } catch (error: any) {
            const message = error.message;
            notify('Linkedin login failed', 'warning');
        }
    }

    return (
        <Dialog 
            onClose={onClose} 
            open={open}
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle>Pin verification</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Check your email and insert the pin number in the field below.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="pin"
                label="Pin"
                type="string"
                fullWidth
                value={pin}
                onChange={e => setPin(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleSubmitPin} 
                    color="primary" 
                    autoFocus
                >
                    Submit
                </Button>
                <Button 
                    onClick={onClose} 
                    color="secondary" 
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PinVerificationDialog;