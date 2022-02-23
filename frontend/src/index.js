import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import Home from './components/home';
import Layout from './components/layout';
import StartingSurvey from './components/startingSurvey'
import GameSession from './components/gameSession';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="startingSurvey" element={<StartingSurvey />} />
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
