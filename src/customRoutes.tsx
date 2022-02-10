import * as React from "react";
import { RouteWithoutLayout } from 'react-admin';
import { Route } from 'react-router-dom';
import Register from './auth/RegisterPage';
import Configuration from './configuration/Configuration';
import { ProductStatsPage } from "./products/ProductStatsPage";

export const customRoutes = [
    <RouteWithoutLayout exact path="/register" component={Register} />,
    <Route exact path="/configuration" render={() => <Configuration />} />,
    <Route exact path="/products/stats" render={() => <ProductStatsPage />} />,
];