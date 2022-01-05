import { ThemeName } from '../types';

export const SET_SW_REGISTRATION = 'SET_SW_REGISTRATION';

export const setServiceWorker = (sw: object) => ({
    type: SET_SW_REGISTRATION,
    payload: sw,
});