import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/NavBar.css";
import LogoutButton from "../LogoutButton";
import { MenuItems } from "./MenuItems";

toast.configure();

const Navbar = () => {
  const [id, setId] = useState([]);
  const getEmployee = async (id) => {
    try {
      const res = await fetch(`/employee/${id}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      // setName(parseData.username);
      setId(parseData.id);
      // setEmail(parseData.email);
      // setProfile(parseData);
      // setProfile(users.filter((user) => user.id !== id));
      // console.log(parseData.id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);
  // const handleClick = () => {
  //   setState({ clicked: !state.clicked });
  // };

  {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/home"}>
              The Perfect Event
            </Link>

            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/form/${id}`}>
                  Form
                </Link>
              </li>
            </ul>

            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                {MenuItems.map((item, index) => {
                  return (
                    <li key={index} className="nav-item">
                      <Link
                        to={item.url}
                        onClick={item.stop}
                        className={item.cName}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                ></input>
                <button
                  id="search-btn"
                  className="btn btn-secondary my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            <LogoutButton />
          </div>
        </nav>
      </Fragment>
    );
  }
};

export default Navbar;

// export default NavBar;
