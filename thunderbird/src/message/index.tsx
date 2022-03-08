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

ReactDOM.render(<App />, document.getElementById('root'));