import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { AudioProvider } from './context/AudioContext.jsx';
import './index.css';

const isAdminRoute = window.location.pathname.replace(/\/+$/, '').endsWith('/admin');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdminRoute ? (
      <AdminPage />
    ) : (
      <AudioProvider>
        <App />
      </AudioProvider>
    )}
  </React.StrictMode>
);
