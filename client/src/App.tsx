import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import "./App.css";
import SavedPage from "./pages/SavedPage.tsx";
import ProfilePictureUpload from "./components/ProfilePictureUpload.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/profile-upload" element={<ProfilePictureUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
