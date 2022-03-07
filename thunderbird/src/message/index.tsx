import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Message from './Message';

const theme = createTheme();

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <Message />
    </ThemeProvider>
    );
}


chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<App />, document.getElementById('root'));
});
