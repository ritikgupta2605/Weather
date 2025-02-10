import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import WeatherDashboard from "./pages/WeatherDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<WeatherDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
