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
    Select,
    MenuItem,
    Box,
    DialogTitle,
 } from '@material-ui/core';
 import { ProductCategory } from '../types';
import ChoiceSelector from '../components/ChoiceSelector';

export const CreateProductCategory = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [name, setName] = useState(filter || '');
    const [category, setCategory] = useState('');
    const [website, setWebsite] = useState('');
    const [image, setImage] = useState('');
    const [create] = useCreate('productFamilies');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        create(
            {
                payload: {
                    data: {
                        name: name,
                        image: image,
                        website: website,
                        category: category,
                    },
                },
            },
            {
                onSuccess: ({ data }: {data: ProductCategory;}) => {
                    setName('');
                    setImage('');
                    setWebsite('');
                    setCategory('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <DialogTitle>New Product Category</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box display="flex" flexDirection="column">
                        <TextField
                            label="New category name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            autoFocus
                        />
                        <TextField
                            label="Website"
                            value={website}
                            onChange={event => setWebsite(event.target.value)}
                            autoFocus
                        />
                        <TextField
                            label="Image"
                            value={image}
                            onChange={event => setImage(event.target.value)}
                            autoFocus
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};