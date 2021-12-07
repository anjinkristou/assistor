import Reacct from 'react';
import {
    Select,
    MenuItem,
 } from '@material-ui/core';

const ChoiceSelector = (props: ChoiceSelectorProps) => {
    const { label, value, onChange, choices} = props;
    return (
        <Select
            label={label}
            value={value}
            onChange={(event:any) => onChange(event.target.value)}
        >
            <MenuItem value=""><em>None</em></MenuItem>
            {choices.map(choice => (
                <MenuItem
                    key={choice.id}
                    value={choice.id}
                >
                    {choice.name}
                </MenuItem>
            ))}
        </Select>
    );
};

interface Choice {
    id: string;
    name: String;
};

export interface ChoiceSelectorProps {
    label: string;
    value: string;
    onChange: any;
    choices: Choice[];
};

export default ChoiceSelector;