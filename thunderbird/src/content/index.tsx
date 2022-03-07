import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Content from './Content';

const theme = createTheme();

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <Content />
    </ThemeProvider>
    );
}

const kris2assisNode = document.createElement('DIV')
kris2assisNode.id = 'kris2assist'
document.body.insertBefore(kris2assisNode, document.body.firstChild)

ReactDOM.render(<App />, kris2assisNode);