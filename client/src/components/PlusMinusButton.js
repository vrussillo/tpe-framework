import { useState } from "react";

import "./../styles/PlusMinusButton.css";
import "./../styles/EventStaff.css";

function PlusMinusButton() {
  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  return (
    <div className="flex-parent jc-center">
      <div role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn-secondary-minus"
          onClick={decrementCount}
        >
          -
        </button>
      </div>
      <div className="count">{count}</div>
      <div role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn-secondary"
          onClick={incrementCount}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default PlusMinusButton;
