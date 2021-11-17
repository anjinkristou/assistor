/* eslint-disable import/no-anonymous-default-export */
import { ProductFamilyList } from './ProductFamilyList';
import { ProductFamilyCreate } from './ProductFamilyCreate';
import { ProductFamilyEdit } from './ProductFamilyEdit';
import { ProductFamilyShow } from './ProductFamilyShow';
import CategoryIcon from '@material-ui/icons/Category';

export default {
    list: ProductFamilyList,
    create: ProductFamilyCreate,
    edit: ProductFamilyEdit,
    show: ProductFamilyShow,
    icon: CategoryIcon,
};
