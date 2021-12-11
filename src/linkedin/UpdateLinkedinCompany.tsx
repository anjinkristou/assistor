import Reacct, { useState, FormEvent } from 'react';
import {
    useCreateSuggestionContext,
    useCreate,
    useDataProvider,
    useUpdate,
    useRefresh,
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
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListItemSecondaryAction,
 } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { Company } from '../types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
    },
}));

interface ResponseData {
    company_size: string;
    company_type: string;
    founded: string;
    headquarters: string;
    industry: string;
    logo_url: string;
    overview: string;
    page_url: string;
    people: string;
    tag_line: string;
    title: string;
    website_url: string;
}

export const UpdateLinkedinCompany = ({ record }: { record: Company}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(false);
    const [data, setData] = useState<ResponseData>();
    const dataProvider = useDataProvider();
    const [checked, setChecked] = useState<string[]>([]);
    const [update, { loading: updating }] = useUpdate();
    const refresh = useRefresh();

    if(!record) return null;

    const onLoad = async () => {
        setLoading(true)
        setAvailable(false);
        try{
            const data: any = await dataProvider.fetchLinkedinCompany(record.id);
            setData(data.data as ResponseData);
            setAvailable(true);
        }
        catch(error) {

        }
        setLoading(false);
    };

    const onSave = async () => {
        const arrayData = checked.map(item => {
            if(item === 'name') return {field: item, value: data?.title};
            if(item === 'logo') return {field: item, value: data?.logo_url};
            if(item === 'website') return {field: item, value: data?.website_url};
        });

        await update(
            'companies',
            record.id,
            arrayData.reduce((a, x: any) => ({...a, [x.field]: x.value}), {}),
            record,
        );

        setOpen(false);
        refresh();
    }

    const onCancel = () => setOpen(false);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                size='small'
            >
                <LinkedInIcon />
            </IconButton>
            <Dialog open={open} onClose={onCancel}>
                {loading && <LinearProgress /> }
                <DialogTitle>Load properties from Linkedin Page</DialogTitle>
                    <DialogContent>
                    <List className={classes.root}>
                        <CompanyField field="name" checked={checked} onToggle={handleToggle} title="Title" value={data?.title} />
                        <CompanyField field="website" checked={checked} onToggle={handleToggle} title="Website" value={data?.website_url} />
                        <CompanyField field="logo" checked={checked} onToggle={handleToggle} title="Logo" value={data?.logo_url} />
                    </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onSave} disabled={!available || (checked.length === 0)}>Save</Button>
                        <Button onClick={onLoad} disabled={loading}>load</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </DialogActions>
            </Dialog>
        </>
    );
};

const CompanyField = ({field, checked, onToggle, title, value}: any) => {
    return (
        <ListItem dense button onClick={onToggle(field)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.indexOf(field) !== -1}
                    tabIndex={-1}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText primary={value} secondary={title}/>
        </ListItem>
    );
};