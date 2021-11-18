import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import {
    ShowBase,
    ShowProps,
    TextField,
    ReferenceManyField,
    SelectField,
    ReferenceField,
    ImageField,
    useShowContext,
    useRecordContext,
    useListContext,
} from 'react-admin';
import {
    Avatar as MuiAvatar,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Tabs,
    Tab,
    Chip,
    Divider,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link as RouterLink } from 'react-router-dom';
import { NotesIterator } from '../notes';


import { ProductImageField } from './ProductImageField';
import { ProductAside } from './ProductAside';
import { Product, ProductPrperty } from '../types';

export const ProductShow = (props: ShowProps) => (
    <ShowBase {...props}>
        <ProductShowContent />
    </ShowBase>
);

const ProductShowContent = () => {
    const { record, loaded } = useShowContext<Product>();
    const [value, setValue] = useState(0);
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    if (!loaded || !record) return null;
    return (
        <Box mt={2} display="flex">
            <Box flex="1">
                <Card>
                    <CardContent>
                        <Box display="flex" mb={1}>
                            <ProductImageField record={record as any} />
                            <Box ml={2} flex="1">
                                <Box display="flex" gridGap={4}>
                                    <Typography variant="h5">{record.model}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                        >
                            <Tab
                                label={
                                    record.nb_notes === 1
                                        ? '1 Note'
                                        : `${record.nb_notes} Notes`
                                }
                            />
                            <Tab
                                label={
                                    record.nb_properties === 1
                                        ? '1 Specification'
                                        : `${record.nb_properties} Specifications`
                                }
                            />
                        </Tabs>
                        <Divider />
                        <TabPanel value={value} index={0}>
                            <ReferenceManyField
                                reference="productNotes"
                                target="product_id"
                            >
                                 <NotesIterator reference="products" />
                            </ReferenceManyField>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {/* <ReferenceManyField
                                reference="productProperties"
                                target="product_id"
                                sort={{ field: 'last_name', order: 'ASC' }}
                            >
                                <ProductPrpertiesIterator />
                            </ReferenceManyField> */}
                        </TabPanel>
                    </CardContent>
                </Card>
            </Box>
            <ProductAside record={record} />
        </Box>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
};

const ProductPrpertiesIterator = () => {
    const { data, ids, loaded } = useListContext<ProductPrperty>();
    const record = useRecordContext();

    const now = Date.now();
    if (!loaded) return null;
    return (
        <Box>
            <List>
                {ids.map(id => {
                    const productProperty = data[id];
                    return (
                        <ListItem
                            button
                            key={id}
                            component={RouterLink}
                            to={`/productProperties/${id}/show`}
                        >
                            {/* <ListItemAvatar>
                                <Avatar record={productProperty} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${productProperty.first_name} ${productProperty.last_name}`}
                                secondary={
                                    <>
                                        {productProperty.title}{' '}
                                        {productProperty.nb_notes &&
                                        `- ${productProperty.nb_notes} notes `}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="body2" color="textSecondary">
                                    last activity{' '}
                                    {formatDistance(
                                        new Date(productProperty.last_seen),
                                        now
                                    )}{' '}
                                    ago <Status status={productProperty.status} />
                                </Typography>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                    );
                })}
            </List>
            <Box textAlign="center" mt={1}>
                {/* <CreateRelatedProductPrpertyButton record={record} /> */}
            </Box>
        </Box>
    );
};

// const CreateRelatedProductPrpertyButton = ({ record }: any) => (
//     <Button
//         component={RouterLink}
//         to={{
//             pathname: '/productProperties/create',
//             state: { record: { product_id: record.id } },
//         }}
//         color="primary"
//         variant="contained"
//         size="small"
//         startIcon={<PersonAddIcon />}
//     >
//         Add property
//     </Button>
// );
