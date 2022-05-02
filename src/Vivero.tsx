import React from 'react';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import AppRouter from "./routes/AppRouter";
import {BrowserRouter} from "react-router-dom";
 import {createTheme, ThemeProvider} from '@mui/material/styles';

function Vivero() {

    const theme = createTheme();

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <React.Suspense fallback={<h1>Loading</h1>} >
                    <BrowserRouter>
                        <AppRouter/>
                    </BrowserRouter>
                </React.Suspense>
            </ThemeProvider>
        </Provider>
    );
}

export default Vivero;
