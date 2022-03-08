import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Popup from './Popup';

const theme = createTheme();

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <Popup />
    </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
