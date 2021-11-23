import * as React from "react";
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Register from './auth/RegisterPage';
import Configuration from './configuration/Configuration';

export const customRoutes = [
    <RouteWithoutLayout exact path="/register" component={Register} />,
    <Route exact path="/configuration" render={() => <Configuration />} />,
];