import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { pulseTheme } from './theme/theme';
import { initAnalytics } from './lib/analytics';
import App from './App';
import './index.css';

initAnalytics();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={pulseTheme}>
      {/* CssBaseline applies the MD3 dark surface + resets consistently. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
