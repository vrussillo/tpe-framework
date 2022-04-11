import { useState } from "react";
import "../../styles/VenueDetails.css";

function VenueDetails() {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");

  const [selected, setSelected] = useState(false);
  const [amount, setAmount] = useState();

  return (
    <form className="form-entire">
      <fieldset>
        <div className="sub-entry-venue-one">
          <div className="form-group">
            <div className="div-time">
              <label>
                Start Time
                <input type="time" className="form-time"></input>
              </label>

              <label>
                End Time
                <input type="time" className="form-time"></input>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label mt-4">
              Rental
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Amount"
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Food
            </label>
            <select className="form-select" id="exampleSelect1">
              <option>None</option>
              <option>Appetizers (Chef's)</option>
              <option>Appetizers (Custom)</option>
              <option>Dinner (Custom)</option>
              <option>Custom</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exampleSelect1" className="form-label mt-4">
              Bar Details
            </label>
            <select
              className="form-select"
              id="exampleSelect1"
              selected={selected}
              onChange={() => {
                if (selected) {
                  setAmount(50);
                }
                setSelected(!selected);
              }}
            >
              <option>Cash And Carry Bar</option>
              <option>1 Hour Open Bar (Well Drinks and Beer Only)</option>
              <option>1.5 Hour Open Bar (Well Drinks and Beer Only)</option>
              <option>2 Hour Open Bar (Well Drinks and Beer Only)</option>
              <option>Drink Tickets</option>
              <option>Bar Tab Amount (Incl. Tax/Tip If Applicable)</option>
              <option>Non-Alcoholic Event</option>
            </select>
            <label className="mt-4" hidden={!selected}>
              How Many Tickets?
            </label>
            <input
              name="input"
              type="number"
              hidden={!selected}
              value={amount}
              onChange={(e) => setSelected(e.target.value)}
              className="form-control"
            ></input>
          </div>

          <fieldset className="field-switches">
            <legend className="mt-4">Hosted Bar?</legend>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={checked}
                onChange={() => {
                  if (checked) {
                    setText("");
                  }
                  setChecked(!checked);
                }}
              />
              <textarea
                name="input"
                type="text"
                hidden={!checked}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="form-control"
                id="exampleTextarea"
                rows="1"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                Bar Minimum
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Amount"
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                Client Risk
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Amount"
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                TPE Risk
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Amount"
              ></input>
            </div>
          </fieldset>
        </div>
        <div className="sub-entry-venue-two">
          <h1 className="venue-header">Hard Costs/Risk</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Cost</th>
                <th scope="col">Risk</th>
                <th scope="col">Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-warning">
                <th scope="row">UCLA</th>
                <td>$3600</td>
                <td>$1400</td>
                <td>$600</td>
              </tr>
              <tr className="table-success">
                <th scope="row">Table Header</th>
                <td>Column content</td>
                <td>Column content</td>
                <td>Column content</td>
              </tr>
              <tr className="table-success">
                <th scope="row">Table Header</th>
                <td>Column content</td>
                <td>Column content</td>
                <td>Column content</td>
              </tr>
              <tr className="table-success">
                <th scope="row">Table Header</th>
                <td>Column content</td>
                <td>Column content</td>
                <td>Column content</td>
              </tr>
              <tr className="table-success">
                <th scope="row">Table Header</th>
                <td>Column content</td>
                <td>Column content</td>
                <td>Column content</td>
              </tr>
              <tr className="table-success">
                <th scope="row">Table Header</th>
                <td>Column content</td>
                <td>Column content</td>
                <td>Column content</td>
              </tr>
              <tr className="table-success">
                <th scope="row">Table Header</th>
                <td>Column content</td>
                <td>Column content</td>
                <td>Column content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
    </form>
  );
}

const careerChoice = [
  "Cash And Carry Bar",
  "1 Hour Open Bar (Well Drinks and Beer Only)",
  "1.5 Hour Open Bar (Well Drinks and Beer Only)",
  "2 Hour Open Bar (Well Drinks and Beer Only)",
  "Drink Tickets",
  "Bar Tab Amount (Incl. Tax/Tip If Applicable)",
  "Non-Alcoholic Event",
];

export default VenueDetails;
