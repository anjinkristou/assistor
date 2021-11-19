import Reacct, { useState, FormEvent } from 'react';
import {
    useCreateSuggestionContext,
    useCreate,
} from 'react-admin';
import {
    Dialog, 
    DialogContent,
    DialogActions,
    TextField,
    Button,
 } from '@material-ui/core';
 import { FamilyCategory } from '../types';

export const CreatePropertyType = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [name, setValue] = useState(filter || '');
    const [create] = useCreate('propertyTypes');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        create(
            {
                payload: {
                    data: {
                        name: name,
                    },
                },
            },
            {
                onSuccess: ({ data }: {data: FamilyCategory;}) => {
                    setValue('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label="New type name"
                        value={name}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};