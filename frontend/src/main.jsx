import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { PetProvider } from './context/PetContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>  
      </BrowserRouter>
    </PetProvider>
  </React.StrictMode>
);