import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import {BrowserRouter} from 'react-router-dom';



const theme = createTheme(adaptV4Theme({
  palette: {
     primary: {
        main: '#AFD0BF'
               },
     secondary: {
        main: '#e2efde'
                }
           },
fontFamily: "Roboto"
}));

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
