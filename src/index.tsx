import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from './layouts/Admin';
import { makeServer } from 'mocks/mirageServer';
import MobileModeProvider from 'MobileModeContext';

// If using a mock server for testing
//if (process.env.NODE_ENV === 'development') makeServer();

const baseURL = process.env.REACT_APP_BASE_URL || ''; // Access the environment variable

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MobileModeProvider>
      <BrowserRouter basename={`/${baseURL}`}>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/" element={<Navigate to="/admin/animals" />} />
        </Routes>
      </BrowserRouter>
    </MobileModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
