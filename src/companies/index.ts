/* eslint-disable import/no-anonymous-default-export */
import { CompanyList } from './CompanyList';
import { CompanyCreate } from './CompanyCreate';
import { CompanyShow } from './CompanyShow';
import { CompanyEdit } from './CompanyEdit';
import BusinessIcon from '@material-ui/icons/Business';

export default {
    list: CompanyList,
    create: CompanyCreate,
    edit: CompanyEdit,
    show: CompanyShow,
    icon: BusinessIcon,
};
