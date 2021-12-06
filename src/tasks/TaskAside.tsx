import * as React from 'react';
import {
    TextField,
    EmailField,
    DateField,
    ReferenceManyField,
    EditButton,
    ShowButton,
    useListContext,
    ReferenceField,
    FunctionField,
} from 'react-admin';
import { Box, Typography, Divider, List, ListItem } from '@material-ui/core';
import { TagsListEdit } from '../tags/TagsListEdit';

import { Task } from '../types';
import { CollapsibleAside } from '../components/CollapsibleAside';

export const TaskAside = ({
    record,
    link = 'edit',
    ...props
}: {
    record?: Task;
    link?: string;
}) => {
    if (!record) return null;

    return (
        <CollapsibleAside record={record} link={link} basePath="/tasks">
            <AsideContent />
        </CollapsibleAside>
    );
};

const AsideContent = ({ 
    record 
}: { 
    record?: Task;
}) => 
    record ? (
        <>
        </>
    ) : null;