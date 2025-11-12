import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import TestPage from "./pages/TestPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
  <Route path="/signin" element={<SignInPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
