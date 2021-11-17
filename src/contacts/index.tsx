/* eslint-disable import/no-anonymous-default-export */
import { ContactShow } from './ContactShow';
import { ContactList } from './ContactList';
import { ContactEdit } from './ContactEdit';
import { ContactCreate } from './ContactCreate';
import ContactsIcon from '@material-ui/icons/Contacts';

export default {
    list: ContactList,
    show: ContactShow,
    edit: ContactEdit,
    create: ContactCreate,
    icon: ContactsIcon,
};
