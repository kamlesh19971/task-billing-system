const mongoose = require("mongoose");
const Bill = require("../models/bill");
const Item = require("../models/item");
// const { ObjectId } = require("mongoose").SchemaTypes.ObjectId;
const ObjectId = mongoose.SchemaTypes.ObjectId;

exports.addBill = async (req, res) => {
  try {
    // await Bill.deleteMany({});
    let { items, amount } = req.body;
    items = JSON.parse(items);

    console.log(items);
    console.log(amount);

    console.log(await generateBillNumber());
    const bill = new Bill({
      amount,
      billNumber: await generateBillNumber(),
    });

    bill.save((err, result) => {
      if (err) {
        throw new Error("Can't add bill");
      }

      for (const item of items) {
        Item.updateOne(
          {
            _id: item.item,
          },
          {
            $inc: { soldQuantity: +item.quantity },
          }
        ).then((res) => {
          console.log(res);
        });
      }
      return res.send({ status: true, message: "Bill Saved Successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.send({ status: false, error: "Server Issue" });
  }
};

exports.getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).sort({ _id: -1 }).lean();

    return res.send({ status: true, bills });
  } catch (error) {
    return res.send({ status: false, error: "Couldn't fetch Bills" });
  }
};

exports.getSalesStats = async (req, res) => {
  try {
    let todaySales = await Bill.find({
      $where: function () {
        today = new Date(); //
        today.setHours(0, 0, 0, 0);
        return this._id.getTimestamp() >= today;
      },
    });

    todaySales = todaySales.reduce((acc, x) => acc + x.amount, 0);

    let monthSales = await Bill.aggregate([
      {
        $addFields: {
          month: { $month: "$created_at" },
        },
      },
      {
        $match: {
          month: { $eq: new Date().getMonth() + 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    let yearSales = await Bill.aggregate([
      {
        $addFields: {
          year: { $year: "$created_at" },
        },
      },
      {
        $match: {
          year: { $eq: new Date().getFullYear() },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    console.log(todaySales);
    console.log(monthSales);
    console.log(yearSales);

    return res.send({
      status: true,
      sales: {
        todaySales: todaySales,
        monthSales: monthSales[0].total,
        yearSales: yearSales[0].total,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send({ status: false, error: "Couldn't sales Data" });
  }
};

const generateBillNumber = async () => {
  const bill = await Bill.findOne({}).sort({ _id: -1 }).lean();

  if (!bill) {
    return "Bill1000001";
  }

  console.log(+bill.billNumber.split("Bill")[1]);
  return `Bill${+bill.billNumber.split("Bill")[1] + 1}`;
};
