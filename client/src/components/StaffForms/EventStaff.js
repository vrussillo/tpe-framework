import styled from "styled-components";
import React, {
  memo,
  useMemo,
  useState,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import { useForm, useField, splitFormProps } from "react-form";
import { useTable } from "react-table";
import { staffPricing } from "../../utils/StaffPricing";
import "../../styles/EventStaff.css";

// import QRCode from "qrcode.react";

const EventStaff = () => {
  const [totalCost, setTotalCost] = useState(0);
  return (
    <Main className="sub-entry-event-staff-one">
      <ReactForm totalCost={totalCost} setTotalCost={setTotalCost} />
    </Main>
  );
};

const TableInput = (props) => {
  // console.log("TableInput", props);
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return (
    <input
      className="form-control"
      id="form-control-staff"
      type="number"
      value={cell.value}
      onChange={onChange}
    />
  );
};

const TableTextInput = (props) => {
  // console.log("TableTextInput", props);
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return (
    <input
      className="form-control"
      id="form-control-staff"
      type="text"
      value={cell.value}
      onChange={onChange}
    />
  );
};

const TableTextLabel = (props) => {
  // console.log("TableTextInput", props);
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return <React.Fragment>{cell.value}</React.Fragment>;
};

const getFormattedTotal = (totalCost) => `$${totalCost.toFixed(2)}`;

// const getFormattedPrice = (row) => `$${row.toFixed(2)}`;

const ReactTable = memo((props) => {
  const { setTotalCost } = props;
  const columns = useMemo(
    () => [
      {
        Header: "Service Type",
        accessor: "label",
        Cell: TableTextLabel,
      },
      {
        Header: "Staff Type",
        accessor: "staff",
        Cell: TableTextInput,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: TableInput,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: TableInput,
      },
      {
        Header: "Total",
        accessor: (row) => row.price * row.quantity,
        id: "total",
      },
    ],
    []
  );

  const [data, setData] = useState(staffPricing);
  const resetData = () => setData(staffPricing);
  const addRow = () => setData((old) => [...old, { price: 0, quantity: 1 }]);
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

  useEffect(() => {
    setTotalCost(tableSum);
  }, [tableSum]);

  return (
    <>
      <thead className="t-head-style">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="th-style" {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <React.Fragment>
        <thead>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="tr-style" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="td-style" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}

          <tr className="tr-style-btn">
            <td className="td-style" colSpan={3}>
              <button
                className="btn btn-success"
                type="button"
                onClick={addRow}
              >
                Add Row
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={resetData}
              >
                Reset Table
              </button>
              <button className="btn btn-info" type="submit">
                Submit/Save
              </button>
            </td>
          </tr>
        </thead>
      </React.Fragment>
    </>
  );
});

const FormInput = forwardRef((props, ref) => {
  // console.log("FormInput", props);
  const [field, fieldOptions, rest] = splitFormProps(props);
  const inputField = useField(field, fieldOptions);
  const { meta, getInputProps } = inputField;
  const { error, isTouched, isValidating } = meta;
  return (
    <>
      <input
        className="input-style"
        key={props.field}
        {...getInputProps({ ref, ...rest })}
      />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

// const PaymentQRCode = styled(QRCode)`
//   padding: 5px;
//   align-self: flex-end;
// `;
const Notes = styled.input`
  min-height: 60px;
  flex: 1 1 auto;
  margin: 10px;
  padding: 5px;
`;
const ReactForm = (props) => {
  // console.log("ReactForm", props);
  const { totalCost, setTotalCost } = props;
  const defaultValues = useMemo(
    () => ({
      name: "USC",
      Region: "LA",
      notes: "gimme deets",
    }),
    []
  );
  const onSubmit = async (values, instance) => {
    // console.log("Form values:", values);
    instance.reset();
  };
  const form = useForm({ defaultValues, onSubmit });
  const { Form, values, meta } = form;
  const { isSubmitting, canSubmit } = meta;
  const required = useCallback((value) => (!value ? "Required!" : false), []);
  return (
    <Form className="event-form">
      <aside className="aside-style">
        <section className="section-style">
          <label className="label-style">
            Client:{" "}
            <FormInput
              className="form-control"
              id="form-control-staff-label"
              field="name"
            />
          </label>
          <label className="label-style">
            Region:
            <FormInput
              className="form-control"
              id="form-control-staff-label"
              field="Region"
              validate={required}
            />
          </label>
        </section>
        <section className="section-style">
          <div className="total-cost-style">
            Total Cost: {getFormattedTotal(totalCost)}
          </div>
          {/* <PaymentQRCode
              size={100}
              value={`US:${values.Region}?amount=${totalCost}`}
            /> */}
        </section>
      </aside>
      <label className="label-style">Itemized Costs:</label>
      <br />
      <table>
        <ReactTable setTotalCost={setTotalCost} />
      </table>
      <br />
      <aside className="aside-style">
        <section className="section-style">
          <label className="label-style">
            Notes:
            <Notes
              className="form-control"
              id="form-control-staff"
              as={FormInput}
              field="notes"
            />
          </label>
        </section>
        <section className="section-style">
          {isSubmitting ? "Submitting..." : null}
          <button
            className="btn btn-warning"
            type="submit"
            disabled={!canSubmit}
          >
            Reset Form
          </button>
        </section>
      </aside>
    </Form>
  );
};

const Main = styled.main`
  h1 {
    text-align: center;
  }
`;

export default EventStaff;
