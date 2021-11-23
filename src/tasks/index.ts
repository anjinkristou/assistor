/* eslint-disable import/no-anonymous-default-export */
import { TaskShow } from './TaskShow';
import { TaskList } from './TaskList';
import { TaskEdit } from './TaskEdit';
import { TaskCreate } from './TaskCreate';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

export default {
    list: TaskList,
    show: TaskShow,
    edit: TaskEdit,
    create: TaskCreate,
    icon: FormatListBulletedIcon,
};
