import { 
    AutocompleteInput, 
    ReferenceInput, 
    SimpleFormIterator,
    SimpleFormIteratorProps, 
    TextInput, 
} from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { CreatePropertyType } from "./CreatePropertyType";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline-block',
        marginLeft: theme.spacing(1),
        width: '32%',
        minWidth: theme.spacing(10),
        '&.first-child': {
            marginLeft: 0,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            marginLeft: 0,
            width: '100%',
            margin: 0,
        }
    },
    
}));

export const PropertyFormIterator = (props: SimpleFormIteratorProps) => {
    const classes = useStyles();
    return (
        <SimpleFormIterator {...props} >
            <ReferenceInput
                source="type_id"
                reference="propertyTypes"
                label="Type"
                formClassName={classNames(classes.inline, 'first-child')}
                fullWidth
            >
                <AutocompleteInput 
                    optionText="name" 
                    create={<CreatePropertyType />}
                />
            </ReferenceInput>
            <TextInput 
                source="property_value" 
                label="Value"
                formClassName={classes.inline}
                fullWidth
            />
            <TextInput 
                source="condition"  
                label="Condition"
                formClassName={classes.inline}
                fullWidth
            />
        </SimpleFormIterator>
    );
};