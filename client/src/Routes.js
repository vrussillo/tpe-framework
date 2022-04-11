import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import Form from "./auth/Form";
import LoginForm from "./auth/LoginForm";
import Home from "./pages/Home";
import Contract from "./pages/Contract";
import Stats from "./pages/Stats";

function WebRoutes() {
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

  // const AuthSignUp = () => {
  //   return !isAuthenticated ? (
  //     <SignUpForm setAuth={setAuth} />
  //   ) : (
  //     <Navigate to="/login" />
  //   );
  // };

  const AuthLogin = () => {
    return !isAuthenticated ? (
      <LoginForm setAuth={setAuth} />
    ) : (
      <Navigate to="/stats" />
    );
  };

  // const AuthLogout = () => {
  //   return !isAuthenticated ? (
  //     <LogoutButton setAuth={setAuth} />
  //   ) : (
  //     <Navigate to="/" />
  //   );
  // };

  const AuthForm = (children) => {
    return isAuthenticated ? (
      <Form {...children} setAuth={setAuth} />
    ) : (
      <Navigate to="/login" />
    );
  };

  // const AuthAccount = (children) => {
  //   return isAuthenticated ? (
  //     <Account {...children} setAuth={setAuth} />
  //   ) : (
  //     <Navigate to="/login" />
  //   );
  // };

  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<AuthLogin />}></Route>
        <Route exact path="/home" element={<AuthLogin />}></Route>
        {/* <Route exact path="/logout" element={<AuthLogout />}></Route> */}
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/form/:id" element={<AuthForm />}></Route>
        <Route exact path="/contract" element={<Contract />}></Route>
        <Route exact path="/stats" element={<Stats />}></Route>
        <Route exact path="/login" element={<AuthLogin />}></Route>
      </Routes>
    </Fragment>
  );
}

export default WebRoutes;
