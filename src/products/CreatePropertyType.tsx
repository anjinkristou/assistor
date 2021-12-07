import Reacct, { useState, FormEvent } from 'react';
import {
    useCreateSuggestionContext,
    useCreate,
    ReferenceInput,
} from 'react-admin';
import {
    Dialog, 
    DialogContent,
    DialogActions,
    TextField,
    Button,
    DialogTitle,
    Select,
    MenuItem,
 } from '@material-ui/core';
 import { makeStyles } from '@material-ui/core/styles';
import { productProprtyCategories } from './productProprtyCategories';
import ChoiceSelector from '../components/ChoiceSelector';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export const CreatePropertyType = () => {
    const classes = useStyles();
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [category, setCategory] = useState('');
    const [name, setName] = useState(filter || '');
    const [unit, setUnit] = useState('');
    const [synonyms, setSynonyms] = useState('');
    const [create] = useCreate('propertyTypes');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        create(
            {
                payload: {
                    data: {
                        name: name,
                        unit: unit,
                        synonyms: synonyms,
                        category: category,
                    },
                },
            },
            {
                onSuccess: ({ data }: {data: any;}) => {
                    setName('');
                    setUnit('');
                    setSynonyms('');
                    setCategory('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <DialogTitle>Add new Product Property Type</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className={classes.root}>
                        <ChoiceSelector
                            label="Category"
                            value={category}
                            onChange={setCategory}
                            choices={productProprtyCategories}
                        />
                        <TextField
                            label="New type name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            autoFocus
                            required
                        />
                        <TextField
                            label="Unit"
                            value={unit}
                            onChange={event => setUnit(event.target.value)}
                        />
                        <TextField
                            label="Commma separated synonyms"
                            value={synonyms}
                            onChange={event => setSynonyms(event.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" disabled={!name}>Add</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};