import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core';
import Home from './components/home';
import Layout from './components/layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gameSession" element={<GameSession />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const theme = createTheme({
  palette: {
     primary: {
        main: '#AFD0BF'
               },
     secondary: {
        main: '#e2efde'
                }
           },
fontFamily: "Roboto"
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
