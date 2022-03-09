import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme'

import OptionsPanel from './OptionsPanel';


const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <OptionsPanel />
    </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
