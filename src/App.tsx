import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Register from "pages/Register";
import Dashboard from "pages/Dashboard";
import SecretPage from "pages/SecretPage";
import ProtectedRoute from "components/ProtectedRoute";
import { useSelector } from "app/hooks";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/secret"
            element={
              <ProtectedRoute
                allowed={user != null}
                redirect="/login"
                component={<SecretPage />}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
