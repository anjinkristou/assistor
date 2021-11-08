import React, { Component, ErrorInfo, HtmlHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, Container, Box } from '@material-ui/core';
import { CoreLayoutProps } from 'react-admin';

import { Notification, Error } from 'react-admin';
import Header from './Header';
import LeftDrawer from './LeftDrawer';

class Layout extends Component<LayoutProps, LayoutState> {
    state: LayoutState = {
        hasError: false,
        errorMessage: undefined,
        errorInfo: undefined,
        drawerOpen: false,
    };

    constructor(props: any) {
        super(props);
        /**
         * Reset the error state upon navigation
         *
         * @see https://stackoverflow.com/questions/48121750/browser-navigation-broken-by-use-of-react-error-boundaries
         */
        props.history.listen(() => {
            if (this.state.hasError) {
                this.setState({ hasError: false });
            }
        });
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            hasError: true,
            errorMessage: error,
            errorInfo,
        });
    }

    render() {
        const { theme, title, children } = this.props;
        const { hasError, errorMessage, errorInfo } = this.state;

        return (
            // @ts-ignore
            <ThemeProvider theme={createTheme(theme)}>
                <Box display="flex">
                    <CssBaseline />
                    <Header open={this.state.drawerOpen} setOpen={(state: boolean) => this.setState({drawerOpen: state})}/>
                    <LeftDrawer open={this.state.drawerOpen} setOpen={(state: boolean) => this.setState({drawerOpen: state})}/>
                    <Box flexGrow={1} height="100vh" overflow="auto">
                        <Box sx={{...theme?.mixins?.toolbar}} />
                        <Container maxWidth="lg">
                            <main id="main-content">
                                {hasError ? (
                                    <Error
                                        error={errorMessage as Error}
                                        errorInfo={errorInfo}
                                        title={title as string}
                                    />
                                ) : (
                                    children
                                )}
                            </main>
                        </Container>
                        <Notification />
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        title: PropTypes.node.isRequired,
    };
}

export interface LayoutProps
    extends CoreLayoutProps,
        Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'>,
        RouteComponentProps {}

export interface LayoutState {
    hasError: boolean;
    errorMessage?: Error;
    errorInfo?: ErrorInfo;
    drawerOpen: boolean;
}

// @ts-ignore
export default withRouter(Layout);
