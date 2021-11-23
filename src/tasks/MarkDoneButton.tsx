// in ./MarkDoneButton.js
import * as React from 'react';
import { BulkUpdateButton, BulkActionProps } from 'react-admin';
import DoneIcon from '@material-ui/icons/Done';

const doneState = { status: 'Done' };

const MarkDoneButton = (props: BulkActionProps) => (
    <BulkUpdateButton
        {...props}
        label="Mark checked"
        data={doneState}
        icon={<DoneIcon/>}
    />
);

export default MarkDoneButton;