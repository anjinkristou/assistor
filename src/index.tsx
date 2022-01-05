import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from "./serviceWorker";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

registerServiceWorker();

if (process.env.NODE_ENV !== 'production') {
    reportWebVitals(console.log);
}