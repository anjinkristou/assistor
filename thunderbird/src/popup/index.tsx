import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme'

import Popup from './Popup';

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <Popup />
    </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
