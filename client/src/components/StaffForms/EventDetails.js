function EventDetails({ formData, setFormData }) {
  return (
    <form className="form-entire">
      <fieldset>
        <div className="sub-entry-event-one">
          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Region
            </label>
            <select className="form-select" id="exampleSelect1">
              <option>LA</option>
              <option>OC</option>
              <option>SD</option>
              <option>SB</option>
              <option>SLO</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Event Date
              <input type="date" className="form-date"></input>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Client Type
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            ></input>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              College
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            ></input>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Wedding
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            ></input>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Corporate
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            ></input>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Prep
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            ></input>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Other
            </label>
          </div>
          <fieldset>
            <legend className="mt-4">Signer?</legend>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              ></input>
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              ></label>
            </div>
          </fieldset>

          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Client 1
            </label>
            <select className="form-select" id="exampleSelect1">
              <option>None</option>
              <option>Alpha Beta USC</option>
              <option>Alpha Beta UCLA</option>
              <option>Create New</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Client 2
            </label>
            <select className="form-select" id="exampleSelect1">
              <option>None</option>
              <option>Alpha Beta USC</option>
              <option>Alpha Beta UCLA</option>
              <option>ZETA UPSILON UCLA</option>
              <option>Create New</option>
            </select>
          </div>
        </div>

        <div className="sub-entry-event-two">
          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Event Type
            </label>
            <select className="form-select" id="exampleSelect1">
              <option>Formal</option>
              <option>Invite</option>
              <option>Exchange</option>
              <option>Philanthropy</option>
              <option>Destination</option>
              <option>Create New</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">
              Guest Count
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Quantity"
            ></input>
          </div>
          <fieldset className="form-group">
            <legend className="form-label mt-4">Ranges</legend>
            <label htmlFor="customRange3" className="form-label">
              Example Guest Count Range
            </label>
            <input
              type="range"
              className="form-range"
              name="rangeInput"
              min="0"
              max="5"
              step="0.5"
              id="customRange3"
            ></input>
          </fieldset>

          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Venue
            </label>
            <select className="form-select" id="exampleSelect1">
              <option>TBD</option>
              <option>Hollywood Bowl</option>
              <option>Westin Downtown</option>
              <option>Create New</option>
            </select>
          </div>
          <fieldset className="field-switches">
            <legend className="mt-5">Who Booked The Venue?</legend>
            <div className="div-booked">
              <legend className="mt-4">TPE</legend>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
              <legend className="mt-4">Client</legend>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
          </fieldset>
        </div>
      </fieldset>
    </form>
  );
}

export default EventDetails;
