import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "@/components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Accordionn from "./components/Accordionn";
import Profile from "./components/Profile";
import ChatBox from "./components/Chatroom/ChatBox";
import AddPost from "./components/AddPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard/reads" element={<Dashboard><Accordionn /></Dashboard>} />
        <Route path="/dashboard/profile" element={<Dashboard><Profile /></Dashboard>} />
        <Route path="/dashboard/chat" element={<Dashboard><ChatBox /></Dashboard>} />
        <Route path="/dashboard/add" element={<Dashboard><AddPost /></Dashboard>} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
