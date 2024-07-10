import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterForm from "./components/Register/RegisterForm";
import LoginForm from "./components/Login/LoginForm";
import { AuthProvider } from "./context/AuthContext";
// import LogoutButton from "./components/Logout/LogoutButton";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoList from "./components/VideoList/VideoList";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/all-videos" element={<VideoList />} />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="/navbar" element={<Header />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
