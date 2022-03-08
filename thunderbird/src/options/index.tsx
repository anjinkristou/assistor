import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import OptionsPanel from './OptionsPanel';

const theme = createTheme();

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <OptionsPanel />
    </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
