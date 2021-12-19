/* eslint-disable import/no-anonymous-default-export */
import { ProductCategoryList } from './ProductCategoryList';
import { ProductCategoryCreate } from './ProductCategoryCreate';
import { ProductCategoryEdit } from './ProductCategoryEdit';
import { ProductCategoryShow } from './ProductCategoryShow';
import CategoryIcon from '@material-ui/icons/Category';

export default {
    list: ProductCategoryList,
    create: ProductCategoryCreate,
    edit: ProductCategoryEdit,
    show: ProductCategoryShow,
    icon: CategoryIcon,
};
