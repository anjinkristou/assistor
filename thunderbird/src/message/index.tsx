import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme'

import Message from './Message';

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <Message />
    </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));