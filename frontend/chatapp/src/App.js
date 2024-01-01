import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Registor from "./pages/Registor";
import Home from "./pages/Home";
import ForgotPSW from "./pages/ForgotPSW";

import { AuthContext } from "./context/Authcontext";
import { useContext } from "react";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (currentUser === null) {
      <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Registor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPSW" element={<ForgotPSW />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
