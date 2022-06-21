import React, { useState } from "react";
import { addBill } from "../service";
import AddBillItemComponent from "./AddBillItemComponent";

const NewBillComponent = (props) => {
  const { items, setReload } = props;

  const [billItems, setBillItems] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const addBillItem = (item) => {
    setBillItems((billItems) => [...billItems, item]);
  };

  const totalAmount = () => {
    return billItems.reduce(
      (acc, x) => acc + getItem(x.item).price * x.quantity,
      0
    );
  };

  const submitHandler = () => {
    if (billItems.length < 1) {
      alert("Add atleast one Items");
      return;
    }

    addBill({
      items: JSON.stringify(billItems),
      amount: totalAmount(),
    }).then(() => {
      setBillItems([]);
      setReload(true);
    });
  };

  const getItem = (id) => {
    return items.find((x) => x._id === id);
  };

  return (
    <React.Fragment>
      <div className="card p-2 section">
        <div className="row">
          <div className="col-lg-10 text-black text-bold h4">New Bill</div>
          <div className="col-lg-2">
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Add Item
            </button>
          </div>
        </div>

        <div className="list">
          <ul class="list-group">
            {billItems.length > 0 &&
              billItems.map((x, i) => (
                <li class="list-group-item mb-1 border border-1">
                  <div className="row">
                    <div className="col-lg-10">{getItem(x.item).name}</div>
                    <div className="col-lg-2">{getItem(x.item).price}</div>
                  </div>
                  <span className="text-gray">Quantity: {x.quantity}</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="row mb-0 text-bold">
          <div className="col-lg-5">Amount: Rs {totalAmount()}</div>
          <div className="col-lg-4">Total Items: {billItems.length}</div>
          <div className="col-lg-3">
            <button
              className="btn btn-primary align-right"
              onClick={() => submitHandler()}
            >
              {" "}
              Add Bill
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <AddBillItemComponent
          items={items}
          setModalOpen={setModalOpen}
          addBillItem={addBillItem}
        />
      )}
    </React.Fragment>
  );
};

export default NewBillComponent;
