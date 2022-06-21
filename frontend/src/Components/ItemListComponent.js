import React, { useState } from "react";
import AddItemComponent from "./AddItemComponent";

const ItemListComponent = (props) => {
  const { items, setReload } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="card p-2 section">
        <div className="row">
          <div className="col-lg-10 text-black text-bold h4">Items</div>
          <div className="col-lg-2">
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Add Item
            </button>
          </div>
        </div>

        <div className="list mt-1">
          <ul class="list-group">
            {items.length > 0 &&
              items.map((x, i) => (
                <li class="list-group-item mb-1 border border-1" key={i}>
                  <div className="row text-bold">
                    <div className="col-lg-9">{x.name}</div>
                    <div className="col-lg-3">Rs. {x.price}</div>
                  </div>
                  <span className="text-gray">{x.soldQuantity}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {modalOpen && (
        <AddItemComponent setReload={setReload} setModalOpen={setModalOpen} />
      )}
    </React.Fragment>
  );
};

export default ItemListComponent;
