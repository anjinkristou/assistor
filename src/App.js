import * as React from "react";
import { Admin, Resource, ListGuesser, RouteWithoutLayout } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import authProvider from './authProvider';
import customRoutes from './customRoutes';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
    <Admin 
        customRoutes={customRoutes}
        dataProvider={dataProvider}
        authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default App;
