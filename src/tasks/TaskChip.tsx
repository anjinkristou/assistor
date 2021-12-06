import { Box, Chip } from '@material-ui/core';
import { Task } from '../types'
import { statuses } from './status';

export const TaskChip = ({ record }: { record: Task; }) => {
    const status = statuses.find(status => status.id == record.status);
    
    return (status
        ? <>
            { record && (
                    <Chip
                    label={status.name}
                    size="small"
                    style={{
                        backgroundColor: status.color,
                        border: 0,
                        cursor: 'pointer',
                    }}
                />
            )}
        </>
        : null
    );
};