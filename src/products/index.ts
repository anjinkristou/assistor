/* eslint-disable import/no-anonymous-default-export */
import { ProductList } from './ProductList';
import { ProductCreate } from './ProductCreate';
import { ProductShow } from './ProductShow';
import { ProductEdit } from './ProductEdit';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default {
    list: ProductList,
    create: ProductCreate,
    edit: ProductEdit,
    show: ProductShow,
    icon: FiberManualRecordIcon,
};
