import { Box, Chip } from '@material-ui/core';
import { Task } from '../types'
import { getStatus } from './status';

export const TaskChip = ({ record }: { record: Task; }) => {
    const statusItem = getStatus(record.status);
    const statusName = statusItem ? statusItem.name: '';
    const statusColor = statusItem ? statusItem.color: '#000'
    
    return (
         <>
            { record && (
                    <Chip
                    label={statusName}
                    size="small"
                    style={{
                        backgroundColor: statusColor,
                        border: 0,
                        cursor: 'pointer',
                    }}
                />
            )}
        </>
    );
};