import { Box, Chip } from '@material-ui/core';
import { Tag } from '../types'

export const TagChip = ({ record }: { record: Tag; }) => (
    <>
        { record && (
                <Chip
                label={record.name}
                size="small"
                style={{
                    backgroundColor: record.color,
                    border: 0,
                    cursor: 'pointer',
                }}
            />
        )}
    </>
);