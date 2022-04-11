import { useState } from "react";
import { staffPricing } from "../../utils/StaffPricing.js";
import PlusMinusButton from "../PlusMinusButton.js";
import "../../styles/EventStaff.css";
import Invoice from "./TableInput";

function EventStaff() {
  const getFormattedPrice = (price) => `$${price.toFixed(2)}`;
  const [checked, setChecked] = useState(
    new Array(staffPricing.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedchecked = checked.map((item, index) =>
      index === position ? !item : item
    );

    setChecked(updatedchecked);

    const totalPrice = updatedchecked.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + staffPricing[index].price;
      }
      return sum;
    }, 0);

    setTotal(totalPrice);
  };

  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  // console.log(staffPricing[0].key);

  return (
    <div>
      <Invoice />

      <form className="form-entire">
        <fieldset>
          <div className="sub-entry-event-staff-one">
            <h3>Select Staff Pricing</h3>
            <div className="form-group"></div>

            <ul className="staff-pricing-list">
              {staffPricing.map(({ name, price, label, key }, index) => {
                return (
                  <li key={index}>
                    <label
                      htmlFor="exampleSelect1"
                      className="event-staff-label"
                    >
                      {label}
                    </label>
                    <div className="staff-pricing-list-item">
                      <div className="left-section">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          checked={checked[index]}
                          onChange={() => handleOnChange(index)}
                        />

                        <label htmlFor={`custom-checkbox-${index}`}>
                          {name}
                        </label>
                      </div>

                      <div className="right-section">
                        {getFormattedPrice(price * count)}
                      </div>
                    </div>

                    <div className="flex-parent jc-center">
                      <div role="group" aria-label="Basic example">
                        <button
                          type="button"
                          className="btn-secondary-minus"
                          onClick={() => {
                            if (checked) {
                              decrementCount();
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="count">{count}</div>
                      <div role="group" aria-label="Basic example">
                        <button
                          type="button"
                          className="btn-secondary"
                          // onClick={incrementCount}
                          onClick={() => {
                            if (checked[index]) {
                              incrementCount();
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li>
                <div className="staff-pricing-list-item">
                  <div className="left-section">Total:</div>
                  <div className="right-section">Qty: {count * 11}</div>
                  <div className="right-section">
                    {getFormattedPrice(total * count)}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="sub-entry-event-staff-two">
            <h3>Other</h3>
            <div className="form-group"></div>

            <ul className="staff-pricing-list">
              <li>
                <label htmlFor="exampleSelect1" className="event-staff-label">
                  What?
                </label>
                <div className="staff-pricing-list-item">
                  <div className="left-section">
                    <input className="input-event-staff" type="text" />
                  </div>

                  <div className="right-section">
                    {/* <label className="amount-label-event-staff">Amount</label> */}
                    <input
                      className="input-event-staff"
                      placeholder="amount"
                      type="number"
                    />
                  </div>
                </div>
                <div className="div-plus-minus-other">
                  <PlusMinusButton />
                </div>

                <div className="staff-pricing-list-item">
                  <div className="left-section">
                    <input className="input-event-staff" type="text" />
                  </div>

                  <div className="right-section">
                    {/* <label className="amount-label-event-staff">Amount</label> */}
                    <input
                      className="input-event-staff"
                      placeholder="amount"
                      type="number"
                    />
                  </div>
                </div>
                <div className="div-plus-minus-other">
                  <PlusMinusButton />
                </div>
              </li>

              <li>
                <div className="staff-pricing-list-item">
                  <div className="left-section">Total:</div>
                  <div className="right-section">
                    {getFormattedPrice(total)}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
export default EventStaff;
