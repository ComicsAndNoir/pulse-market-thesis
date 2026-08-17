import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { pulseTheme } from './theme/theme';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={pulseTheme}>
      {/* CssBaseline applies the MD3 dark surface + resets consistently. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
