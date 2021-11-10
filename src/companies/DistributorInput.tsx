import { AutocompleteInput, AutocompleteInputProps } from 'react-admin';

const DistributorInput = (props: AutocompleteInputProps) => (
    <AutocompleteInput 
        {...props}
        optionText={record => record ? record.country_iso ? `${record.name} (${record.country_iso})` : `${record.name}` : ''} 
        allowEmpty
        resettable
    />
);

export default DistributorInput;