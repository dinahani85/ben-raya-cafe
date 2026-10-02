import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './lib/toast';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LanguageProvider>
  </StrictMode>,
);
