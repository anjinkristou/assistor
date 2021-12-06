import * as React from 'react';
import { Box } from '@material-ui/core';

import { getStatus } from './status';

export const TaskStatus = ({ status }: { status: string }) => {
    const statusItem = getStatus(status);
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