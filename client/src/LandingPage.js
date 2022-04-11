import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import LoginForm from "./auth/LoginForm";

function LandingPage() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const AuthLogin = () => {
    return !isAuthenticated ? (
      <LoginForm setAuth={setAuth} />
    ) : (
      <Navigate to="/stats" />
    );
  };

  return (
    <Fragment>
      <Routes>
        <Route exact path="/login" element={<AuthLogin />}></Route>
      </Routes>
    </Fragment>
  );
}

export default LandingPage;
