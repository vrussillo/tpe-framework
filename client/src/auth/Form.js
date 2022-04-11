import { Fragment, useState } from "react";
// import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import EventDetails from "../components/StaffForms/EventDetails";
import VenueDetails from "../components/StaffForms/VenueDetails";
import EventStaff from "../components/StaffForms/EventStaff";
import Transportation from "../components/StaffForms/Transportation";
import Production from "../components/StaffForms/Production";

import "react-toastify/dist/ReactToastify.css";
import "../styles/Form.css";

toast.configure();

const Form = () => {
  const [page, setPage] = useState(0);
  // const [formData, setFormData] = useState({});

  const FormTitles = [
    "Event Details",
    "Venue Details",
    "Event Staff",
    "Transportation",
    "Production",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <EventDetails />;
    } else if (page === 1) {
      return <VenueDetails />;
    } else if (page === 2) {
      return <EventStaff />;
    } else if (page === 3) {
      return <Transportation />;
    } else {
      return <Production />;
    }
  };
  return (
    <Fragment>
      <div className="account-content"></div>
      <div className="form">
        <div className="progressbar">
          <div
            style={{
              width:
                page === 0
                  ? "20%"
                  : page === 1
                  ? "40%"
                  : page === 2
                  ? "60%"
                  : page === 3
                  ? "80%"
                  : "100%",
            }}
          ></div>
        </div>

        <div className="form-container">
          <div className="header">
            <div className="footer">
              <button
                disabled={page === 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
              <h1>
                {FormTitles[page]}
                <button
                  disabled={page === FormTitles.length - 1}
                  onClick={() => {
                    setPage((currPage) => currPage + 1);
                  }}
                >
                  Next
                </button>
              </h1>
            </div>
          </div>
          <div className="body">{PageDisplay()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Form;
