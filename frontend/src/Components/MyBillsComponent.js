import React from "react";

const MyBillsComponent = (props) => {
  const { bills } = props;

  const billDate = (date) => {
    date = new Date(date);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <React.Fragment>
      <div className="card p-2 section">
        <div className="row">
          <div className="col-lg-10 text-black text-bold h4">My Bills</div>
          <div className="col-lg-2">
            <button className="btn btn-primary">Add Bill</button>
          </div>
        </div>

        <div className="list mt-1">
          <ul class="list-group">
            {bills.length > 0 &&
              bills.map((x, i) => (
                <li class="list-group-item mb-1 border border-1">
                  <div className="row">
                    <div className="col-lg-10 text-bold">{x.billNumber}</div>
                    <div className="col-lg-2 text-gray">Rs. {x.amount}</div>
                  </div>
                  <span className="text-gray">
                    {billDate(new Date(x.created_at))}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyBillsComponent;
