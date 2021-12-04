import * as React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, defaultTheme } from 'react-admin';
import {
    unstable_createMuiStrictModeTheme,
    createTheme,
} from '@material-ui/core/styles';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { Login, Layout } from './layout';
import contacts from './contacts';
import companies from './companies';
import products from './products';
import tasks from './tasks';
import productfamiliess from './productFamilies';
import deals from './deals';
import { Dashboard } from './dashboard/Dashboard';
import { customRoutes } from './customRoutes';
// import Login from './Login'
import productFamilies from './productFamilies';
import englishMessages from './i18n/en';

// FIXME MUI bug https://github.com/mui-org/material-ui/issues/13394
const theme =
    process.env.NODE_ENV !== 'production'
        ? unstable_createMuiStrictModeTheme(defaultTheme)
        : createTheme(defaultTheme);

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }
    
    if (locale === 'ja') {
        return import('./i18n/ja').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

const App = () => (
    <Admin
        customRoutes={customRoutes}
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={Login}
        layout={Layout}
        dashboard={Dashboard}
        theme={theme}
        i18nProvider={i18nProvider}
        disableTelemetry
    >
        <Resource name="deals" {...deals} />
        <Resource name="contacts" {...contacts} />
        <Resource name="companies" {...companies} />
        <Resource name="products" {...products} />
        <Resource name="productProperties" />
        <Resource name="propertyTypes" />
        <Resource name="contactNotes" />
        <Resource name="companyNotes" />
        <Resource name="productNotes" />
        <Resource name="dealNotes" />
        <Resource name="productFamilies" {...productFamilies} />
        <Resource name="tasks" {...tasks} />
        <Resource name="sales" list={ListGuesser} />
        <Resource name="tags" list={ListGuesser} />
        <Resource name="countries" list={ListGuesser} />
    </Admin>
);

export default App;
