import * as React from "react";
import { RouteWithoutLayout } from 'react-admin';
import Register from './auth/RegisterPage';

export const customRoutes = [
    <RouteWithoutLayout exact path="/register" component={Register} />,
];