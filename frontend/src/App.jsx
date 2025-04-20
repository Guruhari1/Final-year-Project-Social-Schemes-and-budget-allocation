import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ApplicationForm from "./pages/ApplicationForm";
import DataAnalytics from "./pages/DataAnalytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/apply/:schemeName" element={<ApplicationForm />} />
      <Route path="/analytics" element={<DataAnalytics />} />
    </Routes>
  );
}

export default App;
