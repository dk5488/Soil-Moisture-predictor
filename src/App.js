import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Landing/Header';  // Import the Header component
import MyComponent from './component/Landing/MyComponent';
import HowItWorks from './component/Working/MyComponent';  // Import the How It Works component
import LoginSignUp from './component/Login/LoginForm';
import Dashboard from './component/Dashboard/Dashboard';
import DataCollectionPage from './component/Landing/dataCollection';
function App() {
  return (
    <Router>
      <Header />  
      <div className="App">
        <Routes>
          <Route path="/" element={<MyComponent />} />  
          <Route path="/how-it-works" element={<HowItWorks />} />  
          <Route path="/login-signup" element={<LoginSignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dataCollection" element={<DataCollectionPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
