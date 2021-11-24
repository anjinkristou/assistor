// in ./MarkDoneButton.js
import * as React from 'react';
import { Button, useListContext } from 'react-admin';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Company } from '../types';

const doneState = { status: 'Done' };

const SelectAllButton = () => {
    const { ids, data, onSelect } = useListContext<Company>();
    return (
        <Button
            onClick={(e:any) =>{
                e.stopPropagation();
                onSelect(ids);
            }}
            label="Select All"
        >
            <DoneAllIcon />
        </Button>
    );
};

export default SelectAllButton;