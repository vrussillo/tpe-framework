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


// EventStaff.js


// TableInput.js


import styled, { createGlobalStyle } from "styled-components";
import { memo, useMemo, useState, forwardRef, useCallback } from "react";
import { useForm, useField, splitFormProps } from "react-form";
import { useTable } from "react-table";
import QRCode from "qrcode.react";

const TableInput = (props) => {
  console.log("TableInput", props);
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return <input type="number" value={cell.value} onChange={onChange} />;
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    width: 30%;
    text-align: center;
    border: 1px solid lightgray;
    padding: 5px;
  }
`;
const ReactTable = memo((props) => {
  console.log("ReactTable", props);
  const { setAmountDue } = props;
  const columns = useMemo(
    () => [
      {
        Header: "Cost (US)",
        accessor: "cost",
        Cell: TableInput,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: TableInput,
      },
      {
        Header: "Total (US)",
        accessor: (row) => row.cost * row.quantity,
        id: "total",
      },
    ],
    []
  );
  const initialData = [
    {
      cost: 1,
      quantity: 2,
    },
    {
      cost: 3,
      quantity: 4,
    },
  ];
  const [data, setData] = useState(initialData);
  const resetData = () => setData(initialData);
  const addRow = () => setData((old) => [...old, { cost: 5, quantity: 6 }]);
  const updateData = (rowIndex, columnID, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: value,
          };
        }
        return row;
      })
    );
  };
  const table = useTable({ columns, data, updateData });
  const { getTableProps, headerGroups, rows, prepareRow } = table;
  const tableSum = rows.reduce((sum, row) => sum + row.values.total, 0);
  console.log("setAmountDue", tableSum);
  setAmountDue(tableSum);
  return (
    <>
      <label>Itemized Costs:</label>
      <br />
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={3}>
              <button type="button" onClick={addRow}>
                Add Row
              </button>
              <button type="button" onClick={resetData}>
                Reset Table
              </button>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
});

const StyledInput = styled.input`
  flex: 1 1 auto;
  margin: 5px;
  padding: 5px;
`;
const FormInput = forwardRef((props, ref) => {
  console.log("FormInput", props);
  const [field, fieldOptions, rest] = splitFormProps(props);
  const inputField = useField(field, fieldOptions);
  const { meta, getInputProps } = inputField;
  const { error, isTouched, isValidating } = meta;
  return (
    <>
      <StyledInput key={props.field} {...getInputProps({ ref, ...rest })} />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

const FormStyles = styled.div`
  form {
    margin: 10px;
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    aside {
      display: flex;
      justify-content: space-between;
    }
    section {
      flex: 1 1 auto;
      display: flex;
      flex-flow: column nowrap;
    }
    button {
      margin: 5px;
      padding: 5px;
      width: 100px;
      align-self: flex-end;
    }
  }
`;
const AmountDue = styled.label`
  margin: 10px;
  font-size: 1.5em;
  align-self: flex-end;
`;
const PaymentQRCode = styled(QRCode)`
  padding: 5px;
  align-self: flex-end;
`;
const Notes = styled(StyledInput)`
  min-height: 50px;
`;
const ReactForm = (props) => {
  console.log("ReactForm", props);
  const { amountDue, setAmountDue } = props;
  const defaultValues = useMemo(
    () => ({
      name: "Rion",
      USAddress: "XejcYRj8raPPbS64Usj62JgCiuWKYDtyKJ",
      notes: "Payment terms: Net 30",
    }),
    []
  );
  const onSubmit = async (values, instance) => {
    console.log("Form values:", values);
    instance.reset();
  };
  const form = useForm({ defaultValues, onSubmit });
  const { Form, values, meta } = form;
  const { isSubmitting, canSubmit } = meta;
  const required = useCallback((value) => (!value ? "Required!" : false), []);
  return (
    <FormStyles>
      <Form>
        <aside>
          <section>
            <label>
              Name: <FormInput field="name" />
            </label>
            <label>
              Address:
              <FormInput field="USAddress" validate={required} />
            </label>
          </section>
          <section>
            <AmountDue>Amount Due: {amountDue} US</AmountDue>
            <PaymentQRCode
              size={100}
              value={`US:${values.USAddress}?amount=${amountDue}`}
            />
          </section>
        </aside>
        <ReactTable setAmountDue={setAmountDue} />
        <br />
        <aside>
          <section>
            <label>
              Notes: <Notes as={FormInput} field="notes" />
            </label>
          </section>
          <section>
            {isSubmitting ? "Submitting..." : null}
            <button type="submit" disabled={!canSubmit}>
              Reset Form
            </button>
          </section>
        </aside>
      </Form>
    </FormStyles>
  );
};

const Main = styled.main`
  border-radius: 5px;
  padding: 10px;
  background: white;
  h1 {
    text-align: center;
  }
`;
const Invoice = (props) => {
  console.log("Invoice", props);
  const [amountDue, setAmountDue] = useState(0);
  return (
    <Main>
      <h1>Invoice</h1>
      <ReactForm amountDue={amountDue} setAmountDue={setAmountDue} />
    </Main>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    font: 1em sans-serif;
    margin: 15px;
    background: lightgray;
  }
`;

export default Invoice;
// const App = (props) =>
//   console.log("App", props) || (
//     <>
//       <GlobalStyles />
//       <Invoice />
//     </>
//   );

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
