import React, { useEffect, useState } from "react";
import "./App.css";

import NewBillComponent from "./Components/NewBillComponent";
import ItemListComponent from "./Components/ItemListComponent";
import MyBillsComponent from "./Components/MyBillsComponent";
import SalesComponent from "./Components/SalesComponent";

import { getItems, getMyBills, getSalesStats } from "./service";

const App = () => {
  const [items, setItems] = useState([]);
  const [bills, setBills] = useState([]);
  const [sales, setSales] = useState({
    todaySales: 0,
    monthSales: 0,
    yearSales: 0,
  });

  const [reload, setReload] = useState(false);

  const loadData = () => {
    getItems().then((data) => {
      if (data.status) {
        setItems(data.items);
      }
    });

    getMyBills().then((data) => {
      if (data.status) {
        setBills(data.bills);
      }
    });

    getSalesStats().then((data) => {
      if (data.status) {
        setSales(data.sales);
      }
    });
    setReload(false);
  };

  useEffect(() => {
    if (reload) {
      loadData();
    }
  }, [reload]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid m-4">
        <div className="row">
          <div className="col-lg-6 section bg-light">
            <NewBillComponent setReload={setReload} items={items} />
          </div>
          <div className="col-lg-6 section">
            <ItemListComponent items={items} setReload={setReload} />
          </div>
          <div className="col-lg-6 section">
            <MyBillsComponent bills={bills} />
          </div>
          <div className="col-lg-6 section">
            <SalesComponent sales={sales} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
