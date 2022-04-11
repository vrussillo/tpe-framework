import { Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";

toast.configure();

const LogoutButton = ({ setAuth }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="logout-div">
        <button onClick={(e) => logout(e)} className="btn btn-outline-warning">
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default LogoutButton;
