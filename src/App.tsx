import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home/Home";
import SecretPage from "pages/SecretPage";
import ProtectedRoute from "components/ProtectedRoute";
import { useSelector } from "app/hooks";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "config/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Search from "pages/Search";

function App() {
  // const { user } = useSelector((state) => state.auth);

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              {/* <Route path="/login" element={<Login />} />
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
              /> */}
            </Routes>
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
