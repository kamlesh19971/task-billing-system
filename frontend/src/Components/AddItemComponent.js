import React, { useState } from "react";
import { addItem } from "../service";

const AddItemComponent = (props) => {
  const { setReload, setModalOpen } = props;

  const [item, setItem] = useState({
    name: "",
    price: 1,
  });

  const changeHandler = (e) => {
    setItem(Object.assign({}, item, { [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    if (!item.name || item.name.trim() === "") {
      alert("Please Enter Item name");
      return;
    }

    if (!item.price || +item.price < 1) {
      alert("Please Price should be atleast 1");
      return;
    }

    addItem(item).then(() => {
      setItem({
        name: "",
        price: 1,
      });
      setModalOpen(false);
      setReload(true);
    });
  };

  return (
    <React.Fragment>
      <div class="modal d-block" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div className="p-2">
              <lable className="text-gray h6 text-gray">Add Item</lable>

              <input
                type="text"
                className="form-control mt-2"
                name="name"
                id="name"
                placeholder="Name"
                value={item.name}
                onChange={changeHandler}
              />

              <input
                type="number"
                className="form-control mt-1"
                name="price"
                id="price"
                placeholder="Price"
                min={1}
                value={item.price}
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

export default AddItemComponent;
