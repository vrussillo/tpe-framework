import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
// import LandingPage from "./LandingPage";
import WebRoutes from "./Routes";
import "./styles/App.css";
import "bootswatch/dist/lux/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <WebRoutes />
        </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
