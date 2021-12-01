import * as React from 'react';
import { cloneElement, useState } from 'react';
import { 
    AutocompleteArrayInput,
    Edit,
    EditContextProvider,
    Identifier, 
    ReferenceArrayField, 
    ReferenceArrayInput, 
    SimpleForm, 
    SingleFieldList, 
    useEditController, 
    useGetList, 
    useGetMany, 
    useUpdate 
} from 'react-admin';

import {
    Chip,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Popover,
    Menu,
} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { Company, Product } from '../types';

export const ProductsListEdit = ({ 
    record,
    reference, 
}: { 
    record: Company;
    reference: 'companies';
}) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [version, setVersion] = useState(0); // used to force the refresh of useGetList without refreshing the whole page
    const [update] = useUpdate();



    const { data: products, loaded } = useGetMany('products', record.use_products, {
        enabled: record.use_products && record.use_products.length > 0,
    });

    const handleDeleteProduct = (id: Identifier) => {
        const products: Identifier[] = record.use_products.filter(
            (productId: Identifier) => productId !== id
        );
        update(reference, record.id, { use_products: products }, record);
    };

    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    if (!record) return null;

     return (
        <>
            {products.map(product => (
                <Box mt={1} key={product.id}>
                    <Chip
                        size="small"
                        variant="outlined"
                        onDelete={() => handleDeleteProduct(product.id)}
                        label={product.model}
                        style={{ backgroundColor: "#d4d4d4", border: 0 }}
                    />
                </Box>
            ))}
            <Box mt={1}>
                <Chip
                    icon={<ControlPointIcon />}
                    size="small"
                    variant="outlined"
                    onClick={handleOpen}
                    label="Add product"
                    color="primary"
                />
            </Box>
            {/* <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Edit 
                    basePath="/companies" 
                    resource={reference}
                >
                    <SimpleForm>
                        <ReferenceArrayInput source="use_products" reference="products" record={record}>
                            <AutocompleteArrayInput optionText="model" />
                        </ReferenceArrayInput>
                    </SimpleForm>
                </Edit>
            </Popover> */}
        </>
    );
}