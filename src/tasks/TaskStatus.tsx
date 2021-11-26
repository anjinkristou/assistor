import * as React from 'react';
import { Box } from '@material-ui/core';

import { statuses } from './status';

export const TaskStatus = ({ status }: { status: string }) => {
    const statusItem = statuses.find(item => item.id === status)
    const statusColor = statusItem ? statusItem.color : "#000";
    return (
        <Box
            width={10}
            height={10}
            display="inline-block"
            borderRadius={5}
            bgcolor={statusColor}
            component="span"
        />
    );
};