import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { adaptV4Theme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';



const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#537A5A'
    },
    secondary: {
      main: '#2A2A72'
    },
    tertiary: {
      default: "#F6AE2D"
    },
    background: {
      default: "#e4f0e2"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    fontFamily: 'Roboto'
  },
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
