import React from 'react';
import Routes from './routes';
import { AuthProvider } from '../src/contexts/AuthContext';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
    <AuthProvider >
      <Routes />
    </AuthProvider>
  </Router>
  );
}

export default App;
