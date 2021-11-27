import * as React from 'react';
import { useState, FormEvent } from 'react';
import {
    useRecordContext,
    useCreate,
    useUpdate,
    useRefresh,
    useNotify,
    useGetIdentity,
    Identifier,
    useResourceContext,
} from 'react-admin';
import { TextField as TextInput, Button, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { StatusSelector } from './StatusSelector';

type Props = {
    preview: Boolean;
}

const useStyles = makeStyles<Theme, Props>(theme => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
    },
    small: {
        marginRight: '1em',
        '& .MuiFilledInput-input': {
            paddingTop: 10,
        },
    },
    buttonSwitcher: {
        marginBottom: theme.spacing(1),
    },
    previewConatiner: {
        display: 'flex',
    },
    previewRaw: {
        flex: 1,
    },
    previewMarkdown: {
        flex: 1,
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        borderColor: theme.palette.primary.main,
        display: ({preview}) => (preview ? 'block' : 'none'),
    },
}));

export const NewNote = ({
    showStatus,
    reference,
}: {
    showStatus?: boolean;
    reference: 'companies' | 'contacts' | 'deals' | 'products';
}) => {
    const [preview, setPreview] = useState(false);
    const classes = useStyles({preview});
    const record = useRecordContext();
    const resource = useResourceContext();
    const [text, setText] = useState('');
    const [status, setStatus] = useState(record && record.status);
    const [date, setDate] = useState(getCurrentDate());
    const [create, { loading }] = useCreate();
    const [update] = useUpdate();
    // FIXME: use refetch instead when ReferenceManyField exposes it in the ListContext
    const refresh = useRefresh();
    const notify = useNotify();
    const { identity } = useGetIdentity();
    if (!record || !identity) return null;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: any = {
            [foreignKeyMapping[reference]]: record.id,
            sales_id: identity.id,
            date,
            text,
        };
        if (showStatus) {
            data.status = status;
        }
        update(
            reference,
            ((record && record.id) as unknown) as Identifier,
            {
                last_seen: date,
                status,
            },
            record
        );
        create(resource, data, {
            onSuccess: () => {
                setText('');
                notify('Note added successfully', 'info');
                refresh();
            },
        });
        return false;
    };
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <div className={classes.buttonSwitcher}>
                    <Button 
                        variant={preview ? "contained": "outlined"} 
                        color="primary"
                        onClick={()=> setPreview(!preview)}
                    >Markdown</Button>
                </div>
                <div className={classes.previewConatiner}>
                    <div className={classes.previewRaw}>
                        <TextInput
                            label="Add a note"
                            variant="filled"
                            size="small"
                            fullWidth
                            multiline
                            value={text}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setText(event.target.value)
                            }
                        />
                    </div>
                    <Paper className={classes.previewMarkdown}>
                        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
                    </Paper>
                </div>
                <div className={classes.toolbar}>
                    <span>
                        {text ? (
                            <>
                                {showStatus && (
                                    <StatusSelector
                                        status={status}
                                        setStatus={setStatus}
                                        className={classes.small}
                                    />
                                )}
                                <TextInput
                                    type="datetime-local"
                                    variant="filled"
                                    size="small"
                                    value={date}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setDate(event.target.value);
                                    }}
                                    className={classes.small}
                                />
                            </>
                        ) : null}
                    </span>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!text || loading}
                    >
                        Add this note
                    </Button>
                </div>
            </form>
        </div>
    );
};

const getCurrentDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, -8);
};

const foreignKeyMapping = {
    contacts: 'contact_id',
    deals: 'deal_id',
    companies: 'company_id',
    products: 'product_id',
};
