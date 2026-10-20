import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applyAppearance, loadAppearance } from './config';
import './styles.css';
import './app.css';

// Before the first paint, so a dark appearance never flashes light.
applyAppearance(loadAppearance());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
