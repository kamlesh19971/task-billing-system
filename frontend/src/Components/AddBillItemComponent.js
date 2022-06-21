import React, { useState } from "react";

const AddBillItemComponent = (props) => {
  const { addBillItem, items, setModalOpen } = props;
  const [item, setItem] = useState({ item: "", quantity: 1 });

  const changeHandler = (e) => {
    setItem(Object.assign({}, item, { [e.target.name]: e.target.value }));
  };

  const submitHandler = () => {
    if (!item.item || item.item.trim() === "") {
      alert("Please Select Item");
      return;
    }

    if (!item.quantity || +item.quantity < 1) {
      alert("Please Quantity should be atleast 1");
      return;
    }

    addBillItem(item);

    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <div class="modal d-block" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div className="p-2">
              <lable className="text-gray h6 text-gray">Select Item</lable>

              <select
                className="form-control mt-2"
                name="item"
                id="item"
                placeholder="Name"
                value={item.item}
                onChange={changeHandler}
              >
                <option>Select</option>
                {items.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </select>

              <input
                type={"number"}
                className="form-control mt-1"
                name="quantity"
                id="quantity"
                placeholder="quantity"
                min={1}
                value={item.quantity}
                onChange={changeHandler}
              />

              <button
                className="btn btn-primary text-gray text-center m-2"
                onClick={() => submitHandler()}
              >
                Add
              </button>

              <button
                className="btn btn-danger text-gray text-center m-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddBillItemComponent;
