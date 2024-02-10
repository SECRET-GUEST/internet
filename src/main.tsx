import React from 'react';
import { createRoot } from 'react-dom/client';
import Internet from './Internet';
import './index.css';

const rootElement = document.getElementById('root');
createRoot(rootElement!).render( // Utilisation du '!' pour indiquer que rootElement ne sera pas null
  <React.StrictMode>
    <Internet />
  </React.StrictMode>
);
