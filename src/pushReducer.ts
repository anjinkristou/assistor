import { Reducer } from 'redux';
import { SET_SW_REGISTRATION, setServiceWorker } from './pushNotification/actions';
import { PushNotification } from './types';

type State = PushNotification;
type Action =
    | ReturnType<typeof setServiceWorker>
    | { type: 'OTHER_ACTION'; payload?: any };

const themeReducer: Reducer<State, Action> = (
    previousState = {registration: null},
    action
) => {
    if (action.type === SET_SW_REGISTRATION) {
        return {...previousState, registration: action.payload};
    }
    return previousState;
};

export default themeReducer;