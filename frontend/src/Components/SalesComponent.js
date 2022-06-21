import React from "react";

const SalesComponent = (props) => {
  const { sales } = props;

  return (
    <React.Fragment>
      <div className="card p-2 section">
        <div className="row">
          <div className="col-lg-10 text-black text-bold h4">Sales</div>
        </div>

        <div className="row p-5 align-middle">
          <div className="col-lg-3 m-1 card border border-1">
            <h4 className=" text-center text-bold mt-3">
              Rs. {sales.todaySales}
            </h4>
            <h4 className="text-center text-bold mt-2">Today</h4>
          </div>

          <div className="col-lg-3 m-1 card border border-2">
            <h4 className=" text-center text-bold mt-3">
              Rs. {sales.monthSales}
            </h4>
            <h4 className="text-center text-bold mt-2">This Month</h4>
          </div>

          <div className="col-lg-3 m-1 card border border-2">
            <h4 className=" text-center text-bold mt-3">
              Rs. {sales.yearSales}
            </h4>
            <h4 className="text-center text-bold mt-2">This Year</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SalesComponent;
