import * as React from 'react';
import { Avatar as MuiAvatar } from '@material-ui/core';

import { ProductFamily } from '../types';

export const Avatar = ({ record }: { record: ProductFamily }) => (
    <MuiAvatar src={record.image}>
        {record.name}
    </MuiAvatar>
);
